package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.post.dto.PostPostReq;
import com.ssafy.antenna.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResultResponse<String> createPost(@RequestBody PostPostReq postPostReq, Authentication authentication) {
        return ResultResponse.success(postService.createPost(Long.valueOf(authentication.getName()), postPostReq));
    }
}
