package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    int countByEmail(String email);

    int countByNickname(String nickname);

    Optional<User> findByNickname(String nickname);

    List<User> findAllByNicknameStartingWith(String nickname);

    @Query("select u " +
            "from User u " +
            "join AdventureInProgress aip " +
            "on u.userId=aip.user.userId " +
            "order by u.exp desc ")
    Optional<List<User>> findAdventureInProgressUsers();
}
