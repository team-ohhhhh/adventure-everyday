package com.ssafy.antenna.domain.comment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostSubCommentReq(
		@NotBlank(message = "CONTENT_EMPTY") @Size(max = 254, message = "CONTENT_SIZE_ERROR")
        String content
) {
}
