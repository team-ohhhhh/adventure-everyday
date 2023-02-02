package com.ssafy.antenna.domain.post.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public record PostDto(
        Long postId,

        String title,
        String content,
        double lng,
        double lat,
        String nearestPlace,
        String w3w,
        String postUrl,
        LocalDateTime createdTime,
        UserDetailRes userDetailRes
) {
}
