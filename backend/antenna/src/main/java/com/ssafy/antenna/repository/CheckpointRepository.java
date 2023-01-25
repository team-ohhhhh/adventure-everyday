package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Checkpoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckpointRepository extends JpaRepository<Checkpoint,Long> {
}
