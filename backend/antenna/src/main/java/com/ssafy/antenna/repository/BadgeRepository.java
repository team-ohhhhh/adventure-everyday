package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.badge.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge,Long> {
}
