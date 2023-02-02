package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.Follow;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    Optional<List<Follow>> findAllByFollowingUser(User followingUser);

    Optional<List<Follow>> findAllByFollowerUser(User followerUser);
}
