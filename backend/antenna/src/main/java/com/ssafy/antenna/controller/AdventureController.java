package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.adventure.dto.click.*;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventurePlaceReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReq;
import com.ssafy.antenna.domain.adventure.dto.req.CreateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.req.UpdateAdventureReviewReq;
import com.ssafy.antenna.domain.adventure.dto.res.*;
import com.ssafy.antenna.exception.ErrorCode;
import com.ssafy.antenna.exception.bad_request.BadConstantException;
import com.ssafy.antenna.service.AdventureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/adventures")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class AdventureController {
    private final AdventureService adventureService;

    // 탐험 추가
    @PostMapping
    public ResultResponse<String> createAdventure(
            @RequestBody CreateAdventureReq createAdventureReq,
            Authentication authentication
    ) {
        adventureService.createAdventure(createAdventureReq, Long.valueOf(authentication.getName()));
        //탐험 추가
        return ResultResponse.success("탐험 추가 성공");
    }

    // 특정 탐험 조회
    @GetMapping("/{adventureId}")
    public ResultResponse<?> readAdventure(
            @PathVariable Long adventureId,
            Authentication authentication
    ) {
        if(adventureId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));};
        ReadAdventureRes result = adventureService.readAdventure(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 특정 탐험 삭제
    @DeleteMapping("/{adventureId}")
    public ResultResponse<?> deleteAdventure(@PathVariable Long adventureId) {
        if(adventureId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));};
        adventureService.deleteAdventure(adventureId);
        return ResultResponse.success("탐험 삭제 성공");
    }

    // 모든 탐험 조회(생성순, 달성순, 거리순)
    @GetMapping()
    public ResultResponse<List<ReadAdventuresRes>> readAdventures(
            @RequestParam String order,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng
    ) {
        if(order.length()==0) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventures(order, lat, lng));
    }

    // 특정 탐험 장소(체크포인트) 추가
    @PostMapping("/{adventureId}/places")
    public ResultResponse<String> createAdventurePlace(
            @PathVariable Long adventureId,
            @RequestBody CreateAdventurePlaceReq[] places
    ) {
        if(adventureId < 1) throw new BadConstantException();
        adventureService.createAdventurePlace(adventureId, places);
        return ResultResponse.success("특정 탐험 장소(체크포인트) 추가 성공");
    }

    // 특정 탐험의 장소들(체크포인트들) 조회
    @GetMapping("/{adventureId}/places")
    public ResultResponse<List<ReadAdventurePlaceRes>> readAdventurePlace(
            @PathVariable Long adventureId
    ) {
        if(adventureId < 1) throw new BadConstantException();
        List<ReadAdventurePlaceRes> result = adventureService.readAdventurePlace(adventureId);
        return ResultResponse.success(result);
    }

    // 특정 탐험의 칭호 조회
    @GetMapping("/{adventureId}/feat")
    public ResultResponse<String> getAdventureFeat(@PathVariable Long adventureId) {
        if(adventureId < 1) throw new BadConstantException();
        return adventureService.getAdventureFeat(adventureId);
    }

    //

    // 특정 유저가 참가중인 탐험 추가(탐험 참가)
    @PostMapping("/{adventureId}/adventure-in-progress")
    public ResultResponse<String> createAdventureInProgress(
            @PathVariable Long adventureId,
            Authentication authentication
    ) {
        if(adventureId < 1) throw new BadConstantException();
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
        if(adventureId < 1) throw new BadConstantException();
        adventureService.deleteAdventureInProgress(adventureId);
        return ResultResponse.success("탐험 포기 성공~~");
    }

    // 탐험 알림 켜기
    @PostMapping("/{adventureId}/adventure-like")
    public ResultResponse<String> createAdventureLike(
            @PathVariable Long adventureId,
            Authentication authentication
    ) {
        if(adventureId < 1) throw new BadConstantException();
        adventureService.createAdventureLike(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success("알림 켜기 성공~~");
    }

    // 탐험 알림 조회
    @GetMapping("/{adventureId}/adventure-like")
    public ResultResponse<ReadAdventureLikeRes> readAdventureLike(
            @PathVariable Long adventureId,
            Authentication authentication
    ) {
        if(adventureId < 1) throw new BadConstantException();
        ReadAdventureLikeRes result = adventureService.readAdventureLike(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 탐험 알림 끄기
    @DeleteMapping("/adventure-like/{adventureLikeId}")
    public ResultResponse<String> deleteAdventureLike(
            @PathVariable Long adventureLikeId
    ) {
        if(adventureLikeId < 1) throw new BadConstantException();
        adventureService.deleteAdventureLike(adventureLikeId);
        return ResultResponse.success("탐험 알림 끄기 성공~~");
    }

    // 특정 탐험 진행자, 달성률 조회
    @GetMapping("/adventure-in-progress/{adventureId}")
    public ResultResponse<List<ReadAdventureInProgressUsersRes>> readAdventureInProgressUsers(@PathVariable Long adventureId) {
        if(adventureId < 1) throw new BadConstantException();
        List<ReadAdventureInProgressUsersRes> result = adventureService.readAdventureInProgressUsers(adventureId);
        return ResultResponse.success(result);
    }

    // 특정 탐험 달성자 추가
    @PostMapping("/adventure-succeed/{adventureId}")
    public ResultResponse<String> creaateAdventureSucceed(
            @PathVariable Long adventureId,
            Authentication authentication
    ) {
        if(adventureId < 1) throw new BadConstantException();
        adventureService.createAdventureSucceed(adventureId, Long.valueOf(authentication.getName()));
        return ResultResponse.success("특정 탐험 달성자 추가 성공");
    }

    // 특정 유저의 달성한 탐험id들 조회
    @GetMapping("/adventure-succeed/users/{userId}")
    public ResultResponse<List<ReadAdventureSucceedRes>> readAdventureSucceedOfUser(@PathVariable Long userId) {
        if(userId < 1) throw new BadConstantException();
        List<ReadAdventureSucceedRes> result = adventureService.readAdventureSucceedOfUser(userId);
        return ResultResponse.success(result);
    }

    // 특정 탐험의 후기 추가
    @PostMapping("/{adventureId}/reviews")
    public ResultResponse<String> createAdventureReview(
            @PathVariable Long adventureId,
            @RequestBody CreateAdventureReviewReq createAdventureReviewReq,
            Authentication authentication
    ) {
        if(adventureId < 1) throw new BadConstantException();
        adventureService.createAdventureReview(adventureId, createAdventureReviewReq, Long.valueOf(authentication.getName()));
        return ResultResponse.success("탐험 후기 추가 성공");
    }

    // 특정 탐험의 후기들 조회
    @GetMapping("/{adventureId}/reviews")
    public ResultResponse<List<ReadAdventureReviewRes>> readAdventureReview(@PathVariable Long adventureId) {
        if(adventureId < 1) throw new BadConstantException();
        List<ReadAdventureReviewRes> result = adventureService.readAdventureReview(adventureId);
        return ResultResponse.success(result);
    }

    // 탐험 후기 수정
    @PutMapping("/reviews/{adventurereviewId}")
    public ResultResponse<String> updateAdventureReview(
            @PathVariable Long adventurereviewId,
            @RequestBody UpdateAdventureReviewReq updateAdventureReviewReq,
            Authentication authentication
    ) throws IllegalAccessException {
        if(adventurereviewId < 1) throw new BadConstantException();
        adventureService.updateAdventureReview(adventurereviewId, updateAdventureReviewReq, Long.valueOf(authentication.getName()));
        return ResultResponse.success("탐험 후기 수정 성공");
    }

    // 탐험 후기 삭제
    @DeleteMapping("/reviews/{adventureReviewId}")
    public ResultResponse<String> deleteAdventureReview(@PathVariable Long adventureReviewId) {
        if(adventureReviewId < 1) throw new BadConstantException();
        adventureService.deleteAdventureReview(adventureReviewId);
        return ResultResponse.success("탐험 후기 삭제 성공");
    }

    // 특정 모험의 특정 장소의 게시글 조회
    @GetMapping("/adventure-places/{adventurePlaceId}/posts")
    public ResultResponse<List<ReadAdventurePlacePostRes>> readAdventurePlacePost(
            @PathVariable Long adventurePlaceId
    ) {
        if(adventurePlaceId < 1) throw new BadConstantException();
        List<ReadAdventurePlacePostRes> result = adventureService.readAdventurePlacePost(adventurePlaceId);
        return ResultResponse.success(result);
    }

    // 특정 모험의 모든 장소의 게시글 조회
    @GetMapping("/{adventureId}/adventure-places/posts")
    public ResultResponse<List<ReadAdventurePlacePostRes>> readAdventurePosts(
            @PathVariable Long adventureId
    ) {
        if(adventureId < 1) throw new BadConstantException();
        List<ReadAdventurePlacePostRes> result = adventureService.readAdventurePosts(adventureId);
        return ResultResponse.success(result);
    }

    // 모험 검색(모든 모험 키워드 조회)
    @GetMapping("/search")
    public ResultResponse<List<ReadAdventuresRes>> readAdventureSearch(
            @RequestParam String keyword
    ) {
        List<ReadAdventuresRes> result = adventureService.readAdventureSearch(keyword);
        return ResultResponse.success(result);
    }

    // 특정 위치에서 일정 거리 안에 특정 유저가 참가중인 탐험과 탐험 장소 조회하기
    @GetMapping("/adventure-in-progress/check")
    public ResultResponse<List<ReadAdventureInProgressWithinDistanceRes>> readAdventureInProgressWithinDistance(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam Double area,
            Authentication authentication
    ) {
        List<ReadAdventureInProgressWithinDistanceRes> result = adventureService.readAdventureInProgressWithinDistance(lng, lat, area, Long.valueOf(authentication.getName()));
        return ResultResponse.success(result);
    }

    // 탐험 카테고리 조회
    @GetMapping("/categories")
    public ResultResponse<List<String>> readCategories() {
        List<String> result = adventureService.readCategories();
        return ResultResponse.success(result);
    }

    // 탐험 장소 하나 눌렀을 때
    @GetMapping("/adventure-places/{adventurePlaceId}")
    public ResultResponse<ReadAdventurePlaceClickRes> readAdventurePlaceClick(
            @PathVariable Long adventurePlaceId,
            @RequestParam String order
    ) {
        if(adventurePlaceId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventurePlaceClick(adventurePlaceId,order));
    }

    // '탐험 후기'탭 눌렀을 때
    @GetMapping("/{adventureId}/adventure-review")
    public ResultResponse<ReadAdventureReviewClickRes> readAdventureReviewClick(
            @PathVariable Long adventureId
    ) {
        if(adventureId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureReviewClick(adventureId));
    }

    // '탐험 중'탭 눌렀을 때
    @GetMapping("/clicks/adventure-in-progress/users/{userId}")
    public ResultResponse<List<ReadAdventureInProgressClickRes>> readAdventureInProgressClick(
            @PathVariable Long userId,
            @RequestParam String order
    ) {
        if(userId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureInProgressClick(userId, order));
    }

    // '완료한 탐험' 탭 눌렀을 때
    @GetMapping("/clicks/adventure-succeed/users/{userId}")
    public ResultResponse<ReadAdventureSucceedClickRes> readAdventureSucceedClick(
            @PathVariable Long userId,
            @RequestParam String order
    ) {
        if(userId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureSucceedClick(userId,order));
    }

    // 특정 유저의 전체 보물 보기.
    @GetMapping("/treasures/users/{userId}")
    public ResultResponse<ReadAdventureTreasuresMoreClickRes> readAdventureTreasuresMoreClick(
            @PathVariable Long userId
    ) {
        if(userId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureTreasuresMoreClick(userId));
    }

//    // 대표 보물로 선택(덮어쓰기)
//    @PutMapping("/treasures/representatives")
//    public ResultResponse<String> createRepresentativeTreasures(
//            Authentication authentication,
//            @RequestBody List<Long> selectedTreasures
//    ) {
//        adventureService.createRepresentativeTreasures(Long.valueOf(authentication.getName()), selectedTreasures);
//        return ResultResponse.success("대표 보물로 선택/취소 성공");
//    }

    // '만든 탐험' 탭 눌렀을 때
    @GetMapping("/clicks/adventure-creations/users/{userId}")
    public ResultResponse<List<ReadAdventureCreationsClickRes>> readAdventureCreationsClick(
            @PathVariable Long userId,
            @RequestParam String order
    ) {
        if(userId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureCreationsClick(userId,order));
    }

    // 탐험중인 사람들 보기
    @GetMapping("/{adventureId}/users")
    public ResultResponse<ReadAdventureInProgressUsersClickRes> readAdventureInProgressUsersClick(
            @PathVariable Long adventureId
    ) {
        if(adventureId < 1) throw new BadConstantException();
        return ResultResponse.success(adventureService.readAdventureInProgressUsersClick(adventureId));
    }

}
