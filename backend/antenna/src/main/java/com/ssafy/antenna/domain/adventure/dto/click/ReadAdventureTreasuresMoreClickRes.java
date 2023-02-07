package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.adventure.dto.sub.SubTreasure;

import java.util.List;

public record ReadAdventureTreasuresMoreClickRes(
        Long adventureTreasureCount,
        Boolean possible,
        List<SubTreasure> treasures

) {
}
