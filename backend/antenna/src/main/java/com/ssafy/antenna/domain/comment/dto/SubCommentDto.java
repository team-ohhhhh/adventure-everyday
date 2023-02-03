package com.ssafy.antenna.domain.comment.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;

public record SubCommentDto(
        Long subCommentId,
        String subCommentContent,
        Integer subCommentLikes,
        LocalDateTime createdTime,
        UserDetailRes userDetailRes
) {
}
