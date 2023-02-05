package com.ssafy.antenna.domain.adventure.dto.req;

public record CreateAdventurePlaceReq(
        String title,
        String content,
        Double[] coordinate,
        Long postId
) {
}
