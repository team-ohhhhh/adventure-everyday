package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.like.AdventureLike;
import com.ssafy.antenna.domain.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdventureLikeRepository extends JpaRepository<AdventureLike, Long> {
    Optional<AdventureLike> findByAdventureAndUser(Adventure adventure, User user);

    @Transactional
    void deleteByUserAndAdventure(User user,Adventure adventure);
}
