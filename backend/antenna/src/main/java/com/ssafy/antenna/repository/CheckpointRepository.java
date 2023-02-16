package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.adventure.Checkpoint;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CheckpointRepository extends JpaRepository<Checkpoint, Long> {
    Optional<Integer> countByUserAndAdventurePlace(User user, AdventurePlace adventurePlace);
    Optional<Checkpoint> findByUserAndAdventurePlace(User user, AdventurePlace adventurePlace);
    @Transactional
    Optional<Integer> deleteByAdventurePlaceAndUser(AdventurePlace adventurePlace, User user);
}
