package com.ssafy.antenna.domain.adventure.dto.sub;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;

public record SubPost(
        Long postId,
        String photoUrl,
        String title,
        UserDetailRes userDetailRes,
        LocalDateTime createTime

) {
}
