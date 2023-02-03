package com.ssafy.antenna.repository;


import com.ssafy.antenna.domain.post.Post;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<List<Post>> findAllByUser(User user);
}
