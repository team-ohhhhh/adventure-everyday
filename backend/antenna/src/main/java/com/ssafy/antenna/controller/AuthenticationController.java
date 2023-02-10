package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.exception.ErrorCode;
import com.ssafy.antenna.exception.not_found.EmailEmptyException;
import com.ssafy.antenna.exception.not_found.NicknameEmptyException;
import com.ssafy.antenna.exception.not_found.PasswordEmptyException;
import com.ssafy.antenna.service.AuthenticationService;
import com.ssafy.antenna.service.JwtService;
import com.ssafy.antenna.service.KakaoService;
import com.ssafy.antenna.util.ValidationRegex;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("${API}/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
@Validated
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final KakaoService kakaoService;
    private final JwtService jwtService;
    private final ValidationRegex validationRegex;

    @PostMapping(value = "/register")
    public ResultResponse<?> registerUser(
            @RequestParam String email,
            @RequestParam String nickname,
            @RequestParam String password,
            @RequestParam(required = false) String introduce,
            @RequestParam(required = false) MultipartFile photo
    ) throws IOException {
        //validation
        System.out.println(email);
        if (!validationRegex.isRegexEmail(email)){
            return ResultResponse.error(ErrorResponse.of(ErrorCode.EMAIL_INVALID));
        }
        if (nickname.length() < 3){
            return ResultResponse.error(ErrorResponse.of(ErrorCode.NICKNAME_INVALID));
        }
        if (!(password.length() >= 6 && password.length()<=12)){
            return ResultResponse.error(ErrorResponse.of(ErrorCode.WRONG_PASSWORD_SIZE));
        }
        if(introduce != null && introduce.length() > 30) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.WRONG_INTRODUCE_SIZE));
        }
        return ResultResponse.success(
                authenticationService.registerUser(
                        new PostUserReq(email, nickname, password, introduce), photo
                ));
    }

    @PostMapping("/authenticate")
    public ResultResponse<LogInUserRes> authenticate(@RequestBody @Valid LogInUserReq logInUserReq) {
//        if(logInUserReq.email().length()==0)
//            throw new EmailEmptyException();
//        if(!ValidationRegex.isRegexEmail(logInUserReq.email()))
//
//        if(logInUserReq.password().length()==0)
//            throw new PasswordEmptyException();
        return ResultResponse.success(authenticationService.authenticate(logInUserReq));
    }

    @GetMapping("/kakao/callback")
    public ResultResponse<?> kakaoCallback(@RequestParam String code, @RequestParam String action) throws IOException {
        System.out.println("callback 시작");
        System.out.println(code);

        if(action.equals("login")){
            String access_token = kakaoService.getToken(code);
            System.out.println(access_token);
            System.out.println("callback 끝, 로그인 분기 실행.");
            return ResultResponse.success(kakaoService.getUserInfoForLogin(access_token));
        }else if(action.equals("signup")){
            String access_token = kakaoService.getTokenSignUp(code);
            System.out.println(access_token);
            System.out.println(access_token);
            System.out.println("callback 끝, 회원가입 분기 실행.");
            return ResultResponse.success(kakaoService.getUserInfoForSign(access_token));
        }
        return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));
    }

    @GetMapping("/kakao/oauth")
    public String kakaoConnect() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create(kakaoService.kakaoConnect()));


        return kakaoService.kakaoConnect();
    }

    @GetMapping("/kakao/oauth/signup")
    public String kakaoSignUpConnect() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create(kakaoService.kakaoConnect()));


        return kakaoService.kakaoSignUpConnect();
    }

    @PostMapping("/check-token")
    public ResultResponse<CheckTokenRes> checkToken(@RequestBody CheckTokenReq checkTokenReq) {
        //validation 필요!!!!!!!!!!!!!!
        return ResultResponse.success(authenticationService.checkToken(checkTokenReq.userId(), checkTokenReq.refreshToken()));
    }

}
