package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
