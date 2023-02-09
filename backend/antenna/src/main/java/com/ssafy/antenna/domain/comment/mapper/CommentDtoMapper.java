package com.ssafy.antenna.domain.comment.mapper;

import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.comment.dto.CommentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CommentDtoMapper implements Function<Comment, CommentDto> {
    private final SubCommentDtoMapper subCommentDtoMapper;

    @Override
    public CommentDto apply(Comment comment) {
        return new CommentDto(
                comment.getCommentId(),
                comment.getContent(),
//                comment.getCommentLikes() != null ? comment.getCommentLikes().size() : 0,
                comment.getCommentLikes() != null ? comment.getCommentLikes().stream()
                        .map(e -> e.getUser().getUserId())
                        .collect(Collectors.toList()) : List.of(),
                comment.getCreateTime(),
                comment.getUser().toResponse(),
                comment.getSubComments() != null ?
                        comment.getSubComments().stream()
                                .map(subCommentDtoMapper)
                                .collect(Collectors.toList()) : List.of()
        );
    }
}
