package com.ssafy.antenna.domain.email.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

public record CheckEmailRes(Boolean result, UserDetailRes userDetailRes) {
}
