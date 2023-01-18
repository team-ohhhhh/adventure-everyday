package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.subcomment.SubComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCommentRepository extends JpaRepository<SubComment,Long> {
}
