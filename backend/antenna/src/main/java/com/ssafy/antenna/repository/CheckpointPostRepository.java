package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.post.CheckpointPost;
import com.ssafy.antenna.domain.post.Post;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CheckpointPostRepository extends JpaRepository<CheckpointPost, Long> {
    Optional<List<CheckpointPost>> findAllByAdventurePlace(AdventurePlace adventurePlace);

    Optional<List<CheckpointPost>> findAllByAdventure(Adventure adventure);

    Optional<List<CheckpointPost>> findAllByAdventureOrderByCreateTimeDesc(Adventure adventure);

    Optional<CheckpointPost> findByPost(Post post);

    Optional<CheckpointPost> findByAdventureAndPost(Adventure adventure, Post post);

    @Query(value = "select cp.checkpoint_id,cp.create_time,cp.update_time,cp.adventure_id,cp.adventure_place_id,cp.post_id\n" +
            "from (select post_id, count(post_id) cnt from post_like group by post_id) temp\n" +
            "right outer join checkpoint_post cp\n" +
            "on cp.post_id=temp.post_id and cp.adventure_place_id=1\n" +
            "order by temp.cnt desc;",nativeQuery = true)
    Optional<List<CheckpointPost>> findCheckpointPostByPostLikeDesc(@Param("adventurePlaceId") Long adventurePlaceId);

    Optional<List<CheckpointPost>> findAllByAdventurePlaceOrderByCreateTimeDesc(AdventurePlace adventurePlace);
    @Transactional
    void deleteByPostAndAdventure(Post post, Adventure adventure);
}
