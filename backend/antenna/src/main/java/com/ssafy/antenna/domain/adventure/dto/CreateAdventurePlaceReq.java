package com.ssafy.antenna.domain.adventure.dto;

public record CreateAdventurePlaceReq(
        String title,
        String content,
        Double[] coordinate,
        Long postId
) {
}
