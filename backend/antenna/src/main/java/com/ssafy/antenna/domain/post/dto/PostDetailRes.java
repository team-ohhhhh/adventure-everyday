package com.ssafy.antenna.domain.post.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;

public record PostDetailRes(Long postId, String title, String content, double lng, double lat, String nearestPlace,
                            String w3w, boolean isPublic,
                            LocalDateTime createTime, UserDetailRes userDetailRes) {
}
