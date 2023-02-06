package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.adventure.dto.click.ReadAdventurePlaceClickRes;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventurePlaceReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.req.UpdateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.res.*;
import com.ssafy.antenna.service.AdventureService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/adventures")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class AdventureController {
    private final AdventureService adventureService;

    // 탐험 추가
    @PostMapping
    public ResultResponse<String> createAdventure(@RequestBody CreateAdventureReq createAdventureReq, Authentication authentication) {
        adventureService.createAdventure(createAdventureReq,Long.valueOf(authentication.getName()));
        //탐험 추가
        return ResultResponse.success("탐험 추가 성공");
    }

    // 특정 탐험 조회
    @GetMapping("/{adventureId}")
    public ResultResponse<ReadAdventureRes> readAdventure(@PathVariable Long adventureId, Authentication authentication) {
        ReadAdventureRes result = adventureService.readAdventure(adventureId,Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 특정 탐험 삭제
    @DeleteMapping("/{adventureId}")
    public ResultResponse<String> deleteAdventure(@PathVariable Long adventureId) {
        // 탐험 삭제
        adventureService.deleteAdventure(adventureId);
        return ResultResponse.success("탐험 삭제 성공");
    }

    // 모든 탐험 조회(생성순, 달성순, 거리순)
    @GetMapping()
    public ResultResponse<List<ReadAdventuresRes>> readAdventures(@RequestParam String order, @RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng) {
        return ResultResponse.success(adventureService.readAdventures(order, lat, lng));
    }

    // 특정 탐험 장소(체크포인트) 추가
    @PostMapping("/{adventureId}/places")
    public ResultResponse<String> createAdventurePlace(@PathVariable Long adventureId, @RequestBody CreateAdventurePlaceReq[] places) {
        adventureService.createAdventurePlace(adventureId, places);
        return ResultResponse.success("특정 탐험 장소(체크포인트) 추가 성공");
    }

    // 특정 탐험의 장소들(체크포인트들) 조회
    @GetMapping("/{adventureId}/places")
    public ResultResponse<List<ReadAdventurePlaceRes>> readAdventurePlace(@PathVariable Long adventureId) {
        List<ReadAdventurePlaceRes> result = adventureService.readAdventurePlace(adventureId);
        return ResultResponse.success(result);
    }

    //

    // 특정 유저가 참가중인 탐험 추가(탐험 참가)
    @PostMapping("/{adventureId}/adventure-in-progress")
    public ResultResponse<String> createAdventureInProgress(@PathVariable Long adventureId, Authentication authentication) {
        adventureService.createAdventureInProgress(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success("탐험 참가 성공~~");
    }

    // 특정 유저가 참가중인 탐험 조회
    @GetMapping("/adventure-in-progress")
    public ResultResponse<List<ReadAdventureInProgressRes>> readAdventureInProgress(Authentication authentication) {
        List<ReadAdventureInProgressRes> result = adventureService.readAdventureInProgress(Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 탐험 포기(특정 유저가 참가중인 탐험 삭제)
    @DeleteMapping("/{adventureId}/adventure-in-progress")
    public ResultResponse<String> deleteAdventureInProgress(@PathVariable Long adventureId) {
        adventureService.deleteAdventureInProgress(adventureId);
        return ResultResponse.success("탐험 포기 성공~~");
    }

    // 탐험 알림 켜기
    @PostMapping("/{adventureId}/adventure-like")
    public ResultResponse<String> createAdventureLike(@PathVariable Long adventureId, Authentication authentication) {
        adventureService.createAdventureLike(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success("피드 켜기 성공~~");
    }

    // 탐험 알림 조회
    @GetMapping("/{adventureId}/adventure-like")
    public ResultResponse<ReadAdventureLikeRes> readAdventureLike(@PathVariable Long adventureId, Authentication authentication) {
        ReadAdventureLikeRes result = adventureService.readAdventureLike(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 탐험 알림 끄기
    @DeleteMapping("/adventure-like/{adventureLikeId}")
    public ResultResponse<String> deleteAdventureLike(@PathVariable Long adventureLikeId) {
        adventureService.deleteAdventureLike(adventureLikeId);
        return ResultResponse.success("탐험 알림 끄기 성공~~");
    }

    // 특정 탐험 진행자, 달성률 조회
    @GetMapping("/adventure-in-progress/{adventureId}")
    public ResultResponse<List<ReadAdventureInProgressUsersRes>> readAdventureInProgressUsers(@PathVariable Long adventureId) {
        List<ReadAdventureInProgressUsersRes> result = adventureService.readAdventureInProgressUsers(adventureId);
        return ResultResponse.success(result);
    }

    // 특정 탐험 달성자 추가
    @PostMapping("/adventure-succeed/{adventureId}")
    public ResultResponse<String> creaateAdventureSucceed(@PathVariable Long adventureId, Authentication authentication) {
        adventureService.createAdventureSucceed(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success("특정 탐험 달성자 추가 성공");
    }

    // 특정 유저의 달성한 탐험id들 조회
    @GetMapping("/adventure-succeed/users/{userId}")
    public ResultResponse<List<ReadAdventureSucceedRes>> readAdventureSucceedOfUser(@PathVariable Long userId) {
        List<ReadAdventureSucceedRes> result = adventureService.readAdventureSucceedOfUser(userId);
        return ResultResponse.success(result);
    }

    // 특정 탐험의 후기 추가
    @PostMapping("/{adventureId}/reviews")
    public ResultResponse<String> createAdventureReview(@PathVariable Long adventureId, @RequestBody CreateAdventureReviewReq createAdventureReviewReq, Authentication authentication) {
        adventureService.createAdventureReview(adventureId, createAdventureReviewReq, Long.valueOf(authentication.getName()));
        return ResultResponse.success("탐험 후기 추가 성공");
    }

    // 특정 탐험의 후기들 조회
    @GetMapping("/{adventureId}/reviews")
    public ResultResponse<List<ReadAdventureReviewRes>> readAdventureReview(@PathVariable Long adventureId) {
        List<ReadAdventureReviewRes> result = adventureService.readAdventureReview(adventureId);
        return ResultResponse.success(result);
    }

    // 탐험 후기 수정
    @PutMapping("/reviews/{adventurereviewId}")
    public ResultResponse<String> updateAdventureReview(@PathVariable Long adventurereviewId, @RequestBody UpdateAdventureReviewReq updateAdventureReviewReq, Authentication authentication) {
        adventureService.updateAdventureReview(adventurereviewId, updateAdventureReviewReq, Long.valueOf(authentication.getName()));
        return ResultResponse.success("탐험 후기 수정 성공");
    }

    // 탐험 후기 삭제
    @DeleteMapping("/reviews/{adventureReviewId}")
    public ResultResponse<String> deleteAdventureReview(@PathVariable Long adventureReviewId) {
        adventureService.deleteAdventureReview(adventureReviewId);
        return ResultResponse.success("탐험 후기 삭제 성공");
    }

    // 특정 모험의 특정 장소의 게시글 조회
    @GetMapping("/adventure-places/{adventurePlaceId}/posts")
    public ResultResponse<List<ReadAdventurePlacePostRes>> readAdventurePlacePost(@PathVariable Long adventurePlaceId) {
        List<ReadAdventurePlacePostRes> result = adventureService.readAdventurePlacePost(adventurePlaceId);
        return ResultResponse.success(result);
    }

    // 특정 모험의 모든 장소의 게시글 조회
    @GetMapping("/{adventureId}/adventure-places/posts")
    public ResultResponse<List<ReadAdventurePlacePostRes>> readAdventurePosts(@PathVariable Long adventureId) {
        List<ReadAdventurePlacePostRes> result = adventureService.readAdventurePosts(adventureId);
        return ResultResponse.success(result);
    }

    // 모험 검색(모든 모험 키워드 조회)
//    @GetMapping("/search")
//    public ResultResponse<List<ReadAdventuresRes>> readAdventureSearch(@RequestParam String keyword) {
//        List<ReadAdventuresRes> result = adventureService.readAdventureSearch(keyword);
//        return ResultResponse.success(result);
//    }

    // 특정 위치에서 일정 거리 안에 특정 유저가 참가중인 탐험과 탐험 장소 조회하기
    @GetMapping("/adventure-in-progress/check")
    public ResultResponse<List<ReadAdventureInProgressWithinDistanceRes>> readAdventureInProgressWithinDistance(@RequestParam Double lat, @RequestParam Double lng, Authentication authentication) {
        List<ReadAdventureInProgressWithinDistanceRes> result = adventureService.readAdventureInProgressWithinDistance(lng, lat, Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 탐험 카테고리 조회
    @GetMapping("/categories")
    public ResultResponse<List<String>> readCategories(){
        List<String> result = adventureService.readCategories();
        return ResultResponse.success(result);
    }

    // 탐험 장소 하나 눌렀을 때
    @GetMapping("/adventure-places/{adventurePlaceId}")
    public ResultResponse<ReadAdventurePlaceClickRes> readAdventurePlaceClick(@PathVariable Long adventurePlaceId){
        return ResultResponse.success(adventureService.readAdventurePlaceClick(adventurePlaceId));
    }

    // '탐험 후기'탭 눌렀을 때
    @GetMapping("/{adventureId}/adventure-review")
    public ResultResponse<ReadAdventureReviewClickRes> readAdventureReviewClick(@PathVariable Long adventureId){
        return ResultResponse.success(adventureService.readAdventureReviewClick(adventureId));
    }


}
