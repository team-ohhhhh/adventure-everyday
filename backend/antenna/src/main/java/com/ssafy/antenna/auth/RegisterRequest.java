package com.ssafy.antenna.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class RegisterRequest {
//    private String email;
//    private String password;
//}

public record RegisterRequest(
        String email,
        String nickname,
        String password,
        String introduce,
        byte[] photo
) {}

