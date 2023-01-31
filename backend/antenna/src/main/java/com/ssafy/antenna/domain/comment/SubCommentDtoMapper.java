package com.ssafy.antenna.domain.comment;

import com.ssafy.antenna.domain.comment.dto.SubCommentDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class SubCommentDtoMapper implements Function<SubComment, SubCommentDto> {
    @Override
    public SubCommentDto apply(SubComment subComment) {
        return new SubCommentDto(
                subComment.getSubCommentId(),
                subComment.getComment().getCommentId(),
                subComment.getUser().getUserId(),
                subComment.getContent(),
                subComment.getCreateTime(),
                subComment.getUpdateTime()
        );
    }
}
