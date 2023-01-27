package com.ssafy.antenna.domain.adventure.dto;

import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public record CreateAdventureReq(
        // category_id 대신 String으로 받은 후, Category Entity에서 가져옴.
        String category,
        String feat,
        String title,
        String content,
        int difficulty,
        byte[] photo,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
}
