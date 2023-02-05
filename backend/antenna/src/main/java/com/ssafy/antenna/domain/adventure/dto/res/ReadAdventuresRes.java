package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.dto.sub.UserIdPhotoUrl;

import java.util.List;

public record ReadAdventuresRes(
        Long adventureId,
        String adventureTitle,
        String adventureDifficulty,
        String adventurePhotoUrl,
        UserIdPhotoUrl userIdPhotoUrl,
        String userNickname,
        List<UserIdPhotoUrl> userIdPhotoUrlList,
        Long userCount

) {
}
