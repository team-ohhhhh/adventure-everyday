package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.CommentLike;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentLikeRepository extends JpaRepository<CommentLike,Long> {
    List<CommentLike> findAllByUser(User user);
}
