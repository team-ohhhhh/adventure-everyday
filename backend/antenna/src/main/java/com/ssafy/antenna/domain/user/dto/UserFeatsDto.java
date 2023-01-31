package com.ssafy.antenna.domain.user.dto;

public record UserFeatsDto(
        String title,
        String content,
        boolean isSelected
) {
}
