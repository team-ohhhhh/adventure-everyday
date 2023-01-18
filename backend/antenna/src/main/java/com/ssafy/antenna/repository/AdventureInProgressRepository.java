package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.AdventureInProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureInProgressRepository extends JpaRepository<AdventureInProgress,Long> {
}
