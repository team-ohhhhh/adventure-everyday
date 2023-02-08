package com.ssafy.antenna.domain.adventure.dto.req;

import java.time.LocalDateTime;

public record CreateAdventureReq(
        String category,
        String feat,
        String title,
        String content,
        Long difficulty,
        Long exp,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Long RepresentativePostId,
        CreateAdventurePlaceReq[] createAdventurePlaceReqs

) {
}
