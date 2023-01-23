package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    List<Follow> findByFollowingId(Long userId);

    List<Follow> findByFollowerId(Long userId);
}
