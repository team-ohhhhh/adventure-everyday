package com.ssafy.antenna.domain.adventure.dto.click;

import java.util.List;

public record ReadAdventureInProgressClickRes(
        Long adventureId,
        String adventureTitle,
        String adventureDifficulty,
        Long clearRate,
        Long userId,
        String userPhotoUrl,
        String userNickname,
        Long userLevel,
        List<String> userPhotoUrlList,
        Long userCount

) {
}
