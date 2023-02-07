package com.ssafy.antenna.domain.comment.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;
import java.util.List;

public record CommentDto(
        Long commentId,
        String commentContent,
//        Integer commentLikes,
        List<Long> userIdxList,
        LocalDateTime createdTime,
        UserDetailRes userDetailRes,
        List<SubCommentDto> subCommentDtoList
) {
}