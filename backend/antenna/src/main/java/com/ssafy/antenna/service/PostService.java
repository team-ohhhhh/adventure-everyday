package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.post.dto.PostUpdateReq;
import com.ssafy.antenna.exception.not_found.UserNotFoundException;
import com.ssafy.antenna.repository.PostRepository;
import com.ssafy.antenna.repository.UserRepository;
import com.ssafy.antenna.util.ImageUtil;
import com.ssafy.antenna.util.W3WUtil;
import com.what3words.javawrapper.response.ConvertTo3WA;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final W3WUtil w3WUtil;
    private final ImageUtil imageUtil;

    public String deletePost(Long userId, Long postId) throws IllegalAccessException {
        if (Objects.equals(userId, postRepository.findById(postId).orElseThrow(NoSuchElementException::new).getUser().getUserId())) {
            postRepository.deletePost(postId);
            return "게시글 삭제 성공";
        } else {
            throw new IllegalAccessException("잘못된 접근입니다");
        }
    }

    public String createPost(
            Long userId,
            String title,
            String content,
            String lat,
            String lng,
            String isPublic,
            MultipartFile file
    ) throws IOException {
        ConvertTo3WA w3wWords = w3WUtil.getW3W(Double.parseDouble(lng), Double.parseDouble(lat));
        Post post = Post.builder()
                .user(userRepository.findById(userId).orElseThrow(UserNotFoundException::new))
                .title(title)
                .content(content)
                .coordinate(new GeometryFactory().createPoint(new Coordinate(w3wWords.getCoordinates().getLat(), w3wWords.getCoordinates().getLng())))
                .w3w(w3wWords.getWords())
                .nearestPlace(w3wWords.getNearestPlace())
                .isPublic(Boolean.valueOf(isPublic))
                .build();
        if (file != null) {
            post.setPhoto(ImageUtil.compressImage(file.getBytes()));
            post.setPhotoType(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1));
        }
        postRepository.save(post);
        return "SUCCESS";
    }

    public ResponseEntity<?> getPostPhoto(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(NoSuchElementException::new);
        byte[] photo;
        try {
            photo = ImageUtil.decompressImage(post.getPhoto());
        } catch (NullPointerException e) {
            throw new NoSuchElementException("사진이 없습니다");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/" + post.getPhotoType()))
                .body(photo);
    }

    public ResultResponse<?> updatePost(
            Long postId,
            PostUpdateReq postUpdateReq,
            Authentication authentication
    ) throws IllegalAccessException {
        Post post = postRepository.findById(postId)
                .orElseThrow(NoSuchElementException::new);
        if (!Long.valueOf(authentication.getName()).equals(post.getUser().getUserId())) {
            throw new IllegalAccessException();
        } else {
            Post newPost = Post.builder()
                    .postId(post.getPostId())
                    .user(post.getUser())
                    .title(postUpdateReq.title())
                    .content(postUpdateReq.content())
                    .isPublic(Boolean.valueOf(postUpdateReq.isPublic()))
                    .photoType(post.getPhotoType())
                    .photo(post.getPhoto())
                    .nearestPlace(post.getNearestPlace())
                    .w3w(post.getW3w())
                    .coordinate(post.getCoordinate())
                    .build();
            return ResultResponse.success(postRepository.save(newPost).getPostId());
        }
    }
}
