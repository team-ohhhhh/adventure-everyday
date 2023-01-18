package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventurePlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventurePlaceRepository extends JpaRepository<AdventurePlace,Long> {
}
