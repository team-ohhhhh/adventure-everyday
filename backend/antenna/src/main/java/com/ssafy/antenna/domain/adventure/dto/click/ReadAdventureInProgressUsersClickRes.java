package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.adventure.dto.sub.SubReadAdventureInProgressUsersClickRes;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.util.List;

public record ReadAdventureInProgressUsersClickRes(
        String adventureFeat,
        List<SubReadAdventureInProgressUsersClickRes> subReadAdventureInProgressUsersClickResList

) {
}
