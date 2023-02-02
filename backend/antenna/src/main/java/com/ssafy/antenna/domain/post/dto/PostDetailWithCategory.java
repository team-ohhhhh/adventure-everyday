package com.ssafy.antenna.domain.post.dto;

import com.ssafy.antenna.domain.user.dto.UserDetailRes;

import java.time.LocalDateTime;

public record PostDetailWithCategory(Long postId, String title, String content, double lng, double lat, String nearestPlace,
                                     String w3w, boolean isPublic,
                                     LocalDateTime createTime, String photoUrl, Long isAntenna, Long isChallenge, Long isFollowing, UserDetailRes userDetailRes) {
}
