package com.ssafy.antenna.domain.adventure.dto.sub;

import java.util.List;

public record SubReadAdventureSucceedClickRes(
        Long adventureId,
        String adventurePhotoUrl,
        String adventureTitle,
        Long adventureDifficulty,
        Long userId,
        String userPhotoUrl,
        String userNickname,
        Long userLevel,
        List<String> userPhotoUrlList,
        Long userCount
) {
}
