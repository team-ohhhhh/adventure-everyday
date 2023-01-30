package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.comment.Comment;
import com.ssafy.antenna.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
