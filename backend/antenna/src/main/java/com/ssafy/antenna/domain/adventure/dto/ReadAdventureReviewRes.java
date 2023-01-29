package com.ssafy.antenna.domain.adventure.dto;

public record ReadAdventureReviewRes(
        Long userId,
        String nickname,
        Integer rate,
        String comment

) {
}
