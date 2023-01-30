package com.ssafy.antenna.domain.adventure.dto;

import org.locationtech.jts.geom.Point;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

public record CreateAdventureReq(
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
