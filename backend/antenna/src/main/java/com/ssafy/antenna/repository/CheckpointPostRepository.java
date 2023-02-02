package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.post.CheckpointPost;
import com.ssafy.antenna.domain.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheckpointPostRepository extends JpaRepository<CheckpointPost,Long> {
    Optional<List<CheckpointPost>> findAllByAdventurePlace(AdventurePlace adventurePlace);
    Optional<List<CheckpointPost>> findAllByAdventureOrderByCreateTimeDesc(Adventure adventure);

    Optional<CheckpointPost> findByPost(Post post);
}
