package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.adventure.dto.CreateAdventureReq;
import com.ssafy.antenna.service.AdventureService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/adventures")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class AdventureController {

    private final AdventureService adventureService;

    @PostMapping()
    public ResponseEntity<String> createAdventure(@RequestBody CreateAdventureReq createAdventureReq, Authentication authentication){
       // 탐험 추가
        adventureService.createAdventure(createAdventureReq,authentication);
        return new ResponseEntity<String>("createAdventure-ResponseEntity<>에 뭘 넣어야할까",HttpStatus.OK);
    }

    @DeleteMapping("/{adventureId}")
    public ResponseEntity<String> deleteAdventure(@PathVariable Long adventureId){
        // 탐험 추가
        adventureService.deleteAdventure(adventureId);
        return new ResponseEntity<String>("deleteAdventure-ResponseEntity<>에 뭘 넣어야할까",HttpStatus.OK);
    }
}
