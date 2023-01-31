package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.antenna.Antenna;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface AntennaRepository extends JpaRepository<Antenna,Long> {
    Optional<Antenna> findByAntennaIdAndUser(Long antennaId, User user);

    List<Antenna> findAllByUser(User user);
}
