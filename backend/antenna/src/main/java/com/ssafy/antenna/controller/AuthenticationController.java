package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<LogInUserRes> register(@RequestBody PostUserReq postUserReq) {
        return new ResponseEntity<>(authenticationService.register(postUserReq), HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LogInUserRes> authenticate(@RequestBody LogInUserReq logInUserReq) {
        return new ResponseEntity<>(authenticationService.authenticate(logInUserReq), HttpStatus.OK);
    }
}
