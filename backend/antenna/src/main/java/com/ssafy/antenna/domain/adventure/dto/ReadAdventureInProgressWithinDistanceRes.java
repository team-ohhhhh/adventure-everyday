package com.ssafy.antenna.domain.adventure.dto;

public record ReadAdventureInProgressWithinDistanceRes(
        Long adventureId,
        String adventureTitle,
        Long adventurePlaceId,
        String adventurePlaceTitle
) {
}
