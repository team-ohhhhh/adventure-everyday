package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureInProgress;
import com.ssafy.antenna.domain.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventureInProgressRepository extends JpaRepository<AdventureInProgress, Long> {
    Optional<List<AdventureInProgress>> findAllByUser(User user);

    @Transactional
    void deleteByAdventure(Adventure adventure);

    Optional<List<AdventureInProgress>> findAllByAdventure(Adventure adventure);

    Optional<AdventureInProgress> findByUserAndAdventure(User user,Adventure adventure);

    Optional<Long> countByAdventure(Adventure adventure);

    Optional<List<AdventureInProgress>> findTop5ByAdventureOrderByCreateTimeDesc(Adventure adventure);

}
