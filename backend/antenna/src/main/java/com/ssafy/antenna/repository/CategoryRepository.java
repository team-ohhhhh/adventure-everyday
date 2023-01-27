package com.ssafy.antenna.repository;

import com.ssafy.antenna.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findCategoryIdByCategory(String category);
}
