package com.ssafy.antenna.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LogInUserReq(
        @NotBlank(message = "EMAIL_EMPTY") @Email(message = "EMAIL_INVALID")
        String email,
        @NotBlank(message = "PASSWORD_EMPTY")
        String password
) {
}
