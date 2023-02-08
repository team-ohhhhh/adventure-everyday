package com.ssafy.antenna.domain.user.dto;

import jakarta.validation.constraints.Size;

public record ModifyProfileUserReq(
        @Size(max = 30, message = "WRONG_INTRODUCE_SIZE")
        String introduce
) {
}
