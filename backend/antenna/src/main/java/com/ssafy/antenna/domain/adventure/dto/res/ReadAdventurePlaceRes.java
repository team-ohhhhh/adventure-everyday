package com.ssafy.antenna.domain.adventure.dto.res;

public record ReadAdventurePlaceRes(
        Long adventurePlaceId,
        String title,
        String content,
        Double[] coordinate,
        Long postId
) {
}
