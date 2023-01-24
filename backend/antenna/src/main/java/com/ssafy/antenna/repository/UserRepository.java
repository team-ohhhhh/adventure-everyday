package com.ssafy.antenna.repository;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<Object> findByEmail(String email);

    int countByEmail(String email);
}
