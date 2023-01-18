package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.post.CheckpointPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckpointPostRepository extends JpaRepository<CheckpointPost,Long> {
}
