package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow,Long> {
}
