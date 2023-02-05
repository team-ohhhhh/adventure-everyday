package com.ssafy.antenna.domain.adventure.dto.res;

public record ReadAdventureInProgressWithinDistanceRes(
        Long adventureId,
        String adventureTitle,
        Long adventurePlaceId,
        String adventurePlaceTitle
) {
}
