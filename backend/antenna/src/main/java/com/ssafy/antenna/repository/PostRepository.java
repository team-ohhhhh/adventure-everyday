package com.ssafy.antenna.repository;


import com.ssafy.antenna.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
