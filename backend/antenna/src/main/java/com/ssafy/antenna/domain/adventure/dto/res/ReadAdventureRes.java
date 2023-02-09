package com.ssafy.antenna.domain.adventure.dto.res;

import com.ssafy.antenna.domain.adventure.dto.sub.SubAdventurePlace;
import com.ssafy.antenna.domain.adventure.dto.sub.UserIdPhotoUrl;

import java.time.LocalDateTime;
import java.util.List;

public record ReadAdventureRes(
        Long adventureId,
        String adventureTitle,
        String adventureContent,
        LocalDateTime adventureStartDate,
        LocalDateTime adventureEndDate,
        Long adventureDifficulty,
        String adventureCategory,
        Double adventureAvgReviewRate,
        UserIdPhotoUrl userIdPhotoUrl,
        String userNickname,
        int userLevel,
        List<UserIdPhotoUrl> userIdPhotoUrlList,
        Long userCount,
        Boolean participation,
        Boolean clear,
        List<SubAdventurePlace> subAdventurePlaces

) {
}
