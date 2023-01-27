package com.ssafy.antenna.repository;


import com.ssafy.antenna.domain.post.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    String insertPointQuery = "UPDATE post SET coordinate = ST_GEOMFROMTEXT(:point) WHERE post_id = :postId";
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = insertPointQuery)
    int setPoint(Long postId, String point);

    String deletePostQuery = "delete from post where post_id=:postId";
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = deletePostQuery)
    void deletePost(Long postId);
}
