package com.ssafy.antenna.domain.adventure.dto;

import java.util.List;

public record CreateAdventurePlaceReq(
        String title,
        String content,
        Double[] coordinate,
        Long postId
) {
}
