package com.ssafy.antenna.domain.adventure.dto.res;

import java.time.LocalDateTime;

public record ReadAdventureReviewRes(
        Long adventureReviewId,
        Long userId,
        String nickname,
        Integer rate,
        String comment,
        LocalDateTime createTIme

) {
}
