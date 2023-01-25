package com.ssafy.antenna.domain.user.dto;

public record PostUserReq(String email, String nickname, String password, String introduce, byte[] photo) {}
