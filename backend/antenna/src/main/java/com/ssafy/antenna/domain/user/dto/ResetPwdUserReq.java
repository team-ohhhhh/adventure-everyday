package com.ssafy.antenna.domain.user.dto;

import jakarta.validation.constraints.Positive;

public record ResetPwdUserReq(
        @Positive(message = "BAD_CONSTANT")
        Long userId
) {
}
