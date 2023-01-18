package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventureReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureReviewRepository extends JpaRepository<AdventureReview,Long> {
}
