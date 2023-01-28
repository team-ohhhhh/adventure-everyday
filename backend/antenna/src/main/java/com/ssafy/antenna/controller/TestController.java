package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.repository.CategoryRepository;
import com.what3words.javawrapper.What3WordsV3;
import com.what3words.javawrapper.request.Coordinates;
import com.what3words.javawrapper.response.ConvertTo3WA;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
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
    @PostMapping
    public ConvertTo3WA getW3W(@RequestParam double lat, @RequestParam double lng){

        What3WordsV3 api = new What3WordsV3("9JQT4MJK");
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        ConvertTo3WA words = api.convertTo3wa(new Coordinates(lat, lng))
                .language("ko")
                .execute();
        System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        System.out.println(words.toString());
        return words;
    }
}
