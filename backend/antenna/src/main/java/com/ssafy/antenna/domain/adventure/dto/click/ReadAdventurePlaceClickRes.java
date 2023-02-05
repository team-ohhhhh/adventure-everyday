package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.adventure.dto.sub.SubPost;

import java.time.LocalDateTime;
import java.util.List;

public record ReadAdventurePlaceClickRes(
        Long adventurePlaceId,
        String adventurePlaceTitle,
        String adventurePlaceContent,
        String adventurePlacePostPhotoUrl,
        String adventurePlacePostTitle,
        String adventurePlacePostW3w,
        LocalDateTime createTime,
        List<SubPost> subPostList

) {
}
