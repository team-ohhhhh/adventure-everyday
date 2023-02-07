package com.ssafy.antenna.domain.comment.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;
import java.util.List;

public record SubCommentDto(
        Long subCommentId,
        String subCommentContent,
//        Integer subCommentLikes,
        List<Long> userIdxList,
        LocalDateTime createdTime,
        UserDetailRes userDetailRes
) {
}
