package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.like.AdventureLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureLikeRepository extends JpaRepository<AdventureLike,Long> {
}
