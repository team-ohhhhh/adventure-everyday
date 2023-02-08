package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.email.dto.AuthEmailReq;
import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.exception.ErrorCode;
import com.ssafy.antenna.service.EmailService;
import com.ssafy.antenna.util.ValidationRegex;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/email")
@CrossOrigin("*")
public class EmailController {
    private final EmailService emailService;
    private final ValidationRegex validationRegex;

    @GetMapping("/send")
    public ResultResponse<?> sendMail(@RequestParam String email) {
        if(!validationRegex.isRegexEmail(email)) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.EMAIL_INVALID));
        }
        return ResultResponse.success(new AuthEmailRes(emailService.sendMail(email)));
    }

    @PostMapping("/auth")
    public ResultResponse<?> checkEmailAuth(@RequestBody AuthEmailReq authEmailReq) throws Exception {
        if(!validationRegex.isRegexEmail(authEmailReq.email())) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.EMAIL_INVALID));
        }
        return ResultResponse.success(new AuthEmailRes(emailService.checkEmailAuth(authEmailReq)));
    }
}
