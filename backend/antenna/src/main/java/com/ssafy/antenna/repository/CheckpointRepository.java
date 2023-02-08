package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.adventure.Checkpoint;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CheckpointRepository extends JpaRepository<Checkpoint, Long> {
    Optional<Integer> countByUserAndAdventurePlace(User user, AdventurePlace adventurePlace);
}
