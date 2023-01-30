package com.ssafy.antenna.domain.adventure.dto;

import com.ssafy.antenna.domain.user.User;

import java.time.LocalDateTime;

public record ReadAdventureRes(
        Long adventureId,
        String category,
        String feat,
        String title,
        String content,
        Integer difficulty,
        byte[] photo,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Double avgReviewRate

) {
}
