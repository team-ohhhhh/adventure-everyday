package com.ssafy.antenna.domain.user.dto;

import org.springframework.web.multipart.MultipartFile;

public record PostUserReq(
        String email,
        String nickname,
        String password,
        String introduce
) {
}

