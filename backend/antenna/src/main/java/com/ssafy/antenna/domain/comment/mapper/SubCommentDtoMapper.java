package com.ssafy.antenna.domain.comment.mapper;

import com.ssafy.antenna.domain.comment.SubComment;
import com.ssafy.antenna.domain.comment.dto.SubCommentDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SubCommentDtoMapper implements Function<SubComment, SubCommentDto> {
    @Override
    public SubCommentDto apply(SubComment subComment) {
        return new SubCommentDto(
                subComment.getSubCommentId(),
                subComment.getContent(),
                subComment.getSubCommentLikes()!= null ? subComment.getSubCommentLikes().size() : 0,
                subComment.getCreateTime(),
                subComment.getUser().toResponse()
        );
    }
}
