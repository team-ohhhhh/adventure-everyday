package com.ssafy.antenna.domain.adventure.dto.req;

import com.ssafy.antenna.domain.adventure.dto.sub.SubCoordinate;

public record CreateAdventurePlaceReq(
        String adventurePlaceTitle,
        String adventurePlaceContent,
        SubCoordinate coordinate,
        Long postId
) {
}
