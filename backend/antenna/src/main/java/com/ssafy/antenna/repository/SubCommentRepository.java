package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.comment.SubComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCommentRepository extends JpaRepository<SubComment, Long> {
}
