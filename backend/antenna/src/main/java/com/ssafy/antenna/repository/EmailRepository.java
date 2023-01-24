package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.email.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<Email, Long> {
    int deleteAllByEmail(String email);

    Optional<Email> findByEmail(String email);
}
