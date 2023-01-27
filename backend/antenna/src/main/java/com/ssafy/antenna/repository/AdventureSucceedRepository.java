package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdventureSucceedRepository extends JpaRepository<AdventureSucceed,Long> {
    List<AdventureSucceed> findAllByUser(User user);
}
