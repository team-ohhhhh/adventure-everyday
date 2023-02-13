package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.comment.dto.PostCommentReq;
import com.ssafy.antenna.domain.comment.dto.PostSubCommentReq;
import com.ssafy.antenna.domain.post.dto.PostDetailRes;
import com.ssafy.antenna.domain.post.dto.PostDetailWithCategory;
import com.ssafy.antenna.domain.post.dto.PostUpdateReq;
import com.ssafy.antenna.exception.ErrorCode;
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
            @RequestPart(required = false) String isCheckPoint,
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
                        isCheckPoint,
                        adventureId,
                        adventurePlaceId
                )
        );
    }

    @GetMapping("/{postId}")
    public ResultResponse<?> getPostById(@PathVariable Long postId, Authentication authentication) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return ResultResponse.success(postService.getPostById(postId, Long.valueOf(authentication.getName())));
    }

    @GetMapping("/all")
    public ResultResponse<List<PostDetailWithCategory>> getAllPostById(Authentication authentication) {
        return ResultResponse.success(postService.getAllPostById(Long.valueOf(authentication.getName())));
    }

    @DeleteMapping("/{postId}")
    public ResultResponse<?> deletePost(
            @PathVariable Long postId,
            Authentication authentication
    ) throws IllegalAccessException {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return ResultResponse.success(
                postService.deletePost(
                        Long.valueOf(authentication.getName()),
                        postId
                )
        );
    }

    @PutMapping("/{postId}")
    public ResultResponse<?> updatePost(
            @PathVariable Long postId,
            @RequestBody @Valid PostUpdateReq postUpdateReq,
            Authentication authentication
    ) throws IllegalAccessException {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.updatePost(postId, postUpdateReq, authentication);
    }

    @PostMapping("{postId}/comments")
    public ResultResponse<?> postComment(
            @PathVariable Long postId,
            @RequestBody @Valid PostCommentReq postCommentReq,
            Authentication authentication
    ) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.postComment(
                postId,
                postCommentReq,
                Long.valueOf(authentication.getName())
        );
    }

    @GetMapping
    public ResultResponse<List<PostDetailRes>> getPostWithArea(
            @RequestParam double lng,
            @RequestParam double lat,
            @RequestParam double area
    ) {
        return ResultResponse.success(postService.getPostWithArea(lng, lat, area));
    }

    @GetMapping("/users/{userId}")
    public ResultResponse<?> getPostByUserId(@PathVariable Long userId) {
        if(userId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getPostByUserId(userId);
    }

    @GetMapping("/{postId}/comments")
    public ResultResponse<?> getCommentsByPostId(@PathVariable Long postId) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getCommentsByPostId(postId);
    }

    @PutMapping("/comments/{commentId}")
    public ResultResponse<?> updateComment(
            @PathVariable Long commentId,
            @RequestBody @Valid PostCommentReq postCommentReq,
            Authentication authentication
    ) throws IllegalAccessException {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.updateComment(commentId, postCommentReq, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResultResponse<?> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication
    ) throws IllegalAccessException {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.deleteComment(commentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/{postId}/post-like")
    public ResultResponse<?> postPostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.postPostLike(postId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/{postId}/post-like")
    public ResultResponse<?> getPostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getPostLike(postId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/{postId}/post-like")
    public ResultResponse<?> deletePostLike(
            @PathVariable Long postId,
            Authentication authentication
    ) {
        if(postId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.deletePostLike(postId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/{commentId}/comment-like")
    public ResultResponse<?> postCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.postCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/{commentId}/comment-like")
    public ResultResponse<?> getCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/{commentId}/comment-like")
    public ResultResponse<?> deleteCommentLike(
            @PathVariable Long commentId,
            Authentication authentication
    ) {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.deleteCommentLike(commentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/comments/{commentId}")
    public ResultResponse<?> postSubComment(
            @PathVariable Long commentId,
            @RequestBody @Valid PostSubCommentReq postSubCommentReq,
            Authentication authentication
    ) {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.postSubComment(commentId, postSubCommentReq, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/comments/{commentId}")
    public ResultResponse<?> getSubComments(@PathVariable Long commentId) {
        if(commentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getSubComments(commentId);
    }

    @PutMapping("/comments/subcomments/{subCommentId}")
    public ResultResponse<?> updateSubComment(
            @PathVariable Long subCommentId,
            @RequestBody @Valid PostSubCommentReq postSubCommentReq,
            Authentication authentication
    ) throws IllegalAccessException {
        if(subCommentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.updateSubComment(subCommentId, postSubCommentReq, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/subcomments/{subCommentId}")
    public ResultResponse<?> deleteSubComment(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) throws IllegalAccessException {
        if(subCommentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.deleteSubComment(subCommentId, Long.valueOf(authentication.getName()));
    }

    @PostMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> postSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        if(subCommentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.postSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

    @GetMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> getSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        if(subCommentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.getSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

    @DeleteMapping("/comments/subcomments/{subCommentId}/like")
    public ResultResponse<?> deleteSubCommentLike(
            @PathVariable Long subCommentId,
            Authentication authentication
    ) {
        if(subCommentId < 1) {return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));}
        return postService.deleteSubCommentLike(subCommentId, Long.valueOf(authentication.getName()));
    }

}
