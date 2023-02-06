package com.ssafy.antenna.domain.adventure.dto.req;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

public record CreateAdventureReq(
        String category,
        String feat,
        String title,
        String content,
        String difficulty,
        Long exp,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Long RepresentativePostId,
        CreateAdventurePlaceReq[] createAdventurePlaceReqs

) {
}
