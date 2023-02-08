package com.ssafy.antenna.domain.adventure.dto.sub;

import java.time.LocalDateTime;

public record SubAdventureReview(
        Long adventureReviewId,
        String nickname,
        Long level,
        Long grade,
        String content,
        LocalDateTime createTime
) {
}
