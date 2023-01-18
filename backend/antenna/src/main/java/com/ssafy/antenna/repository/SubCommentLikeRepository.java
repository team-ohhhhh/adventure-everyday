package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.SubCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCommentLikeRepository extends JpaRepository<SubCommentLike,Long> {
}
