package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.SubCommentLike;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubCommentLikeRepository extends JpaRepository<SubCommentLike,Long> {
    List<SubCommentLike> findAllByUser(User user);
}
