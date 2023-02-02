package com.ssafy.antenna.domain.adventure.dto;

import java.time.LocalDateTime;

public record CreateAdventureReq(
        String category,
        String featTitle,
        String featContent,
        String title,
        String content,
        int difficulty,
        byte[] photo,
        LocalDateTime startDate,
        LocalDateTime endDate

) {
}
