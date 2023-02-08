package com.ssafy.antenna.domain.adventure.dto.click;

import com.ssafy.antenna.domain.adventure.dto.sub.SubAdventureReview;

import java.util.List;

public record ReadAdventureReviewClickRes(
        String adventureFeat,
        List<SubAdventureReview> subAdventureReviews
) {
}
