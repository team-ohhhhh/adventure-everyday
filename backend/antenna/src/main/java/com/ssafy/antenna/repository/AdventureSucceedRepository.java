package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdventureSucceedRepository extends JpaRepository<AdventureSucceed, Long> {
    Optional<List<AdventureSucceed>> findAllByUser(User user);

    Optional<List<AdventureSucceed>> findTop5ByAdventureOrderByCreateTimeDesc(Adventure adventure);

    Optional<Long> countByUser(User user);

    Optional<AdventureSucceed> findByUserAndAdventure(User user, Adventure adventure);

    Optional<List<AdventureSucceed>> findAllByUserOrderByCreateTimeDesc(User user);
    @Query(value = "select as3.succeed_id, as3.user_id, as3.adventure_id,as3.create_time,as3.update_time,as3.selected " +
            "from (select adventure_id, count(user_id) as cnt from adventure_succeed as2 where as2.user_id=:userId group by adventure_id) as test " +
            "join adventure_succeed as as3 on as3.adventure_id = test.adventure_id " +
            "order by cnt desc", nativeQuery = true)
    Optional<List<AdventureSucceed>> findAIPOrderByUserCount(@Param("userId") Long userId);
}
