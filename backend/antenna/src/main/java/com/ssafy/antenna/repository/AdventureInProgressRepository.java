package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventureInProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureInProgressRepository extends JpaRepository<AdventureInProgress,Long> {
}
