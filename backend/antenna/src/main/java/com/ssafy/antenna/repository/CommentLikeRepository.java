package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike,Long> {
}
