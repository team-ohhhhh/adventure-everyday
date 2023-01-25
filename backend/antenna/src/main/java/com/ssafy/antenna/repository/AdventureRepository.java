package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdventureRepository extends JpaRepository<Adventure,Long> {
    /*
    @Query("select a " +
            "from Adventure a " +
            "join fetch a.adventureLikes " +
            "where a.user.userId = :userId ")
    List<Adventure> findByUser(@Param("userId") Long userId);
     */
}
