package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.antenna.Antenna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AntennaRepository extends JpaRepository<Antenna,Long> {
}
