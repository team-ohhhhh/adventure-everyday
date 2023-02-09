package com.ssafy.antenna.domain.adventure.dto.req;

public record UpdateAdventureReviewReq(
        String content,
        Integer grade
) {
}
