package com.ssafy.antenna.repository;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    int countByEmail(String email);

    int countByNickname(String nickname);

    Optional<User> findByNickname(String nickname);

    List<User> findAllByNicknameStartingWith(String nickname);
}
