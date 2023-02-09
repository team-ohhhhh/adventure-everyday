package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
    Optional<List<Adventure>> findAllByOrderByCreateTimeDesc();

    Optional<List<Adventure>> findByTitleContaining(String title);

    Optional<List<Adventure>> findAllByUserOrderByCreateTimeDesc(User user);

    Optional<List<Adventure>> findALlByOrderByAvgReviewGradeDesc();
    @Query(value = "select a2.adventure_id,a2.create_time,a2.update_time,a2.avg_review_grade,a2.content,a2.difficulty,a2.end_date,a2.exp,a2.feat,a2.photo_name,a2.photo_url,a2.start_date,a2.title,a2.category_id,a2.user_id " +
            "from (select adventure_id, count(user_id) as cnt from adventure a1 where a1.user_id=:userId group by adventure_id) as test " +
            "join adventure as a2 on a2.adventure_id = test.adventure_id " +
            "order by cnt desc", nativeQuery = true)
    Optional<List<Adventure>> findAdventuresOrderByUserCount(@Param("userId") Long userId);
}
