package com.ssafy.antenna.domain.user.dto;

public record UserDetailRes(Long userId, String email, String nickname, String password, int level, int exp, String introduce, byte[] photo) {
}
