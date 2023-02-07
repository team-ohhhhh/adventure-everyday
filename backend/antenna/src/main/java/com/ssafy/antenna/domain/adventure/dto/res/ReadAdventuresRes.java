package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.dto.sub.UserIdPhotoUrl;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.util.List;

public record ReadAdventuresRes(
        Long adventureId,
        String adventureTitle,
        Long adventureDifficulty,
        String adventurePhotoUrl,
        UserDetailRes userDetailRes,
        List<UserDetailRes> userDetailResList,
        Long userCount

) {
}
