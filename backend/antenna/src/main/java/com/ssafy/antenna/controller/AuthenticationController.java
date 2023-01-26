package com.ssafy.antenna.controller;

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

    @PostMapping(value="/register", consumes = {"application/json","multipart/form-data"})
    public ResponseEntity<LogInUserRes> register(@RequestPart(value = "req") PostUserReq postUserReq, @RequestPart(value = "photo", required = false) MultipartFile photo) throws IOException {
        return new ResponseEntity<>(authenticationService.register(postUserReq, photo), HttpStatus.OK);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LogInUserRes> authenticate(@RequestBody LogInUserReq logInUserReq) {
        return new ResponseEntity<>(authenticationService.authenticate(logInUserReq), HttpStatus.OK);
    }
}
