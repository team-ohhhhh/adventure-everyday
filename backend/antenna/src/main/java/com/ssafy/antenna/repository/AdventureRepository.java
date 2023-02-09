package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
    Optional<List<Adventure>> findAllByOrderByCreateTimeDesc();

    Optional<List<Adventure>> findByTitleContaining(String title);

    Optional<List<Adventure>> findAllByUserOrderByCreateTimeDesc(User user);

    Optional<List<Adventure>> findALlByOrderByAvgReviewGradeDesc();
}
