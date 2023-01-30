package com.ssafy.antenna.domain.adventure.dto;

public record ReadAdventureInProgressRes(
        Long adventureId,
        int totalPoint,
        int currentPoint

) {
}
