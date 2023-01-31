package com.ssafy.antenna.repository;


import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByUser(User user);
}
