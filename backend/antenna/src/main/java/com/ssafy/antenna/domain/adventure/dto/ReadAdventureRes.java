package com.ssafy.antenna.domain.adventure.dto;

import java.time.LocalDateTime;

public record ReadAdventureRes(
        Long adventureId,
        Long userId,
        String category,
        String featTitle,
        String featContent,
        String title,
        String content,
        Integer difficulty,
//        byte[] photo,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Double avgReviewRate

) {
}
