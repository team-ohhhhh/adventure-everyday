package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.dto.click.ReadAdventureTreasuresMoreClickRes;

import java.util.List;

public record ReadTreasuresRes(

        List<ReadAdventureTreasuresMoreClickRes> readAdventureTreasuresMoreClickResList
) {
}
