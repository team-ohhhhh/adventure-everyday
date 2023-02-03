package com.ssafy.antenna.domain.post.mapper;

import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.post.dto.PostDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PostDtoMapper implements Function<Post, PostDto> {
    @Override
    public PostDto apply(Post post) {
        return new PostDto(
                post.getPostId(),
                post.getTitle(),
                post.getContent(),
                post.getW3w(),
                post.getPhotoUrl(),
                post.getPostLikes().size(),
                post.getComments().size(),
                post.getCreateTime(),
                post.getUser().toResponse()
        );

    }
}
