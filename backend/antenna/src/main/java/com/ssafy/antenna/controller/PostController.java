package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.comment.PostCommentReq;
import com.ssafy.antenna.domain.comment.dto.PostSubCommentReq;
import com.ssafy.antenna.domain.post.dto.PostDetailRes;
import com.ssafy.antenna.domain.post.dto.PostDetailWithCategory;
import com.ssafy.antenna.domain.post.dto.PostUpdateReq;
import com.ssafy.antenna.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/posts")
@CrossOrigin("*")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResultResponse<PostDetailRes> createPost(
            @RequestPart String title,
            @RequestPart String content,
            @RequestPart String lat,
            @RequestPart String lng,
            @RequestPart String isPublic,
            @RequestPart(required = false) MultipartFile photo,
            @RequestPart(required = false) String isCheckpoint,
            @RequestPart(required = false) String adventureId,
            @RequestPart(required = false) String adventurePlaceId,
            Authentication authentication
    ) throws IOException {
        return ResultResponse.success(
                postService.createPost(
                        Long.valueOf(authentication.getName()),
                        title,
                        content,
                        lat,
                        lng,
                        isPublic,
                        photo,
                        isCheckpoint,
                        adventureId,
                        adventurePlaceId
                )
        );
    }

    @GetMapping("/{postId}")
    public ResultResponse<PostDetailWithCategory> getPostById(@PathVariable Long postId, Authentication authentication) {
        return ResultResponse.success(postService.getPostById(postId, Long.valueOf(authentication.getName())));
    }

    @GetMapping("/all")
    public ResultResponse<List<PostDetailWithCategory>> getAllPostById(Authentication authentication) {
        return ResultResponse.success(postService.getAllPostById(Long.valueOf(authentication.getName())));
    }

    @DeleteMapping("/{postId}")
    public ResultResponse<PostDetailRes> deletePost(
            @PathVariable Long postId,
            Authentication authentication
    ) throws IllegalAccessException {
        return ResultResponse.success(
                postService.deletePost(
                        Long.valueOf(authentication.getName()),
                        postId
                )
        );
    }

    @PutMapping("/{postId}")
    public ResultResponse<PostDetailRes> updatePost(
            @PathVariable Long postId,
            @RequestBody @Valid PostUpdateReq postUpdateReq,
            Authentication authentication
    ) throws IllegalAccessException {
        return postService.updatePost(postId, postUpdateReq, authentication);
    }

    @PostMapping("{postId}/comments")
    public ResultResponse<?> postComment(
            @PathVariable Long postId,
            @RequestBody @Valid PostCommentReq postCommentReq,
            Authentication authentication
    ) {
        return postService.postComment(
                postId,
                postCommentReq,
                Long.valueOf(authentication.getName())
        );
    }

    @GetMapping
    public ResultResponse<List<PostDetailRes>> getPostWithArea(@RequestParam double lng, @RequestParam double lat, @RequestParam double area) {
        return ResultResponse.success(postService.getPostWithArea(lng, lat, area));
    }

    @GetMapping("/users/{userId}")
    public ResultResponse<?> getPostByUserId(@PathVariable Long userId) {
        return postService.getPostByUserId(userId);
    }

    @GetMapping("/{postId}/comments")
    public ResultResponse<?> getCommentsByPostId(@PathVariable Long postId) {
        return postService.getCommentsByPostId(postId);
    }

    @PutMapping("/comments/{commentId}")
    public ResultResponse<?> updateComment(
            @PathVariable Long commentId,
            @RequestBody @Valid PostCommentReq postCommentReq,
            Authentication authentication
    ) throws IllegalAccessException {
        return postService.updateComment(commentId, postCommentReq, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResultResponse<?> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication
    ) throws IllegalAccessException {
        return postService.deleteComment(commentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/{postId}/post-like")
    public ResultResponse<?> postPostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        return postService.postPostLike(postId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/{postId}/post-like")
    public ResultResponse<?> getPostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        return postService.getPostLike(postId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/{postId}/post-like")
    public ResultResponse<?> deletePostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        return postService.deletePostLike(postId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/{commentId}/comment-like")
    public ResultResponse<?> postCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        return postService.postCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/{commentId}/comment-like")
    public ResultResponse<?> getCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        return postService.getCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/{commentId}/comment-like")
    public ResultResponse<?> deleteCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        return postService.deleteCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/comments/{commentId}")
    public ResultResponse<?> postSubComment(
            @PathVariable Long commentId,
            @RequestBody PostSubCommentReq postSubCommentReq,
            Authentication authentication
    ) {
        return postService.postSubComment(commentId, postSubCommentReq, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/comments/{commentId}")
    public ResultResponse<?> getSubComments(@PathVariable Long commentId) {
        return postService.getSubComments(commentId);
    }

    @PutMapping("/comments/subcomments/{subCommentId}")
    public ResultResponse<?> updateSubComment(
            @PathVariable Long subCommentId,
            @RequestBody PostSubCommentReq postSubCommentReq,
            Authentication authentication
    ) throws IllegalAccessException {
        return postService.updateSubComment(subCommentId, postSubCommentReq, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/subcomments/{subCommentId}")
    public ResultResponse<?> deleteSubComment(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) throws IllegalAccessException {
        return postService.deleteSubComment(subCommentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> postSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        return postService.postSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> getSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        return postService.getSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> deleteSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        return postService.deleteSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

}
