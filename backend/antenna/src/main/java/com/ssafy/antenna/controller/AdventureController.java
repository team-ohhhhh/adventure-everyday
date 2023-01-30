package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.adventure.dto.*;
import com.ssafy.antenna.service.AdventureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/adventures")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class AdventureController {

    private final AdventureService adventureService;

    // 탐험 추가
    @PostMapping()
    public ResponseEntity<String> createAdventure(@RequestBody CreateAdventureReq createAdventureReq, Authentication authentication){
       // 탐험 추가
        adventureService.createAdventure(createAdventureReq,Long.valueOf(authentication.getName()));
        return new ResponseEntity<String>("탐험 추가 성공",HttpStatus.OK);
    }

    // 특정 탐험 조회
    @GetMapping("/{adventureId}")
    public ResponseEntity<ReadAdventureRes> readAdventure(@PathVariable Long adventureId){
        ReadAdventureRes result = adventureService.readAdventure(adventureId);
        return new ResponseEntity<ReadAdventureRes>(result,HttpStatus.OK);
    }

    // 특정 탐험 삭제
    @DeleteMapping("/{adventureId}")
    public ResponseEntity<String> deleteAdventure(@PathVariable Long adventureId){
        // 탐험 삭제
        adventureService.deleteAdventure(adventureId);
        return new ResponseEntity<String>("탐험 삭제 성공",HttpStatus.OK);
    }

    // 모든 탐험 조회(생성순, 달성순, 거리순)
    @GetMapping()
    public ResponseEntity<List< ReadAdventureRes >> readAdventures(@RequestParam String order, @RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng){
        return new ResponseEntity<List<ReadAdventureRes>>(adventureService.readAdventures(order,lat,lng),HttpStatus.OK);
    }

    // 특정 탐험 장소(체크포인트) 추가
    @PostMapping("/{adventureId}/places")
    public ResponseEntity<String> createAdventurePlace(@PathVariable Long adventureId,@RequestBody CreateAdventurePlaceReq[] places){
        System.out.println("=========================");
//        System.out.println(Arrays.toString(places));
        adventureService.createAdventurePlace(adventureId,places);
        return new ResponseEntity<>("특정 탐험 장소(체크포인트) 추가 성공",HttpStatus.OK);
    }

    // 특정 탐험의 장소들(체크포인트들) 조회
    @GetMapping("/{adventureId}/places")
    public ResponseEntity<List<ReadAdventurePlaceRes>> readAdventurePlace(@PathVariable Long adventureId){
        List<ReadAdventurePlaceRes> result = adventureService.readAdventurePlace(adventureId);
        return new ResponseEntity<List<ReadAdventurePlaceRes>>(result,HttpStatus.OK);
    }

    // 특정 유저가 참가중인 탐험 추가(탐험 참가)
    @PostMapping("/{adventureId}/adventure-in-progress")
    public ResponseEntity<String> createAdventureInProgress(@PathVariable Long adventureId,Authentication authentication){
        adventureService.createAdventureInProgress(adventureId,Long.valueOf(authentication.getName()));
        return new ResponseEntity<>("탐험 참가 성공~~",HttpStatus.OK);
    }
    // 특정 유저가 참가중인 탐험 조회
    @GetMapping("/adventure-in-progress")
    public ResponseEntity<List<ReadAdventureInProgressRes>> readAdventureInProgress(Authentication authentication){
        List<ReadAdventureInProgressRes> result = adventureService.readAdventureInProgress(Long.valueOf(authentication.getName()));
        return new ResponseEntity<List<ReadAdventureInProgressRes>>(result,HttpStatus.OK);
    }

    // 탐험 포기(특정 유저가 참가중인 탐험 삭제)
    @DeleteMapping("/{adventureId}/adventure-in-progress")
    public ResponseEntity<String> deleteAdventureInProgress(@PathVariable Long adventureId){
        adventureService.deleteAdventureInProgress(adventureId);
        return new ResponseEntity<>("탐험 포기 성공~~",HttpStatus.OK);
    }

    // 탐험 알림 켜기
    @PostMapping("/{adventureId}/adventure-like")
    public ResponseEntity<String> createAdventureLike(@PathVariable Long adventureId, Authentication authentication){
        adventureService.createAdventureLike(adventureId,Long.valueOf(authentication.getName()));
        return new ResponseEntity<String>("피드 켜기 성공~~",HttpStatus.OK);
    }

    // 탐험 알림 조회
    @GetMapping("/{adventureId}/adventure-like")
    public ResponseEntity<ReadAdventureLikeRes> readAdventureLike(@PathVariable Long adventureId, Authentication authentication){
        ReadAdventureLikeRes result = adventureService.readAdventureLike(adventureId,Long.valueOf(authentication.getName()));
        return new ResponseEntity<ReadAdventureLikeRes>(result,HttpStatus.OK);
    }

    // 탐험 알림 끄기
    @DeleteMapping("/adventure-like/{adventureLikeId}")
    public ResponseEntity<String> deleteAdventureLike(@PathVariable Long adventureLikeId){
        adventureService.deleteAdventureLike(adventureLikeId);
        return new ResponseEntity<>("탐험 알림 끄기 성공~~",HttpStatus.OK);
    }

    // 특정 탐험 달성자 추가
    @PostMapping("/adventure-succeed/{adventureId}")
    public ResponseEntity<String> creaateAdventureSucceed(@PathVariable Long adventureId,Authentication authentication){
        adventureService.createAdventureSucceed(adventureId,Long.valueOf(authentication.getName()));
        return new ResponseEntity<String>("특정 탐험 달성자 추가 성공",HttpStatus.OK);
    }

    // 특정 유저의 달성한 탐험들 조회
