package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.dto.ReadAdventureRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdventureRepository extends JpaRepository<Adventure,Long> {
    Optional<List<Adventure>> findAllByOrderByCreateTimeAsc();
    Optional<List<Adventure>> findByTitleContaining(String keyword);
}
