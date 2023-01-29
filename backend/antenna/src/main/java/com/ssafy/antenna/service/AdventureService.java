package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.adventure.AdventureReview;
import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.adventure.dto.*;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.repository.*;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdventureService {
    private final AdventureRepository adventureRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AdventureSucceedRepository adventureSucceedRepository;
    private final AdventurePlaceRepository adventurePlaceRepository;
    private final AdventureReviewRepository adventureReviewRepository;

    // 탐험 추가
    public void createAdventure(CreateAdventureReq createAdventureReq, Long userId){
        Optional<User> curUser = userRepository.findById(userId);

        // 탐험을 생성한 후,
        Adventure newAdventure = Adventure.builder()
                .category(categoryRepository.findCategoryIdByCategory(createAdventureReq.category()).orElseThrow())
                .feat(createAdventureReq.feat())
                .title(createAdventureReq.title())
                .content(createAdventureReq.content())
                .difficulty(createAdventureReq.difficulty())
                .photo(createAdventureReq.photo())
                .startDate(createAdventureReq.startDate())
                .endDate(createAdventureReq.endDate())
                .user(curUser.orElseThrow())
                .build();
        adventureRepository.save(newAdventure);

        // 생성한 탐험의 id를 가지고 탐험 장소를 생성한다.

        // 입력 확인.
        /*
        System.out.println(createAdventureReq.locationTitle());
        System.out.println(createAdventureReq.locationContent());
        for(Double[] d : createAdventureReq.coordinate()){
            Arrays.toString(d);
        }
         */

        // 좌표의 개수만큼 반복
        for(Double[] point:createAdventureReq.coordinate()) {
            AdventurePlace newAdventurePlace = AdventurePlace.builder()
                    .title(createAdventureReq.locationTitle())
                    .content(createAdventureReq.locationContent())
                    .coordinate(new GeometryFactory().createPoint(new Coordinate(point[0],point[1])))
                    .adventure(newAdventure)
                    .build();

            adventurePlaceRepository.save(newAdventurePlace);
        }
    }

    // 탐험 삭제
    public void deleteAdventure(Long adventureId){
        adventureRepository.deleteById(adventureId);
    }

    // 탐험 조회(생성순, 달성순, 거리순)
    public List<ReadAdventureRes> readAdventure(String order,Double lat,Double lng){
        // 거리순 조회
        List<ReadAdventureRes> result=new ArrayList<>();
        if(lat!=null && lng!=null){

        }else{
            // 생성시간 조회
            if(order.equals("update")){
                List<Adventure>temp = adventureRepository.findAllByOrderByCreateTimeAsc().orElseThrow();
                result = adventureToReadAdventureRes(temp);
            }
            // 달성자순 조회
            else if(order.equals("user")){

            }
        }

        return result;
    }

    // Entity class를 Response로 변환.
    public List<ReadAdventureRes> adventureToReadAdventureRes(List<Adventure> temp){
        List<ReadAdventureRes> result=new ArrayList<>();

        for(Adventure adventrue : temp){
            ReadAdventureRes newReadAdventureRes = new ReadAdventureRes(
                    adventrue.getAdventureId(),
                    adventrue.getCategory().getCategory(),
                    adventrue.getFeat(),
                    adventrue.getTitle(),
                    adventrue.getContent(),
                    adventrue.getDifficulty(),
                    adventrue.getPhoto(),
                    adventrue.getStartDate(),
                    adventrue.getEndDate(),
                    adventrue.getAvgReviewRate()
            );
            result.add(newReadAdventureRes);
        }

        return result;
    }

    // 특정 유저가 참가중인 탐험 추가(탐험 참가하기)
    public void createAdventureInProgress(CreateAdventureInProgressReq createAdventureInProgressReq, Long valueOf) {

    }

    // 특정 탐험 달성자 추가
    public void createAdventureSucceed(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow();
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow();

        AdventureSucceed newAdventureSucceed = AdventureSucceed.builder()
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureSucceedRepository.save(newAdventureSucceed);
    }



    // 특정 탐험 달성자의 후기 추가
    public void createAdventureReview(Long adventureId, CreateAdventureReviewReq createAdventureReviewReq, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow();
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow();

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

        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow();

        List<AdventureReview> temp = adventureReviewRepository.findAllByAdventure(curAdventure).orElseThrow();

        for(AdventureReview ar:temp){
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

    // 탐험 후기 삭제
    public void deleteAdventureReview(Long adventureReviewId) {
        adventureReviewRepository.deleteById(adventureReviewId);
    }
}
