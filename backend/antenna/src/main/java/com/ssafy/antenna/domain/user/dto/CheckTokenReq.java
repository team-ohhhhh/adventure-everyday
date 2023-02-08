package com.ssafy.antenna.domain.user.dto;

public record CheckTokenReq(Long userId,String refreshToken) {
}
