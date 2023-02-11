package com.ssafy.antenna.domain.adventure.dto.res;

public record CheckPointAdventurePlaceRes(
        Long adventurePlaceId,
        String title,
        String content,
        Double lng,
        Double lat
) {
}
