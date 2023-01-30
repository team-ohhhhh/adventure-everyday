package com.ssafy.antenna.domain.post.dto;

public record PostUpdateReq(
        String title,
        String content,
        String isPublic
) {
}
