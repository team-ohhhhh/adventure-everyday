package com.ssafy.antenna.domain.post.dto;

public record PostPostReq(
        String title,
        String content,
        double lng,
        double lat,
        boolean isPublic
) {
}
