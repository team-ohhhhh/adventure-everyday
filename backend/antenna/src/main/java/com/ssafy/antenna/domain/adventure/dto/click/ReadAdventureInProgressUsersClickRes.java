package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.util.List;

public record ReadAdventureInProgressUsersClickRes(
        Integer clearRate,
        UserDetailRes userDetailRes

) {
}
