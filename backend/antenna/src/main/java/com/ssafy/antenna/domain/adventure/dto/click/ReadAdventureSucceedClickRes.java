package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.adventure.dto.sub.SubReadAdventureSucceedClickRes;
import com.ssafy.antenna.domain.adventure.dto.sub.SubTreasure;

import java.util.List;

public record ReadAdventureSucceedClickRes(
        List<SubTreasure> Treasures,
        List<SubReadAdventureSucceedClickRes> adventureSucceeds

) {
}
