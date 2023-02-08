package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventureSucceedRepository extends JpaRepository<AdventureSucceed, Long> {
    Optional<List<AdventureSucceed>> findAllByUser(User user);

    Optional<List<AdventureSucceed>> findTop5ByAdventureOrderByCreateTimeDesc(Adventure adventure);

    Optional<Long> countByUser(User user);

    Optional<AdventureSucceed> findByUserAndAdventure(User user, Adventure adventure);
}
