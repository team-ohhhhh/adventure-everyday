package com.ssafy.antenna.domain.adventure.dto.sub;

import java.time.LocalDateTime;

public record SubPost(
        Long postId,
        String photoUrl,
        String title,
        String nickname,
        String tierPhotoUrl,
        LocalDateTime createTime

) {
}