//    @GetMapping("/adventure-succeed")
//    public ResponseEntity<List<ReadAdventureSucceedRes>> readAdventureSucceed(Authentication authentication){
//        List<ReadAdventureSucceedRes> result = adventureService.readAdventureSucceed(Long.valueOf(authentication.getName()));
//        return new ResponseEntity<List<ReadAdventureSucceedRes>>(result,HttpStatus.OK);
//    }

    // 특정 탐험의 후기 추가
    @PostMapping("/{adventureId}/reviews")
    public ResponseEntity<String> createAdventureReview(@PathVariable Long adventureId, @RequestBody CreateAdventureReviewReq createAdventureReviewReq, Authentication authentication){
        adventureService.createAdventureReview(adventureId,createAdventureReviewReq,Long.valueOf(authentication.getName()));
        return new ResponseEntity<>("탐험 후기 추가 성공",HttpStatus.OK);
    }

    // 특정 탐험의 후기들 조회
    @GetMapping("/{adventureId}/reviews")
    public ResponseEntity<List<ReadAdventureReviewRes>> readAdventureReview(@PathVariable Long adventureId){
        List<ReadAdventureReviewRes> result = adventureService.readAdventureReview(adventureId);
        return new ResponseEntity<List<ReadAdventureReviewRes>>(result,HttpStatus.OK);
    }

    // 탐험 후기 수정
    @PutMapping("/reviews/{adventurereviewId}")
    public ResponseEntity<String> updateAdventureReview(@PathVariable Long adventurereviewId, @RequestBody UpdateAdventureReviewReq updateAdventureReviewReq, Authentication authentication){
        adventureService.updateAdventureReview(adventurereviewId,updateAdventureReviewReq,Long.valueOf(authentication.getName()));
        return new ResponseEntity<>("탐험 후기 수정 성공",HttpStatus.OK);
    }

    // 탐험 후기 삭제
    @DeleteMapping("/reviews/{adventureReviewId}")
    public ResponseEntity<String> deleteAdventureReview(@PathVariable Long adventureReviewId){
        adventureService.deleteAdventureReview(adventureReviewId);
        return new ResponseEntity<>("탐험 후기 삭제 성공",HttpStatus.OK);
    }

    // 모험 검색(모든 모험 키워드 조회)
    @GetMapping("/search")
    public ResponseEntity<List<ReadAdventureRes>> readAdventureSearch(@RequestParam String keyword){
        List<ReadAdventureRes> result = adventureService.readAdventureSearch(keyword);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    // 특정 위치에서 일정 거리 안에 특정 유저가 참가중인 탐험과 탐험 장소 조회하기
//    @GetMapping("/adventure-in-progress/check")
//    public ResponseEntity<List<ReadAdventureInProgressWithinDistanceRes>> readAdventureInProgressWithinDistance(@RequestParam Double lat,@RequestParam Double lng, Authentication authentication){
//        List<ReadAdventureInProgressWithinDistanceRes> result = adventureService.readAdventureInProgressWithinDistance(lng,lat,Long.valueOf(authentication.getName()));
//        return new ResponseEntity<List<ReadAdventureInProgressWithinDistanceRes>>(result,HttpStatus.OK);
//    }


}
