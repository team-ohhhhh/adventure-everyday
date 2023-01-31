package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.Follow;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow,Long> {
    List<Follow> findAllByFollowingUser(User followingUser);

    List<Follow> findAllByFollowerUser(User followerUser);
}
