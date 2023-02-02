package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.antenna.Antenna;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AntennaRepository extends JpaRepository<Antenna, Long> {
    Optional<Antenna> findByAntennaIdAndUser(Long antennaId, User user);

    Optional<List<Antenna>> findAllByUser(User user);
}
