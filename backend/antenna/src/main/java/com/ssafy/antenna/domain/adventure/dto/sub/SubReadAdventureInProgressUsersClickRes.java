package com.ssafy.antenna.domain.adventure.dto.sub;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

public record SubReadAdventureInProgressUsersClickRes(
        Integer clearRate,
        UserDetailRes userDetailRes
) {
}
