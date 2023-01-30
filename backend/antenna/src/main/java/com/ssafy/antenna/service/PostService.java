package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.comment.PostCommentReq;
import com.ssafy.antenna.domain.location.Location;
import com.ssafy.antenna.domain.comment.SubComment;
import com.ssafy.antenna.domain.comment.SubCommentDtoMapper;
import com.ssafy.antenna.domain.comment.dto.PostSubCommentReq;
import com.ssafy.antenna.domain.comment.dto.SubCommentDto;
import com.ssafy.antenna.domain.comment.dto.commentDto;
import com.ssafy.antenna.domain.like.CommentLike;
import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.like.SubCommentLike;
import com.ssafy.antenna.domain.like.dto.CommentLikeDto;
import com.ssafy.antenna.domain.like.dto.PostLikeDto;
import com.ssafy.antenna.domain.like.dto.SubCommentLikeDto;
import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.post.dto.PostDetailRes;
import com.ssafy.antenna.domain.post.PostDtoMapper;
import com.ssafy.antenna.domain.post.dto.PostDto;
import com.ssafy.antenna.domain.post.dto.PostUpdateReq;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.exception.not_found.UserNotFoundException;
import com.ssafy.antenna.repository.CommentRepository;
import com.ssafy.antenna.repository.PostRepository;
import com.ssafy.antenna.repository.UserRepository;
import com.ssafy.antenna.util.CardinalDirection;
import com.ssafy.antenna.util.GeometryUtil;
import com.ssafy.antenna.repository.*;
import com.ssafy.antenna.util.ImageUtil;
import com.ssafy.antenna.util.W3WUtil;
import com.what3words.javawrapper.response.ConvertTo3WA;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final EntityManager entityManager;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final W3WUtil w3WUtil;
    private final ImageUtil imageUtil;
    private final CommentRepository commentRepository;
    private final PostDtoMapper postDtoMapper;
    private final PostLikeRepository postLikeRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final SubCommentRepository subCommentRepository;
    private final SubCommentDtoMapper subCommentDtoMapper;
    private final SubCommentLikeRepository subCommentLikeRepository;

    public String deletePost(Long userId, Long postId) throws IllegalAccessException {
        if (Objects.equals(userId, postRepository.findById(postId).orElseThrow(NoSuchElementException::new).getUser().getUserId())) {
            postRepository.deletePost(postId);
            return "게시글 삭제 성공";
        } else {
            throw new IllegalAccessException("잘못된 접근입니다");
        }
    }

    public String createPost(Long userId, String title, String content, String lat, String lng, String isPublic, MultipartFile file) throws IOException {
        ConvertTo3WA w3wWords = w3WUtil.getW3W(Double.parseDouble(lng), Double.parseDouble(lat));
        Post post = Post.builder().user(userRepository.findById(userId).orElseThrow(UserNotFoundException::new)).title(title).content(content).coordinate(new GeometryFactory().createPoint(new Coordinate(w3wWords.getCoordinates().getLat(), w3wWords.getCoordinates().getLng()))).w3w(w3wWords.getWords()).nearestPlace(w3wWords.getNearestPlace()).isPublic(Boolean.valueOf(isPublic)).build();
        if (file != null) {
            post.setPhoto(ImageUtil.compressImage(file.getBytes()));
            post.setPhotoType(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1));
        }
        postRepository.save(post);
        return "SUCCESS";
    }

    public ResponseEntity<?> getPostPhoto(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(NoSuchElementException::new);
        byte[] photo;
        try {
            photo = ImageUtil.decompressImage(post.getPhoto());
        } catch (NullPointerException e) {
            throw new NoSuchElementException("사진이 없습니다");
        }
        return ResponseEntity.ok().contentType(MediaType.valueOf("image/" + post.getPhotoType())).body(photo);
    }

    public ResultResponse<?> updatePost(
            Long postId,
            PostUpdateReq postUpdateReq,
            Authentication authentication
    ) throws IllegalAccessException {
        Post post = postRepository.findById(postId).orElseThrow(NoSuchElementException::new);
        if (!Long.valueOf(authentication.getName()).equals(post.getUser().getUserId())) {
            throw new IllegalAccessException();
        } else {
            Post newPost = Post.builder().postId(post.getPostId()).user(post.getUser()).title(postUpdateReq.title()).content(postUpdateReq.content()).isPublic(Boolean.valueOf(postUpdateReq.isPublic())).photoType(post.getPhotoType()).photo(post.getPhoto()).nearestPlace(post.getNearestPlace()).w3w(post.getW3w()).coordinate(post.getCoordinate()).build();
            return ResultResponse.success(postRepository.save(newPost).getPostId());
        }
    }

    public ResultResponse<?> postComment(
            Long postId,
            PostCommentReq postCommentReq,
            Long userId
    ) {
        Post post = postRepository.findById(postId).orElseThrow(NoSuchElementException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Comment comment = commentRepository.save(Comment.builder().post(post).user(user).content(postCommentReq.content()).build());
        return ResultResponse.success(postId);
    }

    public ResultResponse<?> getPostByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        List<PostDto> postDtoList = postRepository.findAllByUser(user).stream()
                .filter(Post::isPublic)
                .map(postDtoMapper)
                .collect(Collectors.toList());
        return ResultResponse.success(postDtoList);
    }

    public ResultResponse<?> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(NoSuchElementException::new);
        List<commentDto> commentList = post.getComments().stream().map(comment -> new commentDto(comment.getUser().getNickname(), comment.getContent())).collect(Collectors.toList());
        return ResultResponse.success(commentList);
    }

    public ResultResponse<?> deleteComment(Long commentId, Long userId)
            throws IllegalAccessException {
        Comment comment = commentRepository.findById(commentId).orElseThrow(NoSuchElementException::new);
        if (!comment.getUser().getUserId().equals(userId)) {
            throw new IllegalAccessException("잘못된 접근입니다");
        } else {
            commentRepository.delete(comment);
        }
        return ResultResponse.success("삭제 성공");
    }

    public ResultResponse<?> postPostLike(Long postId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Post post = postRepository.findById(postId).orElseThrow(NoSuchElementException::new);
        postLikeRepository.save(PostLike.builder()
                .user(user)
                .post(post)
                .build());
        return ResultResponse.success("좋아요 등록 성공");
    }

    public ResultResponse<?> getPostLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(NoSuchElementException::new);
        List<PostLike> postLikeList = postLikeRepository.findAllByPost(post);
        boolean isLiked = postLikeList.stream()
                .filter(postLike -> postLike.getUser().getUserId().equals(userId))
                .collect(Collectors.toList()).isEmpty();
        return ResultResponse.success(new PostLikeDto(post.getPostLikes().size(), !isLiked));
