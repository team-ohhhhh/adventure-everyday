package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventureReviewRepository extends JpaRepository<AdventureReview,Long> {
    Optional<List<AdventureReview>> findAllByAdventure(Adventure adventure);
}
