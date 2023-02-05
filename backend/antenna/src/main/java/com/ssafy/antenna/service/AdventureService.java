package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.adventure.*;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventurePlaceReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.req.UpdateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.res.*;
import com.ssafy.antenna.domain.adventure.dto.sub.SubAdventurePlace;
import com.ssafy.antenna.domain.adventure.dto.sub.SubCoordinate;
import com.ssafy.antenna.domain.adventure.dto.sub.UserIdPhotoUrl;
import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.domain.like.AdventureLike;
import com.ssafy.antenna.domain.location.Location;
import com.ssafy.antenna.domain.post.CheckpointPost;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.user.User;
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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;

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
    public Long createAdventure(String category, String featTitle, String featContent, String title, String content, String difficulty, LocalDateTime startDate, LocalDateTime endDate, MultipartFile photo, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // 탐험을 생성한 후,
        Adventure newAdventure = Adventure.builder()
                .category(categoryRepository.findCategoryIdByCategory(category).orElseThrow(CategoryNotFoundException::new))
                .featTitle(featTitle)
                .featContent(featContent)
                .title(title)
                .content(content)
                .difficulty(difficulty)
                .startDate(startDate)
                .endDate(endDate)
                .user(curUser)
                .build();
        if (photo != null) {
            String photoName = awsS3Service.uploadImage(photo);
            String photoUrl = bucketUrl + photoName;
            newAdventure = Adventure.builder()
                    .category(categoryRepository.findCategoryIdByCategory(category).orElseThrow(CategoryNotFoundException::new))
                    .featTitle(featTitle)
                    .featContent(featContent)
                    .title(title)
                    .content(content)
                    .difficulty(difficulty)
                    .startDate(startDate)
                    .endDate(endDate)
                    .user(curUser)
                    .photoUrl(photoUrl)
                    .photoName(photoName)
                    .build();
        }

        return adventureRepository.save(newAdventure).getAdventureId();
    }

    // 특정 탐험 조회
    public ReadAdventureRes readAdventure(Long adventureId,Long userId) {
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        // 현재 이 모험id로 AdventureInProgress 가져오기.
        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow();

        // AdventureInProgress 유저들의 id만 골라오기.
        List<Long> userIds = new ArrayList<>();

        for(AdventureInProgress adventureInProgress:adventureInProgressList){
            userIds.add(adventureInProgress.getUser().getUserId());
        }

        // 유저id로 유저id와 사진 가져오기.
        List<UserIdPhotoUrl> userIdPhotoUrls = getUserIdPhotoUrl(userIds);

        // isParticipating
        Boolean participation = Boolean.FALSE;
        if(isParticipating(adventureId,userId)){
            participation=Boolean.TRUE;
        }

        // subAdventurePlaces
        List<SubAdventurePlace> subAdventurePlaces = new ArrayList<>();
        // 이 모험의 AdventurePlace들을 가져와서 id와 좌표만 뽑는다.
        List<AdventurePlace> adventurePlaceList = adventurePlaceRepository.findAllByAdventure(adventure).orElseThrow(AdventureNotFoundException::new);

        for (AdventurePlace adventurePlace:adventurePlaceList){
            SubCoordinate subCoordinate = new SubCoordinate(adventurePlace.getCoordinate().getX(),adventurePlace.getCoordinate().getY());
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
                adventure.getAvgReviewRate(),
                new UserIdPhotoUrl(adventure.getUser().getUserId(),adventure.getUser().getPhotoUrl()),
                adventure.getUser().getNickname(),
                userIdPhotoUrls,
                adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureNotFoundException::new),
                participation,
                subAdventurePlaces
        );

        return readAdventureRes;
    }

    private boolean isParticipating(Long adventureId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        if(adventureInProgressRepository.findByUserAndAdventure(user,adventure).isPresent()){
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

    // 모든 탐험 조회(생성순, 달성순, 거리순)
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

            System.out.println(adventureIds);

            for (Long i : adventureIds) {
                Adventure adventure = adventureRepository.findById(i).orElseThrow(AdventureNotFoundException::new);

                // 현재 이 모험id로 AdventureInProgress 가져오기.
                List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow();

                // AdventureInProgress 유저들의 id만 골라오기.
                List<Long> userIds = new ArrayList<>();

                for(AdventureInProgress adventureInProgress:adventureInProgressList){
                    userIds.add(adventureInProgress.getUser().getUserId());
                }

                // 유저id로 유저id와 사진 가져오기.
                List<UserIdPhotoUrl> userIdPhotoUrls = getUserIdPhotoUrl(userIds);

                ReadAdventuresRes newReadAdventureRes = new ReadAdventuresRes(
                        adventure.getAdventureId(),
                        adventure.getTitle(),
                        adventure.getDifficulty(),
                        adventure.getPhotoUrl(),
                        new UserIdPhotoUrl(adventure.getUser().getUserId(),adventure.getUser().getPhotoUrl()),
                        adventure.getUser().getNickname(),
                        userIdPhotoUrls,
                        adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureNotFoundException::new)
                );

                result.add(newReadAdventureRes);
            }
        } else {
            // 생성시간 조회
            if (order.equals("update")) {
                List<Adventure> temp = adventureRepository.findAllByOrderByCreateTimeAsc().orElseThrow(AdventureNotFoundException::new);

                for (Adventure adventure : temp) {
                    // 현재 이 모험으로 AdventureInProgress 가져오기.
                    List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow();

                    // AdventureInProgress 유저들의 id만 골라오기.
                    List<Long> userIds = new ArrayList<>();

                    for(AdventureInProgress adventureInProgress:adventureInProgressList){
                        userIds.add(adventureInProgress.getUser().getUserId());
                    }

                    // 유저id로 유저id와 사진 가져오기.

                    List<UserIdPhotoUrl> userIdPhotoUrls = getUserIdPhotoUrl(userIds);

                    ReadAdventuresRes newReadAdventureRes = new ReadAdventuresRes(
                            adventure.getAdventureId(),
                            adventure.getTitle(),
                            adventure.getDifficulty(),
                            adventure.getPhotoUrl(),
                            new UserIdPhotoUrl(adventure.getUser().getUserId(),adventure.getUser().getPhotoUrl()),
                            adventure.getUser().getNickname(),
                            userIdPhotoUrls,
                            adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureNotFoundException::new)
                    );

                    result.add(newReadAdventureRes);
                }
            }
            // 달성자순 조회
            else if (order.equals("user")) {

            }
        }

        return result;
    }

    private List<UserIdPhotoUrl> getUserIdPhotoUrl(List<Long> userIds) {
        List<UserIdPhotoUrl> result = new ArrayList<>();

        for(Long userId:userIds){
            User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
            result.add(new UserIdPhotoUrl(user.getUserId(),user.getPhotoUrl()));
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
                    .title(place.title())
                    .content(place.content())
                    .coordinate(new GeometryFactory().createPoint(new Coordinate(place.coordinate()[1], place.coordinate()[0])))
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

        List<AdventureSucceed> adventureSucceeds = adventureSucceedRepository.findAllByUser(curUser);

        List<ReadAdventureSucceedRes> result = new ArrayList<>();

        for (AdventureSucceed adventureSucceed : adventureSucceeds) {
            ReadAdventureSucceedRes readAdventureSucceedRes = new ReadAdventureSucceedRes(adventureSucceed.getAdventure().getAdventureId());

            result.add(readAdventureSucceedRes);
        }

        return result;
    }

    // 특정 탐험 달성자의 후기 추가
    public void createAdventureReview(Long adventureId, CreateAdventureReviewReq createAdventureReviewReq, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        AdventureReview newAdventureReview = AdventureReview.builder()
                .content(createAdventureReviewReq.content())
                .rate(createAdventureReviewReq.rate())
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureReviewRepository.save(newAdventureReview);
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
                    ar.getRate(),
                    ar.getContent()
            );

            result.add(newReadAdventureReviewRes);
        }

        return result;
    }

    // 탐험 후기 수정
    public void updateAdventureReview(Long adventurereviewId, UpdateAdventureReviewReq updateAdventureReviewReq, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        // 꺼내와서,
        AdventureReview curAdvventureReview = adventureReviewRepository.findById(adventurereviewId).orElseThrow(AdventureReviewNotFoundException::new);

        // 내용 갈아끼운 후,
        AdventureReview updateAdventureReview = AdventureReview.builder()
                .adventureReviewId(curAdvventureReview.getAdventureReviewId())
                .content(updateAdventureReviewReq.content())
                .rate(updateAdventureReviewReq.rate())
                .user(curUser)
                .adventure(curAdvventureReview.getAdventure())
                .build();

        curAdvventureReview = updateAdventureReview;

        // 저장.
        adventureReviewRepository.save(curAdvventureReview);
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
//    public List<ReadAdventuresRes> readAdventureSearch(String keyword) {
//        System.out.println(keyword);
//        List<Adventure> adventureList = adventureRepository.findByTitleContaining(keyword).orElseThrow(AdventureNotFoundException::new);
//        System.out.println("==================================================================");
//
//        List<ReadAdventuresRes> readAdventureResList = new ArrayList<>();
//        for (Adventure adventure : adventureList) {
//            ReadAdventuresRes newReadAdventureRes = new ReadAdventuresRes(
//                    adventure.getAdventureId(),
//                    adventure.getUser().getUserId(),
//                    adventure.getCategory().getCategory(),
//                    adventure.getFeatTitle(),
//                    adventure.getFeatContent(),
//                    adventure.getTitle(),
//                    adventure.getContent(),
//                    adventure.getDifficulty(),
//                    adventure.getPhotoUrl(),
//                    adventure.getStartDate(),
//                    adventure.getEndDate(),
//                    adventure.getAvgReviewRate()
//            );
//
//            readAdventureResList.add(newReadAdventureRes);
//        }
//
//        return readAdventureResList;
//    }

    // 특정 위치에서 일정 거리 안에 내가 참가중인 탐험과 탐험 장소 조회하기
    public List<ReadAdventureInProgressWithinDistanceRes> readAdventureInProgressWithinDistance(Double lat, Double lng, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Double area = 500.0;

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

        System.out.println("============="+adventurePlaceList.get(0).getCoordinate().getX()+"==============");

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

        for(Category category:categories){
            result.add(category.getCategory());
        }

        return result;

    }

    //
    // API가 아닌 method.
    //

    // 특정 유저가 진행중인 특정 탐험의 달성률 조회
    public Integer readClearRateByuserIdAndAdventureId(Long userId,Long adventureId){
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        AdventureInProgress adventureInProgress = adventureInProgressRepository.findByUserAndAdventure(user,adventure).orElseThrow(AdventureInProgressNotFoundException::new);
        Integer result = (int)((double)adventureInProgress.getCurrentPoint()/(double)adventureInProgress.getTotalPoint()*100.0);
        return result;
    }

    // 특정 모험을 진행중인 유저들의 id들을 반환.
    public List<Long> readUserIdsByAdventureId(Long adventureId){
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);

        List<Long> result = new ArrayList<>();

        // 특정 모험의 AdventureInProgress를 가져오기.
        List<AdventureInProgress> adventureInProgressList = adventureInProgressRepository.findAllByAdventure(adventure).orElseThrow(UserNotFoundException::new);

        // 그 모험을 진행중인 유저들의 id 뽑기.
        for(AdventureInProgress adventureInProgress:adventureInProgressList){
            result.add(adventureInProgress.getUser().getUserId());
        }

        return result;
    }

    // 특정 모험을 진행중인 유저들의 인원 수 반환.
    public Long findUserCountByAdventure(Long adventureId){
        Adventure adventure = adventureRepository.findById(adventureId).orElseThrow(AdventureNotFoundException::new);
        return adventureInProgressRepository.countByAdventure(adventure).orElseThrow(AdventureInProgressNotFoundException::new);
    }



}
