package com.ssafy.antenna.domain.adventure.dto.req;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record CreateAdventureReq(
		@NotBlank(message = "CATEGORY_EMPTY")
        String category,
		@NotBlank(message = "FEAT_SIZE") @Size(max = 10, message = "FEAT_SIZE")
		String feat,
		@NotBlank(message = "TITLE_SIZE_ERROR") @Size(max = 10, message = "TITLE_SIZE_ERROR")
		String title,
		@NotBlank(message = "CONTENT_SIZE_ERROR") @Size(max = 254, message = "CONTENT_SIZE_ERROR")
		String content,
		@Positive(message = "DIFFICULTY_MAX") @Max(value = 5, message = "DIFFICULTY_MAX")
        Long difficulty,
		@Positive(message = "EXP_POSITIVE")
        Long exp,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Long RepresentativePostId,
        CreateAdventurePlaceReq[] createAdventurePlaceReqs

) {
}
