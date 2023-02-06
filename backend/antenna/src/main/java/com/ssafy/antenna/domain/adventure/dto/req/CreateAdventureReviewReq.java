package com.ssafy.antenna.domain.adventure.dto.req;

public record CreateAdventureReviewReq(
        String content,
        Integer rate
) {
}
