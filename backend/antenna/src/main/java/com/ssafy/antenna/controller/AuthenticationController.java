package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.exception.not_found.EmailEmptyException;
import com.ssafy.antenna.exception.not_found.NicknameEmptyException;
import com.ssafy.antenna.exception.not_found.PasswordEmptyException;
import com.ssafy.antenna.service.AuthenticationService;
import com.ssafy.antenna.service.KakaoService;
import com.ssafy.antenna.util.ValidationRegex;
import lombok.RequiredArgsConstructor;
import org.apache.el.parser.Token;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("${API}/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final KakaoService kakaoService;
    @PostMapping(value = "/register")
    public ResultResponse<LogInUserRes> registerUser(
            @RequestParam String email,
            @RequestParam String nickname,
            @RequestParam String password,
            @RequestParam(required = false) String introduce,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {
        //validation
        if(email.length()==0)
            throw new EmailEmptyException();
        if(nickname.length()==0)
            throw new NicknameEmptyException();
        if(password.length()==0)
            throw new PasswordEmptyException();
        return ResultResponse.success(
                authenticationService.registerUser(
                        new PostUserReq(email, nickname, password, introduce), photo
                ));
    }

    @PostMapping("/authenticate")
    public ResultResponse<LogInUserRes> authenticate(@RequestBody LogInUserReq logInUserReq) {
        if(logInUserReq.email().length()==0)
            throw new EmailEmptyException();
        if(!ValidationRegex.isRegexEmail(logInUserReq.email()))

        if(logInUserReq.password().length()==0)
            throw new PasswordEmptyException();
        return ResultResponse.success(authenticationService.authenticate(logInUserReq));
    }

    @GetMapping("/kakao/callback")
    public ResultResponse<LogInUserRes>  kakaoCallback(@RequestParam String code) throws IOException {
        System.out.println("callback 시작");
        System.out.println(code);
        String access_token = kakaoService.getToken(code);
        System.out.println(access_token);
        System.out.println("callback 끝");
        return ResultResponse.success(kakaoService.getUserInfo(access_token));

    }

    @GetMapping("/kakao/oauth")
    public ResponseEntity<?> kakaoConnect() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(kakaoService.kakaoConnect()));

        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

}
