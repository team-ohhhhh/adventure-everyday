package com.ssafy.antenna.repository;
import com.ssafy.antenna.domain.tier.Tier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TierRepository  extends JpaRepository<Tier, Long> {
}
