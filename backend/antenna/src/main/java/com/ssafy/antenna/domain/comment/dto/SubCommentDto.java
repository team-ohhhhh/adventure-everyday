package com.ssafy.antenna.domain.comment.dto;

import java.time.LocalDateTime;

public record SubCommentDto(
        Long subCommentId,
        Long commentId,
        Long userId,
        String content,
        LocalDateTime createdTime,
        LocalDateTime updatedTime
) {
}
