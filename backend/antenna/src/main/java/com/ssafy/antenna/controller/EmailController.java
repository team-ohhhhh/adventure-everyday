package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.email.dto.AuthEmailReq;
import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
@CrossOrigin("*")
public class EmailController {
    private final EmailService emailService;

    @GetMapping("/send")
    public ResultResponse<AuthEmailRes> sendMail(@RequestParam String email) {
        return ResultResponse.success(new AuthEmailRes(emailService.sendMail(email)));
    }

    @PostMapping("/auth")
    public ResultResponse<AuthEmailRes> checkEmailAuth(@RequestBody AuthEmailReq authEmailReq) throws Exception {
        return ResultResponse.success(new AuthEmailRes(emailService.checkEmailAuth(authEmailReq)));
    }
}
