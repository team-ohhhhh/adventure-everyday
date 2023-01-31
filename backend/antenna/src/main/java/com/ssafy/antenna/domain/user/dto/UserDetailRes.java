package com.ssafy.antenna.domain.user.dto;

public record UserDetailRes(
        Long userId,
        String email,
        String nickname,
        int level,
        int exp,
        String introduce,
        String photoUrl
) {}
