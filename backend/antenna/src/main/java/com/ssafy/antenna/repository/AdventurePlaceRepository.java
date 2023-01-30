package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventurePlace;
import com.ssafy.antenna.domain.adventure.dto.ReadAdventurePlaceRes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventurePlaceRepository extends JpaRepository<AdventurePlace,Long> {
    Optional<List<AdventurePlace>> findAllByAdventure(Adventure adventure);
}
