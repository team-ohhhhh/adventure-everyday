package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureInProgress;
import com.ssafy.antenna.domain.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdventureInProgressRepository extends JpaRepository<AdventureInProgress, Long> {
    Optional<List<AdventureInProgress>> findAllByUser(User user);

    Optional<List<AdventureInProgress>> findAllByUserOrderByCreateTimeDesc(User user);

    @Transactional
    void deleteByAdventureAndUser(Adventure adventure,User user);

    Optional<List<AdventureInProgress>> findAllByAdventure(Adventure adventure);

    Optional<AdventureInProgress> findByUserAndAdventure(User user, Adventure adventure);

    Optional<Long> countByAdventure(Adventure adventure);

    Optional<List<AdventureInProgress>> findTop5ByAdventureOrderByCreateTimeDesc(Adventure adventure);

    @Query(value = "select aip.progress_id,aip.create_time,aip.update_time,aip.clear_time,aip.current_point,aip.total_point,aip.adventure_id,aip.user_id " +
            "from (select adventure_id, count(user_id) as cnt from adventure_in_progress aip where aip.user_id=:userId group by adventure_id) as test " +
            "join adventure_in_progress  as aip on aip.adventure_id = test.adventure_id " +
            "order by cnt desc", nativeQuery = true)
    Optional<List<AdventureInProgress>> findAIPOrderByUserCount(@Param("userId") Long userId);

}
