package com.ssafy.antenna.domain.post.dto;

import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public record PostDto(
        Long postId,
        Long userId,
        String title,
        String content,
//        Point coordinate,
        String nearestPlace,
        String w3w,
        LocalDateTime createdTime,
        LocalDateTime updatedTime

//        post.getPostId(),
//        post.getUser().getUserId(),
//        post.getTitle(),
//        post.getContent(),
//        post.getCoordinate(),
//        post.getNearestPlace(),
//        post.getW3w(),
//        post.getCreateTime(),
//        post.getUpdateTime()
) {
}
