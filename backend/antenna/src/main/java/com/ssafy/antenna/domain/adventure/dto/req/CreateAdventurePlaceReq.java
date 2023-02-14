package com.ssafy.antenna.domain.adventure.dto.req;

import com.ssafy.antenna.domain.adventure.dto.sub.SubCoordinate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateAdventurePlaceReq(
        @NotBlank(message = "ADVENTURE_PLACE_TITLE_EMPTY") @Size(min = 1, max = 10, message = "ADVENTURE_PLACE_TITLE_SIZE_ERROR")
        String adventurePlaceTitle,
        @NotBlank(message = "ADVENTURE_PLACE_CONTENT_EMPTY") @Size(max = 254, message = "ADVENTURE_PLACE_CONTENT_SIZE_ERROR")
        String adventurePlaceContent,
        SubCoordinate coordinate,
        Long postId
) {
}
