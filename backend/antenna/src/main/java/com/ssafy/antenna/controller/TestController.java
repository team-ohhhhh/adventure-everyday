package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tests")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class TestController {
    private final CategoryRepository categoryRepository;

    @PostMapping("/category")
    public ResponseEntity<String> createCategory(){
        Category testCategory = Category.builder()
                .category("맛집")
                .build();
        // 저장해줌
        categoryRepository.save(testCategory);
        return new ResponseEntity<>("카테고리생성성공~~", HttpStatus.OK);
    }
}
