package com.ssafy.antenna.domain.adventure.dto;

public record CreateAdventureReviewReq(
        String content,
        Integer rate
) {
}