//        return ResultResponse.success(post.getPostLikes().size());
    }

    public ResultResponse<?> deletePostLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(NoSuchElementException::new);
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        List<PostLike> postLikeList = postLikeRepository.findAllByPost(post).stream()
                .filter(postLike -> postLike.getUser().equals(user)).collect(Collectors.toList());
        if (postLikeList.size() > 0) {
            postLikeRepository.delete(postLikeList.get(0));
        } else {
            throw new NoSuchElementException();
        }
        return ResultResponse.success("삭제 성공");
    }

    public ResultResponse<?> postCommentLike(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(NoSuchElementException::new);
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        CommentLike save = commentLikeRepository.save(CommentLike.builder()
                .comment(comment)
                .user(user)
                .build());
        return ResultResponse.success("댓글 좋아요 성공");
    }

    public ResultResponse<?> getCommentLike(Long commentId, Long userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(NoSuchElementException::new);
        List<CommentLike> commentLikes = comment.getCommentLikes();
        boolean isLiked = commentLikes.stream()
                .filter(commentLike -> commentLike.getUser().getUserId().equals(userId))
                .collect(Collectors.toList()).isEmpty();
        return ResultResponse.success(new CommentLikeDto(commentLikes.size(), !isLiked));
    }

    public ResultResponse<?> deleteCommentLike(Long commentId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        List<CommentLike> commentLikes = commentLikeRepository.findAllByUser(user).stream()
                .filter(commentLike -> commentLike.getComment().getCommentId().equals(commentId))
                .collect(Collectors.toList());
        if (commentLikes.size() > 0) {
            commentLikeRepository.delete(commentLikes.get(0));
            return ResultResponse.success("좋아요 삭제 성공");
        } else {
            throw new NoSuchElementException();
        }
    }

    public ResultResponse<?> postSubComment(
            Long commentId,
            PostSubCommentReq postSubCommentReq,
            Long userId
    ) {
        SubComment subComment = SubComment.builder()
                .comment(commentRepository.findById(commentId)
                        .orElseThrow(NoSuchElementException::new))
                .user(userRepository.findById(userId)
                        .orElseThrow(UserNotFoundException::new))
                .content(postSubCommentReq.content())
                .build();
        subCommentRepository.save(subComment);
        return ResultResponse.success("대댓글 작성 성공");

    }

    public ResultResponse<?> getSubComments(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(NoSuchElementException::new);
        List<SubCommentDto> subCommentDtos = comment.getSubComments().stream()
                .map(subCommentDtoMapper)
                .collect(Collectors.toList());
        return ResultResponse.success(subCommentDtos);
    }

    public ResultResponse<?> deleteSubComment(Long subCommentId, Long userId)
            throws IllegalAccessException {
        SubComment subComment = subCommentRepository.findById(subCommentId)
                .orElseThrow(NoSuchElementException::new);
        if (subComment.getUser().getUserId().equals(userId)) {
            subCommentRepository.delete(subComment);
            return ResultResponse.success("대댓글 삭제 성공");
        }
        throw new IllegalAccessException("잘못된 접근입니다");
    }

    public ResultResponse<?> postSubCommentLike(Long subCommentId, Long userId) {
        SubComment subComment = subCommentRepository.findById(subCommentId)
                .orElseThrow(NoSuchElementException::new);
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        subCommentLikeRepository.save(SubCommentLike.builder()
                .subComment(subComment)
                .user(user)
                .build());
        return ResultResponse.success("좋아요 성공");
    }

    public ResultResponse<?> getSubCommentLike(Long subCommentId, Long userId) {
        SubComment subComment = subCommentRepository.findById(subCommentId)
                .orElseThrow(NoSuchElementException::new);
        boolean isLiked = subComment.getSubCommentLikes().stream()
                .filter(subCommentLike -> subCommentLike.getUser().getUserId().equals(userId))
                .collect(Collectors.toList()).isEmpty();
        return ResultResponse.success(new SubCommentLikeDto(
                subComment.getSubCommentLikes().size(),
                !isLiked
        ));
    }

    public ResultResponse<?> deleteSubCommentLike(Long subCommentId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        List<SubCommentLike> subCommentLikes = subCommentLikeRepository.findAllByUser(user);
        List<SubCommentLike> collect = subCommentLikes.stream()
                .filter(subCommentLike -> subCommentLike.getSubComment().getSubCommentId().equals(subCommentId))
                .collect(Collectors.toList());
        if(!collect.isEmpty()) {
            subCommentLikeRepository.delete(collect.get(0));
            return ResultResponse.success("삭제 성공");
        }
        throw new NoSuchElementException();
    }

    public List<PostDetailRes> getPostWithArea(double lng, double lat, double area) {
        System.out.println(lng + " " + lat + " " + area);
        Location northEast = GeometryUtil.calculateByDirection(lng, lat, area, CardinalDirection.NORTHEAST
                .getBearing());
        Location southWest = GeometryUtil.calculateByDirection(lng, lat, area, CardinalDirection.SOUTHWEST
                .getBearing());
        double x1 = northEast.lat();
        double y1 = northEast.lng();
        double x2 = southWest.lat();
        double y2 = southWest.lng();
        System.out.println(northEast.toString());
        System.out.println(southWest.toString());
        String pointFormat = String.format("'LINESTRING(%f %f, %f %f)')", x1, y1, x2, y2);
        Query query = entityManager.createNativeQuery("" +
                                "SELECT * FROM post as p " +
                                "WHERE MBRContains(ST_LINESTRINGFROMTEXT(" + pointFormat + ", p.coordinate)"
                        , Post.class)
                .setMaxResults(100);
        List<Post> postList = query.getResultList();
        List<PostDetailRes> postDetailResList = new ArrayList<>();
        for (Post post :
                postList) {
            postDetailResList.add(post.toResponse());
        }
        return postDetailResList;
    }
}
