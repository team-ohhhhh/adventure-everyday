package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventureInProgress;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventureInProgressRepository extends JpaRepository<AdventureInProgress,Long> {
    Optional<List<AdventureInProgress>> findAllByUser(User user);
}
