package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

public record ReadAdventureInProgressUsersClickRes(
        String adventureFeat,
        Integer clearRate,
        UserDetailRes userDetailRes

) {
}
