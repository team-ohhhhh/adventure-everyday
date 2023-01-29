package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.adventure.dto.CreateAdventureInProgressReq;
import com.ssafy.antenna.domain.adventure.dto.CreateAdventureReq;
import com.ssafy.antenna.domain.adventure.dto.ReadAdventureRes;
import com.ssafy.antenna.domain.adventure.dto.ReadAdventureSucceedRes;
import com.ssafy.antenna.service.AdventureService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    // 탐험 삭제
    @DeleteMapping("/{adventureId}")
    public ResponseEntity<String> deleteAdventure(@PathVariable Long adventureId){
        // 탐험 삭제
        adventureService.deleteAdventure(adventureId);
        return new ResponseEntity<String>("탐험 삭제 성공",HttpStatus.OK);
    }

    // 탐험 조회(생성순, 달성순, 거리순)
    @GetMapping()
    public ResponseEntity<List< ReadAdventureRes >> readAdventure(@RequestParam String order, @RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng){
        return new ResponseEntity<List<ReadAdventureRes>>(adventureService.readAdventure(order,lat,lng),HttpStatus.OK);
    }

    // 특정 유저가 참가중인 탐험 추가(탐험 참가하기)
    @PostMapping("/adventure-in-progress")
    public ResponseEntity<String> createAdventureInProgress(@RequestBody CreateAdventureInProgressReq createAdventureInProgressReq,Authentication authentication){
        adventureService.createAdventureInProgress(createAdventureInProgressReq,Long.valueOf(authentication.getName()));
        return new ResponseEntity<>("특정 유저가 참가중인 탐험 추가(탐험 참가하기)",HttpStatus.OK);
    }
    // 특정 유저가 참가중인 탐험 조회

    // 특정 유저가 참가중인 탐험 삭제(탐험 포기)


//    // 특정 탐험 달성자 추가
//    @PostMapping("/adventure-succeed/{adventureId}")
//    public ResponseEntity<String> creaateAdventureSucceed(@PathVariable Long adventureId,Authentication authentication){
//        adventureService.createAdventureSucceed(adventureId,Long.valueOf(authentication.getName()));
//        return new ResponseEntity<String>("특정 탐험 달성자 추가 성공",HttpStatus.OK);
//    }
//
//    // 특정 탐험 달성자 조회
//    @GetMapping("/adventure-succeed/{adventureId}")
//    public ResponseEntity<List<ReadAdventureSucceedRes>> readAdventureSucceed(@PathVariable Long adventureId,Authentication authentication){
//        adventureService.readAdventureSucceed(adventureId,Long.valueOf(authentication.getName()));
//        return new ResponseEntity<List<ReadAdventureSucceedRes>>(,HttpStatus.OK);
//    }
}
