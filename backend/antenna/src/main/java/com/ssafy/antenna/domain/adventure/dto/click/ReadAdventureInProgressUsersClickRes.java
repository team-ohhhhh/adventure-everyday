package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

public record ReadAdventureInProgressUsersClickRes(
        Integer clearRate,
        UserDetailRes userDetailRes

) {
}
