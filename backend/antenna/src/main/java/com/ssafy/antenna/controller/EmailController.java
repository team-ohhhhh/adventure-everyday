package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.email.dto.AuthEmailReq;
import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
@CrossOrigin("*")
public class EmailController {
    private final EmailService emailService;

    @GetMapping("/send")
    public ResponseEntity<AuthEmailRes> sendMail(@RequestParam String email) {
        return new ResponseEntity<>(new AuthEmailRes(emailService.sendMail(email)), HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthEmailRes> checkEmailAuth(@RequestBody AuthEmailReq authEmailReq) throws Exception {
        return new ResponseEntity<>(new AuthEmailRes(emailService.checkEmailAuth(authEmailReq)), HttpStatus.OK);
    }
}
