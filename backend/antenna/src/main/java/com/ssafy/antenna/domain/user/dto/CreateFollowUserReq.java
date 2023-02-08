package com.ssafy.antenna.domain.user.dto;

import jakarta.validation.constraints.Positive;

public record CreateFollowUserReq(
		@Positive(message = "BAD_CONSTANT")
		Long followingId
) {
}
