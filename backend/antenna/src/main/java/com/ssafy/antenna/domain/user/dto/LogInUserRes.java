package com.ssafy.antenna.domain.user.dto;

public record LogInUserRes(
        String token,
        String refreshToken,
        UserDetailRes userDetailRes

) {
}
