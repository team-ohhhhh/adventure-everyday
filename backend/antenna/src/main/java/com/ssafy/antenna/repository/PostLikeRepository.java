package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike,Long> {
}
