package com.ssafy.antenna.domain.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostUpdateReq(
        @NotBlank(message = "TITLE_EMPTY") @Size(max = 10, message = "TITLE_SIZE_ERROR")
        String title,
        @NotBlank(message = "CONTENT_EMPTY") @Size(max = 254, message = "CONTENT_SIZE_ERROR")
        String content,
        String isPublic
) {
}
