package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.adventure.*;
import com.ssafy.antenna.domain.adventure.dto.click.*;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventurePlaceReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.req.UpdateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.res.*;
import com.ssafy.antenna.domain.adventure.dto.sub.*;
import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.domain.like.AdventureLike;
import com.ssafy.antenna.domain.location.Location;
import com.ssafy.antenna.domain.post.CheckpointPost;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.exception.conflict.DuplicatedAdventureInProgressException;
import com.ssafy.antenna.exception.not_found.*;
import com.ssafy.antenna.repository.*;
import com.ssafy.antenna.util.CardinalDirection;
import com.ssafy.antenna.util.GeometryUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdventureService {
    private final EntityManager entityManager;
    private final AdventureRepository adventureRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AdventureSucceedRepository adventureSucceedRepository;
    private final AdventurePlaceRepository adventurePlaceRepository;
    private final AdventureReviewRepository adventureReviewRepository;
    private final AdventureLikeRepository adventureLikeRepository;
    private final AdventureInProgressRepository adventureInProgressRepository;
    private final CheckpointPostRepository checkpointPostRepository;
    private final AwsS3Service awsS3Service;
    private final PostRepository postRepository;
    @Value("${aws-cloud.aws.s3.bucket.url}")
    private String bucketUrl;
    private final PostLikeRepository postLikeRepository;
    private final AntennaRepository antennaRepository;

    // 탐험 추가
    public void createAdventure(@RequestBody CreateAdventureReq createAdventureReq, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // 탐험을 생성한 후,
        Adventure adventure = Adventure.builder()
                .category(categoryRepository.findCategoryIdByCategory(createAdventureReq.category()).orElseThrow(CategoryNotFoundException::new))
                .feat(createAdventureReq.feat())
                .title(createAdventureReq.title())
                .content(createAdventureReq.content())
                .difficulty(createAdventureReq.difficulty())
                .exp(createAdventureReq.exp())
                .startDate(createAdventureReq.startDate())
                .endDate(createAdventureReq.endDate())
                .photoUrl(postRepository.findById(createAdventureReq.RepresentativePostId()).orElseThrow(PhotoNotFoundException::new).getPhotoUrl())
                .photoName(postRepository.findById(createAdventureReq.RepresentativePostId()).orElseThrow(PhotoNotFoundException::new).getPhotoName())
                .user(curUser)
                .build();
        // 탐험 저장
        adventureRepository.save(adventure);
        // 탐험 장소를 생성한 후,
        for (CreateAdventurePlaceReq createAdventurePlaceReq : createAdventureReq.createAdventurePlaceReqs()) {
            AdventurePlace adventurePlace = AdventurePlace.builder()
                    .title(createAdventurePlaceReq.adventurePlaceTitle())
                    .content(createAdventurePlaceReq.adventurePlaceContent())
                    .coordinate(new GeometryFactory().createPoint(new Coordinate(createAdventurePlaceReq.coordinate().lng(), createAdventurePlaceReq.coordinate().lat())))
                    .post(postRepository.findById(createAdventurePlaceReq.postId()).orElseThrow(PhotoNotFoundException::new))
                    .adventure(adventure)
                    .build();
            // 탐험 장소 저장
            adventurePlaceRepository.save(adventurePlace);
        }
    }

    // 특정 탐험 조회
    public ReadAdventureRes readAdventure(Long adventureId, Long userId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // 현재 이 모험id로 AdventureInProgress 가져오기.
        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow();

        // AdventureInProgress 유저들의 id만 골라오기.
        List<Long> userIds = new ArrayList<>();

        for (AdventureInProgress adventureInProgress : adventureInProgressList) {
            userIds.add(adventureInProgress.getUser().getUserId());
        }

        // 유저id로 유저id와 사진 가져오기.
        List<UserIdPhotoUrl> userIdPhotoUrls = getUserIdPhotoUrl(userIds);

        // isParticipating
        Boolean participation = Boolean.FALSE;
        if (isParticipating(adventureId, userId)) {
            participation = Boolean.TRUE;
        }

        // 탐험완료한 탐험인지
        Boolean clear = Boolean.FALSE;
        if(adventureSucceedRepository.findByUserAndAdventure(user,adventure).isPresent()){
            clear=Boolean.TRUE;
        }

        // subAdventurePlaces
        List<SubAdventurePlace> subAdventurePlaces = new ArrayList<>();
        // 이 모험의 AdventurePlace들을 가져와서 id와 좌표만 뽑는다.
        List<AdventurePlace> adventurePlaceList = adventurePlaceRepository.findAllByAdventure(adventure).orElseThrow(AdventureNotFoundException::new);

        for (AdventurePlace adventurePlace : adventurePlaceList) {
            SubCoordinate subCoordinate = new SubCoordinate(adventurePlace.getCoordinate().getY(), adventurePlace.getCoordinate().getX());
            subAdventurePlaces.add(new SubAdventurePlace(adventurePlace.getAdventurePlaceId(), subCoordinate));
        }

        ReadAdventureRes readAdventureRes = new ReadAdventureRes(
                adventure.getAdventureId(),
                adventure.getTitle(),
                adventure.getContent(),
                adventure.getStartDate(),
                adventure.getEndDate(),
                adventure.getDifficulty(),
                adventure.getCategory().getCategory(),
                adventure.getAvgReviewGrade(),
                new UserIdPhotoUrl(adventure.getUser().getUserId(), adventure.getUser().getPhotoUrl()),
                adventure.getUser().getNickname(),
                adventure.getUser().getLevel(),
                userIdPhotoUrls,
                adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureNotFoundException::new),
                participation,
                clear,
                subAdventurePlaces
        );

        return readAdventureRes;
    }

    private boolean isParticipating(Long adventureId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        if (adventureInProgressRepository.findByUserAndAdventure(user, adventure).isPresent()) {
            return true;
        }
        return false;
    }

    // 특정 탐험 삭제
    public void deleteAdventure(Long adventureId) {
        //모험 있는지 조회
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        //있다면, 사진이 있으면 사진 삭제 처리
        if (adventure.getPhotoName() != null) {
            awsS3Service.deleteImage(adventure.getPhotoName());
        }
        adventureRepository.deleteById(adventureId);
    }

    // 모든 탐험 조회(생성순,거리순,별점높은순,달성률낮은순)
    public List<ReadAdventuresRes> readAdventures(String order, Double lat, Double lng) {
        List<ReadAdventuresRes> result = new ArrayList<>();
        if (lat != null && lng != null) {
            Query query = entityManager.createNativeQuery(
                            "SELECT *, " +
                                    "ST_Distance_Sphere(POINT(" + lng.toString() + ", " + lat.toString() + "), ap.coordinate) AS distance " +
                                    "FROM adventure_place ap " +
                                    "order by distance asc "
                            , AdventurePlace.class)
                    .setMaxResults(10);
            List<AdventurePlace> adventurePlaceList = query.getResultList();

            // 중복제거
            Set<Long> adventureIds = new HashSet<>();
            for (AdventurePlace adventurePlace : adventurePlaceList) {
                adventureIds.add(adventurePlace.getAdventure().getAdventureId());
            }

            for (Long i : adventureIds) {
                Adventure adventure = adventureRepository.findById(i).orElseThrow(AdventureNotFoundException::new);

                // 현재 이 모험id로 AdventureInProgress 가져오기.
                List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow();

                List<String> userPhotoUrlList = new ArrayList<>();

                for (AdventureInProgress aIP : adventureInProgressList) {
                    userPhotoUrlList.add(aIP.getUser().getPhotoUrl());
                }

                // userCount는 countByAdventure
                Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);


                ReadAdventuresRes newReadAdventureRes = new ReadAdventuresRes(
                        adventure.getAdventureId(),
                        adventure.getPhotoUrl(),
                        adventure.getTitle(),
                        adventure.getDifficulty(),
                        adventure.getUser().getUserId(),
                        adventure.getUser().getPhotoUrl(),
                        adventure.getUser().getNickname(),
                        Long.valueOf(adventure.getUser().getLevel()),
                        userPhotoUrlList,
                        userCount
                );

                result.add(newReadAdventureRes);
            }
        } else {
            List<Adventure> temp = new ArrayList<>();
            if(order.equals("update")) {
                temp = adventureRepository.findAllByOrderByCreateTimeDesc().orElseThrow(AdventureNotFoundException::new);
            }else if(order.equals("avgReviewGradeDesc")){
                temp = adventureRepository.findALlByOrderByAvgReviewGradeDesc().orElseThrow(AdventureNotFoundException::new);
            }
            for (Adventure adventure : temp) {
                // 현재 이 모험id로 AdventureInProgress 가져오기.
                List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow();

                List<String> userPhotoUrlList = new ArrayList<>();

                for (AdventureInProgress aIP : adventureInProgressList) {
                    userPhotoUrlList.add(aIP.getUser().getPhotoUrl());
                }

                // userCount는 countByAdventure
                Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);


                ReadAdventuresRes newReadAdventureRes = new ReadAdventuresRes(
                        adventure.getAdventureId(),
                        adventure.getPhotoUrl(),
                        adventure.getTitle(),
                        adventure.getDifficulty(),
                        adventure.getUser().getUserId(),
                        adventure.getUser().getPhotoUrl(),
                        adventure.getUser().getNickname(),
                        Long.valueOf(adventure.getUser().getLevel()),
                        userPhotoUrlList,
                        userCount
                );

                result.add(newReadAdventureRes);
            }

        }

        return result;
    }

    private List<UserIdPhotoUrl> getUserIdPhotoUrl(List<Long> userIds) {
        List<UserIdPhotoUrl> result = new ArrayList<>();

        for (Long userId : userIds) {
            User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
            result.add(new UserIdPhotoUrl(user.getUserId(), user.getPhotoUrl()));
        }

        return result;
    }

    // 특정 탐험 장소(체크포인트) 추가
    public void createAdventurePlace(Long adventureId, CreateAdventurePlaceReq[] places) {
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        // 좌표의 개수만큼 반복
        for (CreateAdventurePlaceReq place : places) {
            Post post = postRepository.findById(place.postId()).orElseThrow(PostNotFoundException::new);
            AdventurePlace newAdventurePlace = AdventurePlace.builder()
                    .title(place.adventurePlaceTitle())
                    .content(place.adventurePlaceContent())
                    .coordinate(new GeometryFactory().createPoint(new Coordinate(place.coordinate().lng(), place.coordinate().lat())))
                    .adventure(curAdventure)
                    .post(post)
                    .build();

            adventurePlaceRepository.save(newAdventurePlace);
        }
    }

    // 특정 탐험의 장소들(체크포인트들) 조회
    public List<ReadAdventurePlaceRes> readAdventurePlace(Long adventureId) {
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<ReadAdventurePlaceRes> result = new ArrayList<>();

        // AdventurePlace를 꺼내와서,
        List<AdventurePlace> temp = adventurePlaceRepository.findAllByAdventure(curAdventure).orElseThrow(AdventurePlaceNotFoundException::new);
        // Response로 변환 후 return.
        for (AdventurePlace ap : temp) {
            ReadAdventurePlaceRes newReadAdventurePlaceRes = new ReadAdventurePlaceRes(
                    ap.getAdventurePlaceId(),
                    ap.getTitle(),
                    ap.getContent(),
                    new Double[]{ap.getCoordinate().getX(), ap.getCoordinate().getY()},
                    ap.getPost().getPostId()
            );

            result.add(newReadAdventurePlaceRes);
        }

        return result;
    }


    // 특정 유저가 참가중인 탐험 추가(탐험 참가하기)
    public void createAdventureInProgress(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        // 이미 userid와 adventureid로 참가중인 정보가 있다면 예외처리.
        if (adventureInProgressRepository.findByUserAndAdventure(curUser, curAdventure).isPresent()) {
            throw new DuplicatedAdventureInProgressException();
        }

        Long totalPoint = adventurePlaceRepository.countByAdventure(curAdventure);

        AdventureInProgress newAdventureInProgress = AdventureInProgress.builder()
                .totalPoint(totalPoint.intValue())
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureInProgressRepository.save(newAdventureInProgress);
    }

    // 특정 유저가 참가중인 탐험 조회
    public List<ReadAdventureInProgressRes> readAdventureInProgress(Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<ReadAdventureInProgressRes> result = new ArrayList<>();

        List<AdventureInProgress> temp = adventureInProgressRepository.findAllByUser(curUser).orElseThrow(AdventureInProgressNotFoundException::new);

        for (AdventureInProgress aip : temp) {
            Integer clearRate = (int) (((double) aip.getCurrentPoint() / (double) aip.getTotalPoint()) * 100.0);
            ReadAdventureInProgressRes newReadAdventureInProgressRes = new ReadAdventureInProgressRes(
                    aip.getAdventure().getAdventureId(),
                    clearRate
            );

            result.add(newReadAdventureInProgressRes);
        }

        return result;
    }

    // 탐험 포기(특정 유저가 참가중인 탐험 삭제)
    public void deleteAdventureInProgress(Long adventureId) {
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        adventureInProgressRepository.deleteByAdventure(curAdventure);
    }


    // 특정 유저가 참가중인 모험의 피드 켜기(좋아요 추가)
    public void createAdventureLike(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        AdventureLike newAdventureLike = AdventureLike.builder()
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureLikeRepository.save(newAdventureLike);
    }

    // 특정 유저가 참가중인 모험의 알림 조회
    public ReadAdventureLikeRes readAdventureLike(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        Optional<AdventureLike> findByAdventureandUser = adventureLikeRepository.findByAdventureAndUser(curAdventure, curUser);

        ReadAdventureLikeRes result = null;

        if (findByAdventureandUser.isPresent()) {
            result = new ReadAdventureLikeRes(findByAdventureandUser.orElseThrow(AdventureLikeNotFoundException::new).getAdventureLikeId(), Boolean.TRUE);
        } else {
            result = new ReadAdventureLikeRes(null, Boolean.FALSE);
        }
        return result;
    }

    // 탐험 알림 끄기
    public void deleteAdventureLike(Long adventureLikeId) {
        adventureLikeRepository.deleteById(adventureLikeId);
    }

    // 특정 탐험 진행자, 달성률 조회
    public List<ReadAdventureInProgressUsersRes> readAdventureInProgressUsers(Long adventureId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);

        List<ReadAdventureInProgressUsersRes> result = new ArrayList<>();

        for (AdventureInProgress adventureInProgress : adventureInProgressList) {
            Integer clearRate = (int) (((double) adventureInProgress.getCurrentPoint() / (double) adventureInProgress.getTotalPoint()) * 100.0);
            ReadAdventureInProgressUsersRes readAdventureInProgressUsersRes = new ReadAdventureInProgressUsersRes(
                    adventureInProgress.getUser().getUserId(),
                    clearRate
            );

            result.add(readAdventureInProgressUsersRes);
        }

        return result;
    }

    // 특정 탐험 달성자 추가
    public void createAdventureSucceed(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        AdventureSucceed newAdventureSucceed = AdventureSucceed.builder()
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureSucceedRepository.save(newAdventureSucceed);
    }

    // 특정 유저의 달성한 탐험id들 조회
    public List<ReadAdventureSucceedRes> readAdventureSucceedOfUser(Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<AdventureSucceed> adventureSucceeds = adventureSucceedRepository.findAllByUser(curUser).orElseThrow(AdventureSucceedNotFoundException::new);

        List<ReadAdventureSucceedRes> result = new ArrayList<>();

        for (AdventureSucceed adventureSucceed : adventureSucceeds) {
            ReadAdventureSucceedRes readAdventureSucceedRes = new ReadAdventureSucceedRes(adventureSucceed.getAdventure().getAdventureId());

            result.add(readAdventureSucceedRes);
        }

        return result;
    }

    // 특정 탐험 달성자의 후기 추가
    public void createAdventureReview(Long adventureId, CreateAdventureReviewReq createAdventureReviewReq, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        AdventureReview adventureReview = AdventureReview.builder()
                .content(createAdventureReviewReq.content())
                .grade(createAdventureReviewReq.grade())
                .user(user)
                .adventure(adventure)
                .build();

        // 후기 저장
        adventureReviewRepository.save(adventureReview);

        // 모험 평점 업데이트.
        // 리뷰가 있으면
        if (adventureReviewRepository.countAdventureReviewByAdventure(adventure).isPresent()) {
            // 해당 모험 별점 개수
            Double totalCnt = Double.valueOf(adventureReviewRepository.countAdventureReviewByAdventure(adventure).orElseThrow(AdventureReviewNotFoundException::new));
            // 별점 합
            Double totalSum = adventureReviewRepository.sumOfAdventureReviews(adventure.getAdventureId()).orElseThrow(AdventureReviewNotFoundException::new);
            // 평균별점 업데이트
            adventure.updateAvgReviewGrade(totalSum / totalCnt);
        } else {
            adventure.updateAvgReviewGrade(Double.valueOf(0));
        }

        // 평균별점 저장
        adventureRepository.save(adventure);
    }

    // 특정 탐험 달성자들의 후기 조회
    public List<ReadAdventureReviewRes> readAdventureReview(Long adventureId) {
        List<ReadAdventureReviewRes> result = new ArrayList<>();

        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<AdventureReview> temp = adventureReviewRepository.findAllByAdventure(curAdventure).orElseThrow(AdventureReviewNotFoundException::new);

        for (AdventureReview ar : temp) {
            ReadAdventureReviewRes newReadAdventureReviewRes = new ReadAdventureReviewRes(
                    ar.getAdventureReviewId(),
                    ar.getUser().getUserId(),
                    ar.getUser().getNickname(),
                    ar.getGrade(),
                    ar.getContent()
            );

            result.add(newReadAdventureReviewRes);
        }

        return result;
    }

    // 탐험 후기 수정
    public void updateAdventureReview(Long adventurereviewId, UpdateAdventureReviewReq updateAdventureReviewReq, Long userId) {
        // 현재 리뷰
        AdventureReview adventureReview = adventureReviewRepository.findById(adventurereviewId).orElseThrow(AdventureReviewNotFoundException::new);

        adventureReview.updateContentAndGrade(updateAdventureReviewReq.content(),updateAdventureReviewReq.grade());

        // 탐험 리뷰를 작성한 유저
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // 탐험 리뷰 저장.
        adventureReviewRepository.save(adventureReview);

        // 탐험 리뷰를 작성할 모험
        Adventure adventure = adventureRepository.findById(adventureReview.getAdventure().getAdventureId()).orElseThrow(AdventureNotFoundException::new);

        // 평균별점 업데이트.
        // 현재 모험의 전체 후기 개수
        Double totalCnt = Double.valueOf(adventureReviewRepository.countAdventureReviewByAdventure(adventure).orElseThrow(AdventureReviewNotFoundException::new));
        // 별점 합
        Double totalSum = adventureReviewRepository.sumOfAdventureReviews(adventure.getAdventureId()).orElseThrow(AdventureReviewNotFoundException::new);
        // 평균별점
        Double avgGrade = totalSum / totalCnt;


        // 저장.
        adventureRepository.save(adventure);
    }

    // 탐험 후기 삭제
    public void deleteAdventureReview(Long adventureReviewId) {
        adventureReviewRepository.deleteById(adventureReviewId);
    }

    // 특정 모험의 특정 좌표의 게시글 조회
    public List<ReadAdventurePlacePostRes> readAdventurePlacePost(Long adventurePlaceId) {
        AdventurePlace curAdventurePlace = adventurePlaceRepository.findById(adventurePlaceId).orElseThrow(AdventurePlaceNotFoundException::new);

        List<CheckpointPost> checkpointPosts = checkpointPostRepository.findAllByAdventurePlace(curAdventurePlace).orElseThrow(CheckpointPostNotFoundException::new);

        List<ReadAdventurePlacePostRes> result = new ArrayList<>();

        for (CheckpointPost checkpointPost : checkpointPosts) {
            ReadAdventurePlacePostRes readAdventurePlacePostRes = new ReadAdventurePlacePostRes(checkpointPost.getPost().getPostId());

            result.add(readAdventurePlacePostRes);
        }

        return result;
    }

    // 특정 모험의 모든 장소의 게시글 조회
    public List<ReadAdventurePlacePostRes> readAdventurePosts(Long adventureId) {
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<CheckpointPost> checkpointPosts = checkpointPostRepository.findAllByAdventureOrderByCreateTimeDesc(curAdventure).orElseThrow(CheckpointPostNotFoundException::new);

        List<ReadAdventurePlacePostRes> result = new ArrayList<>();

        for (CheckpointPost checkpointPost : checkpointPosts) {
            ReadAdventurePlacePostRes readAdventurePlacePostRes = new ReadAdventurePlacePostRes(checkpointPost.getPost().getPostId());

            result.add(readAdventurePlacePostRes);
        }

        return result;
    }


    // 모험 검색(모든 모험 키워드 조회)
    public List<ReadAdventuresRes> readAdventureSearch(String keyword) {
        // 키워드를 포함하는 모험을 가져옴.
        List<Adventure> adventureList = adventureRepository.findByTitleContaining(keyword).orElseThrow(AdventureNotFoundException::new);

        List<ReadAdventuresRes> readAdventureResList = new ArrayList<>();

        for (Adventure adventure : adventureList) {
            // 진행중인 사람들 사진이랑 총 몇 명 참여중인지 구하기
            // 현재 이 모험에 참여중인 유저들 모험에 참여한 순으로 5명까지.
            // 그럼 AIP를 ByAdventureOrderByCreatetime을 구해서
            List<AdventureInProgress> aIPList = adventureInProgressRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow(AdventureNotFoundException::new);

            // 그 속의 유저들의 이미지들을 뽑아옴.
            List<String> userPhotoUrlList = new ArrayList<>();

            for (AdventureInProgress aIP : aIPList) {
                userPhotoUrlList.add(aIP.getUser().getPhotoUrl());
            }
            // userCount는 countByAdventure
            Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);

            ReadAdventuresRes readAdventuresRes = new ReadAdventuresRes(
                    adventure.getAdventureId(),
                    adventure.getPhotoUrl(),
                    adventure.getTitle(),
                    adventure.getDifficulty(),
                    adventure.getUser().getUserId(),
                    adventure.getUser().getPhotoUrl(),
                    adventure.getUser().getNickname(),
                    Long.valueOf(adventure.getUser().getLevel()),
                    userPhotoUrlList,
                    userCount
            );

            readAdventureResList.add(readAdventuresRes);
        }

        return readAdventureResList;
    }

    // 특정 위치에서 일정 거리 안에 내가 참가중인 탐험과 탐험 장소 조회하기
    public List<ReadAdventureInProgressWithinDistanceRes> readAdventureInProgressWithinDistance(Double lat, Double lng, Double area, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

//        Double area = 0.05;

        Location northEast = GeometryUtil.calculateByDirection(lng, lat, area, CardinalDirection.NORTHEAST
                .getBearing());
        Location southWest = GeometryUtil.calculateByDirection(lng, lat, area, CardinalDirection.SOUTHWEST
                .getBearing());
        double x1 = northEast.lng();
        double y1 = northEast.lat();
        double x2 = southWest.lng();
        double y2 = southWest.lat();

        String pointFormat = String.format("'LINESTRING(%f %f, %f %f)')", x1, y1, x2, y2);
        Query query = entityManager.createNativeQuery("" +
                                "SELECT * FROM adventure_place as ap " +
                                "WHERE ap.adventure_id=" + "(select aip.adventure_id from adventure_in_progress as aip where aip.user_id =" + curUser.getUserId().toString() + ") "
                                + "and MBRContains(ST_LINESTRINGFROMTEXT(" + pointFormat + ", ap.coordinate)"
                        , AdventurePlace.class)
                .setMaxResults(100);
        List<AdventurePlace> adventurePlaceList = query.getResultList();

        List<ReadAdventureInProgressWithinDistanceRes> readAdventureInProgressWithinDistanceRes = new ArrayList<>();
        for (AdventurePlace ap :
                adventurePlaceList) {
            ReadAdventureInProgressWithinDistanceRes newReadAdventureInProgressWithinDistanceRes = new ReadAdventureInProgressWithinDistanceRes(
                    ap.getAdventure().getAdventureId(),
                    ap.getAdventure().getTitle(),
                    ap.getAdventurePlaceId(),
                    ap.getTitle()
            );
            readAdventureInProgressWithinDistanceRes.add(newReadAdventureInProgressWithinDistanceRes);
        }

        return readAdventureInProgressWithinDistanceRes;
    }

    // 탐험 카테고리 조회
    public List<String> readCategories() {
        List<String> result = new ArrayList<>();

        List<Category> categories = categoryRepository.findAll();

        for (Category category : categories) {
            result.add(category.getCategory());
        }

        return result;

    }

    // 탐험 장소 하나 눌렀을 때

    public ReadAdventurePlaceClickRes readAdventurePlaceClick(Long adventurePlaceId,String order) {
        AdventurePlace adventurePlace = adventurePlaceRepository.findById(adventurePlaceId).orElseThrow(AdventurePlaceNotFoundException::new);

        List<CheckpointPost> checkpointPosts = new ArrayList<>();

        if(order.equals("createTimeDesc")) {
            checkpointPosts = checkpointPostRepository.findAllByAdventurePlaceOrderByCreateTimeDesc(adventurePlace).orElseThrow(CheckpointPostNotFoundException::new);
        }else if(order.equals("postLikeDesc")){
            checkpointPosts = checkpointPostRepository.findCheckpointPostByPostLikeDesc(adventurePlaceId).orElseThrow(CheckpointPostNotFoundException::new);
        }

        List<SubPost> subPostList = new ArrayList<>();

        for (CheckpointPost checkpointPost : checkpointPosts) {
            Post post = checkpointPost.getPost();
            SubPost subPost = new SubPost(
                    post.getPostId(),
                    post.getPhotoUrl(),
                    post.getTitle(),
                    userRepository.findById(post.getUser().getUserId()).orElseThrow(UserNotFoundException::new).toResponse(),
                    post.getCreateTime()
            );
            subPostList.add(subPost);
        }

        ReadAdventurePlaceClickRes readAdventurePlaceClickRes = new ReadAdventurePlaceClickRes(
                adventurePlaceId,
                adventurePlace.getTitle(),
                adventurePlace.getContent(),
                adventurePlace.getPost().getPhotoUrl(),
                adventurePlace.getPost().getTitle(),
                adventurePlace.getPost().getW3w(),
                adventurePlace.getPost().getCreateTime(),
                subPostList
        );

        return readAdventurePlaceClickRes;
    }

    // '탐험 후기'탭 눌렀을 때
    public ReadAdventureReviewClickRes readAdventureReviewClick(Long adventureId) {
        // 모험을 얻어와서
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        // 그 탐험의 AdventureReview를 가져옴.
        List<AdventureReview> adventureReviews = adventureReviewRepository.findAllByAdventure(adventure).orElseThrow(AdventureReviewNotFoundException::new);
        // 리뷰를 돌면서 리스트를 생성해줌.
        List<SubAdventureReview> subAdventureReviews = new ArrayList<>();
        for (AdventureReview adventureReview : adventureReviews) {
            SubAdventureReview subAdventureReview = new SubAdventureReview(
                    adventureReview.getAdventureReviewId(),
                    adventureReview.getUser().getNickname(),
                    Long.valueOf(adventureReview.getUser().getLevel()),
                    Long.valueOf(adventureReview.getGrade()),
                    adventureReview.getContent(),
                    adventureReview.getCreateTime()
            );
            subAdventureReviews.add(subAdventureReview);
        }

        // 만들고 리턴.
        ReadAdventureReviewClickRes readAdventureReviewClickRes = new ReadAdventureReviewClickRes(
                adventure.getFeat(),
                subAdventureReviews
        );

        return readAdventureReviewClickRes;
    }

    // '탐험 중'탭 눌렀을 때
    public List<ReadAdventureInProgressClickRes> readAdventureInProgressClick(Long userId, String order) {
        // 현재 프로필의 주인 User
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<ReadAdventureInProgressClickRes> result = new ArrayList<>();


        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByUserOrderByCreateTimeDesc(user).orElseThrow(AdventureInProgressNotFoundException::new);

        // 프로필 주인이 참여중인 AIP
        if (order.equals("createTimeDesc")) { // 최신순
            adventureInProgressList = adventureInProgressRepository.findAllByUserOrderByCreateTimeDesc(user).orElseThrow(AdventureInProgressNotFoundException::new);
        } else if (order.equals("userCountDesc")) { // 참여자 많은순
            adventureInProgressList = adventureInProgressRepository.findAIPOrderByUserCount(user.getUserId()).orElseThrow(AdventureInProgressNotFoundException::new);
        } else if (order.equals("difficultyAsc")) { // 쉬운순
            adventureInProgressList = adventureInProgressList.stream()
                    .sorted((a1, a2) -> Long.compare(a1.getAdventure().getDifficulty(), a2.getAdventure().getDifficulty()))
                    .collect(Collectors.toList());
        } else if (order.equals("difficultyDesc")) { // 어려운순
            adventureInProgressList = adventureInProgressList.stream()
                    .sorted((a1, a2) -> Long.compare(a2.getAdventure().getDifficulty(), a1.getAdventure().getDifficulty()))
                    .collect(Collectors.toList());
        }

        // 참여중인 모험을 돌면서
        for (AdventureInProgress adventureInProgress : adventureInProgressList) {
            // 프로필의 유저가 참여중인 탐험 중 1개.
            Adventure adventure = adventureRepository.findById(adventureInProgress.getAdventure().getAdventureId()).orElseThrow(AdventureNotFoundException::new);
            // 달성률 구해주기
            // (달성한 좌표개수/총 좌표개수) * 100을 int로.
            Long clearRate = Long.valueOf((int) ((1.0 * adventureInProgress.getCurrentPoint()) / (1.0 * adventureInProgress.getTotalPoint()) * 100.0));
            // 현재 이 모험에 참여중인 유저 모험에 참여한 순으로 5명까지.
            // 그럼 AIP를 ByAdventureOrderByCreatetime을 구해서
            List<AdventureInProgress> aIPList = adventureInProgressRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow(AdventureNotFoundException::new);

            // 그 속의 유저들의 이미지들을 뽑아옴.
            List<String> userPhotoUrlList = new ArrayList<>();

            for (AdventureInProgress aIP : aIPList) {
                userPhotoUrlList.add(aIP.getUser().getPhotoUrl());
            }
            // userCount는 countByAdventure
            Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);

            // RAPCR 하나씩 만들어 줌.
            ReadAdventureInProgressClickRes readAdventureInProgressClickRes = new ReadAdventureInProgressClickRes(
                    adventure.getAdventureId(),
                    adventure.getPhotoUrl(),
                    adventure.getTitle(),
                    adventure.getDifficulty(),
                    clearRate,
                    adventure.getUser().getUserId(),
                    adventure.getUser().getPhotoUrl(),
                    adventure.getUser().getNickname(),
                    Long.valueOf(adventure.getUser().getLevel()),
                    userPhotoUrlList,
                    userCount
            );

            result.add(readAdventureInProgressClickRes);
        }

        return result;
    }

    // '완료한 탐험' 눌렀을 때
    public ReadAdventureSucceedClickRes readAdventureSucceedClick(Long userId) {
        // 현재 프로필의 주인 User
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<SubReadAdventureSucceedClickRes> subReadAdventureSucceedClickResList = new ArrayList<>();

        // 프로필 주인이 완료한 탐험 AS
        List<AdventureSucceed> adventureSucceeds = adventureSucceedRepository.findAllByUser(user).orElseThrow(AdventureSucceedNotFoundException::new);

        // 리턴할 보물 List
        List<SubTreasure> treasures = new ArrayList<>();

        // 완료한 모험을 돌면서
        for (AdventureSucceed adventureSucceed : adventureSucceeds) {
            // 프로필의 유저가 완료한 탐험 중 1개.
            Adventure adventure = adventureRepository.findById(adventureSucceed.getAdventure().getAdventureId()).orElseThrow(AdventureNotFoundException::new);

            // adventureSucceed의 isSelected가 true라면 대표 보물에 넣어줌.
            if (adventureSucceed.isSelected()) {
                treasures.add(new SubTreasure(adventure.getAdventureId(), adventure.getFeat(), adventure.getTitle()));
            }

            // 현재 이 모험을 완료한 유저 모험에 완료한 순으로 5명까지.
            // 그럼 AI를 ByAdventureOrderByCreatetime을 구해서
            List<AdventureSucceed> aSList = adventureSucceedRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow(AdventureSucceedNotFoundException::new);

            // 그 속의 유저들의 이미지들을 뽑아옴.
            List<String> userPhotoUrlList = new ArrayList<>();

            for (AdventureSucceed aS : aSList) {
                userPhotoUrlList.add(aS.getUser().getPhotoUrl());
            }
            // userCount는 countByAdventure
            Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);

            // SubReadAdventureSucceedClickRes 하나씩 만들어 줌.
            SubReadAdventureSucceedClickRes subReadAdventureSucceedClickRes = new SubReadAdventureSucceedClickRes(
                    adventure.getAdventureId(),
                    adventure.getPhotoUrl(),
                    adventure.getTitle(),
                    adventure.getDifficulty(),
                    adventure.getUser().getUserId(),
                    adventure.getUser().getPhotoUrl(),
                    adventure.getUser().getNickname(),
                    Long.valueOf(adventure.getUser().getLevel()),
                    userPhotoUrlList,
                    userCount
            );

            subReadAdventureSucceedClickResList.add(subReadAdventureSucceedClickRes);
        } // 완료한 모험 for

        // 반환 ReadAdventureSucceedClickRes 생성.
        ReadAdventureSucceedClickRes result = new ReadAdventureSucceedClickRes(
                treasures
                , subReadAdventureSucceedClickResList
        );

        return result;
    }

    // 보물 '더보기' 눌렀을 때
    public ReadAdventureTreasuresMoreClickRes readAdventureTreasuresMoreClick(Long userId, Long myUserId) {
        User me = userRepository.findById(myUserId).orElseThrow(UserNotFoundException::new);
        User you = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Long cnt = adventureSucceedRepository.countByUser(you).orElseThrow(AdventureSucceedNotFoundException::new);

        Boolean possible = false;
        if (userId.equals(myUserId)) {
            possible = true;
        }

        List<AdventureSucceed> adventureSucceeds = adventureSucceedRepository.findAllByUser(you).orElseThrow(AdventureSucceedNotFoundException::new);

        List<SubTreasure> treasures = new ArrayList<>();
        for (AdventureSucceed adventureSucceed : adventureSucceeds) {
            SubTreasure subTreasure = new SubTreasure(
                    adventureSucceed.getAdventure().getAdventureId(),
                    adventureSucceed.getAdventure().getFeat(),
                    adventureSucceed.getAdventure().getTitle()
            );

            treasures.add(subTreasure);
        }

        ReadAdventureTreasuresMoreClickRes readAdventureTreasuresMoreClickRes = new ReadAdventureTreasuresMoreClickRes(
                cnt,
                possible,
                treasures
        );

        return readAdventureTreasuresMoreClickRes;
    }

    // 대표 보물로 선택하기
    public void createRepresentativeTreasures(Long adventureId, Long userId, Boolean selected) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        AdventureSucceed adventureSucceed = adventureSucceedRepository.findByUserAndAdventure(user, adventure).orElseThrow(AdventureSucceedNotFoundException::new);
        adventureSucceedRepository.save(new AdventureSucceed(
                adventureSucceed.getSucceedId(),
                user,
                adventure,
                selected
        ));
    }

    // '만든 탐험' 탭 눌렀을 때
    public List<ReadAdventureCreationsClickRes> readAdventureCreationsClick(Long userId) {
        // 현재 프로필의 주인 User
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<ReadAdventureCreationsClickRes> result = new ArrayList<>();

        // 프로필 주인이 만든 Adventure
        List<Adventure> adventureList = adventureRepository.findAllByUserOrderByCreateTimeDesc(user).orElseThrow();

        // 만든 모험을 돌면서
        for (Adventure adventure : adventureList) {
            // 현재 이 모험에 참여중인 유저 모험에 참여한 순으로 5명까지.
            // 그럼 AIP를 ByAdventureOrderByCreatetime을 구해서
            List<AdventureInProgress> aIPList = adventureInProgressRepository.findTop5ByAdventureOrderByCreateTimeDesc(adventure).orElseThrow(AdventureNotFoundException::new);

            // 그 속의 유저들의 이미지들을 뽑아옴.
            List<String> userPhotoUrlList = new ArrayList<>();

            for (AdventureInProgress aIP : aIPList) {
                userPhotoUrlList.add(aIP.getUser().getPhotoUrl());
            }
            // userCount는 countByAdventure
            Long userCount = adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);

            // RACCR 하나씩 만들어 줌.
            ReadAdventureCreationsClickRes readAdventureInProgressClickRes = new ReadAdventureCreationsClickRes(
                    adventure.getAdventureId(),
                    adventure.getPhotoUrl(),
                    adventure.getTitle(),
                    adventure.getDifficulty(),
                    adventure.getUser().getUserId(),
                    adventure.getUser().getPhotoUrl(),
                    adventure.getUser().getNickname(),
                    Long.valueOf(adventure.getUser().getLevel()),
                    userPhotoUrlList,
                    userCount
            );

            result.add(readAdventureInProgressClickRes);
        }

        return result;
    }

    // 탐험중인 사람들 보기
    public List<ReadAdventureInProgressUsersClickRes> readAdventureInProgressUsersClick(Long adventureId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        List<ReadAdventureInProgressUsersClickRes> result = new ArrayList<>();

        // users
        List<User> userList = userRepository.findAdventureInProgressUsers(adventureId).orElseThrow(UserNotFoundException::new);
        for (User user : userList) {
            // clearRate
            AdventureInProgress adventureInProgress = adventureInProgressRepository.findByUserAndAdventure(user, adventure).orElseThrow(AdventureInProgressNotFoundException::new);
            Integer clearRate = (int) (((double) adventureInProgress.getCurrentPoint() / (double) adventureInProgress.getTotalPoint()) * 100.0);

            ReadAdventureInProgressUsersClickRes readAdventureInProgressUsersClickRes = new ReadAdventureInProgressUsersClickRes(
                    adventure.getFeat(),
                    clearRate,
                    user.toResponse()
            );

            result.add(readAdventureInProgressUsersClickRes);
        }

        return result;
    }

    //
    // API가 아닌 method.
    //

    // 특정 유저가 진행중인 특정 탐험의 달성률 조회
    public Integer readClearRateByuserIdAndAdventureId(Long userId, Long adventureId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        AdventureInProgress adventureInProgress = adventureInProgressRepository.findByUserAndAdventure(user, adventure).orElseThrow(AdventureInProgressNotFoundException::new);
        Integer result = (int) ((double) adventureInProgress.getCurrentPoint() / (double) adventureInProgress.getTotalPoint() * 100.0);
        return result;
    }

    // 특정 모험을 진행중인 유저들의 id들을 반환.
    public List<Long> readUserIdsByAdventureId(Long adventureId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<Long> result = new ArrayList<>();

        // 특정 모험의 AdventureInProgress를 가져오기.
        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow(UserNotFoundException::new);

        // 그 모험을 진행중인 유저들의 id 뽑기.
        for (AdventureInProgress adventureInProgress : adventureInProgressList) {
            result.add(adventureInProgress.getUser().getUserId());
        }

        return result;
    }

    // 특정 모험을 진행중인 유저들의 인원 수 반환.
    public Long findUserCountByAdventure(Long adventureId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        return adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);
    }


}
