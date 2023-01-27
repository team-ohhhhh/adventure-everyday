package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.adventure.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdventureRepository extends JpaRepository<Adventure,Long> {

}
