package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.email.dto.AuthEmailReq;
import com.ssafy.antenna.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    @GetMapping
    public ResponseEntity<Boolean> SendMail(@RequestParam String email) {
        return new ResponseEntity<>(emailService.sendMail(email), HttpStatus.OK);
    }

    @PostMapping("/auth")
    public ResponseEntity<Boolean> CheckEmailAuth(@RequestBody AuthEmailReq authEmailReq) throws Exception {
        return new ResponseEntity<>(emailService.checkEmailAuth(authEmailReq), HttpStatus.OK);
    }
}
