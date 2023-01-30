package com.ssafy.antenna.domain.post;

import com.ssafy.antenna.domain.post.dto.PostDto;
import org.springframework.cglib.core.internal.Function;
import org.springframework.stereotype.Service;

@Service
public class PostDtoMapper implements Function<Post, PostDto> {

    @Override
    public PostDto apply(Post post) {
        return new PostDto(
                post.getPostId(),
                post.getUser().getUserId(),
                post.getTitle(),
                post.getContent(),
//                post.getCoordinate(),
                post.getNearestPlace(),
                post.getW3w(),
                post.getCreateTime(),
                post.getUpdateTime()
        );
    }
}
