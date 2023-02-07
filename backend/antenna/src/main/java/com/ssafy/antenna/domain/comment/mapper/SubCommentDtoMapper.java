package com.ssafy.antenna.domain.comment.mapper;

import com.ssafy.antenna.domain.comment.SubComment;
import com.ssafy.antenna.domain.comment.dto.SubCommentDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class SubCommentDtoMapper implements Function<SubComment, SubCommentDto> {
	@Override
	public SubCommentDto apply(SubComment subComment) {
		return new SubCommentDto(
				subComment.getSubCommentId(),
				subComment.getContent(),
//                subComment.getSubCommentLikes()!= null ? subComment.getSubCommentLikes().size() : 0,
				subComment.getSubCommentLikes() != null ? subComment.getSubCommentLikes().stream()
						.map(e -> e.getUser().getUserId())
						.collect(Collectors.toList()) : List.of(),
				subComment.getCreateTime(),
				subComment.getUser().toResponse()
		);
	}
}
