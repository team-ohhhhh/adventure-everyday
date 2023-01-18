package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
