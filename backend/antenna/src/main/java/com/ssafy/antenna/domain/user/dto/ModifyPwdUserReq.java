package com.ssafy.antenna.domain.user.dto;

import jakarta.validation.constraints.Size;

public record ModifyPwdUserReq(
        @Size(min = 6, max = 12, message = "WRONG_PASSWORD_SIZE")
        String oldPassword,
        @Size(min = 6, max = 12, message = "WRONG_PASSWORD_SIZE")
        String newPassword
) {
}
