package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(value="/register")
    public ResultResponse<LogInUserRes> register(@RequestBody PostUserReq postUserReq) {
        return ResultResponse.success(authenticationService.register(postUserReq));
    }

    @PostMapping("/authenticate")
    public ResultResponse<LogInUserRes> authenticate(@RequestBody LogInUserReq logInUserReq) {
        return ResultResponse.success(authenticationService.authenticate(logInUserReq));
    }
}
