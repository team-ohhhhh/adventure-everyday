package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.dto.CreateAdventureReq;
import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.repository.AdventureRepository;
import com.ssafy.antenna.repository.CategoryRepository;
import com.ssafy.antenna.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdventureService {
    private final AdventureRepository adventureRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public void createAdventure(CreateAdventureReq createAdventureReq, Authentication authentication){
        // user, end_date 나중에 바꾸기.
        Optional<User> curUser = userRepository.findById(Long.valueOf(authentication.getName()));

        // 나중에는 Category 실행시에 넣어주기 일단 지금은 테스트로 만들어줌
        // test
        // Category를 만들고
        Category testCategory = Category.builder()
                .category("맛집")
                .build();
        // 저장해줌
        categoryRepository.save(testCategory);
        // test

        // 나중에 Exeption 바꿔주기.
        Adventure newAdventure = Adventure.builder()
                .category(categoryRepository.findCategoryIdByCategory(createAdventureReq.category()).orElseThrow())
                .feat(createAdventureReq.feat())
                .title(createAdventureReq.title())
                .content(createAdventureReq.content())
                .difficulty(createAdventureReq.difficulty())
                .photo(createAdventureReq.photo())
                .validDate(createAdventureReq.validDate())
                .endDate(LocalDateTime.now().plusDays(createAdventureReq.validDate()))
                .user(curUser.orElseThrow())
                .build();

        adventureRepository.save(newAdventure);
    }

    public void deleteAdventure(Long adventureId){
        adventureRepository.deleteById(adventureId);
    }

}
