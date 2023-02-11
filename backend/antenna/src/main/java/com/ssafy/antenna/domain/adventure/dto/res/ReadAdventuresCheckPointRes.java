package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.AdventurePlace;

import java.util.List;

public record ReadAdventuresCheckPointRes(
        Long adventureId,
        String adventureTitle,
        List<CheckPointAdventurePlaceRes> adventurePlaceList

) {
}
