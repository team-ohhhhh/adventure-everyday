package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.PostLike;
import com.ssafy.antenna.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    List<PostLike> findAllByPost(Post post);
}
