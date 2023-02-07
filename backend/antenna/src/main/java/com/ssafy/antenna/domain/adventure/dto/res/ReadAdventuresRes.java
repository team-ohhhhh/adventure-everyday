package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.dto.sub.UserIdPhotoUrl;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.util.List;

public record ReadAdventuresRes(
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
