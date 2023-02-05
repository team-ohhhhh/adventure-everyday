package com.ssafy.antenna.domain.adventure.dto.res;

public record ReadAdventureReviewRes(
        Long adventureReviewId,
        Long userId,
        String nickname,
        Integer rate,
        String comment

) {
}
