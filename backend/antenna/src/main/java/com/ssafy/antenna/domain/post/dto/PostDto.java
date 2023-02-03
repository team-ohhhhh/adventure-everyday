package com.ssafy.antenna.domain.post.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;

public record PostDto(
        Long postId,
        String title,
        String content,
        String w3w,
        String postUrl,
        Integer postLikes,
        Integer postComments,
        LocalDateTime createdTime,
        UserDetailRes userDetailRes
) {
}
