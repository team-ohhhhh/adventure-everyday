package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.adventure.dto.CreateAdventureReq;
import com.ssafy.antenna.domain.adventure.dto.ReadAdventureRes;
import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.repository.AdventureRepository;
import com.ssafy.antenna.repository.AdventureSucceedRepository;
import com.ssafy.antenna.repository.CategoryRepository;
import com.ssafy.antenna.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdventureService {
    private final AdventureRepository adventureRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final AdventureSucceedRepository adventureSucceedRepository;

    public void createAdventure(CreateAdventureReq createAdventureReq, Authentication authentication){
        // user, end_date 나중에 바꾸기.
        Optional<User> curUser = userRepository.findById(Long.valueOf(authentication.getName()));

        // 나중에는 Category 실행시에 넣어주기 일단 지금은 테스트로 만들어줌
        // test
        // Category를 만들고
//        Category testCategory = Category.builder()
//                .category("맛집")
//                .build();
//        // 저장해줌
//        categoryRepository.save(testCategory);
        // test

        // 나중에 Exeption 바꿔주기.
        Adventure newAdventure = Adventure.builder()
                .category(categoryRepository.findCategoryIdByCategory(createAdventureReq.category()).orElseThrow())
                .feat(createAdventureReq.feat())
                .title(createAdventureReq.title())
                .content(createAdventureReq.content())
                .difficulty(createAdventureReq.difficulty())
                .photo(createAdventureReq.photo())
                .startDate(createAdventureReq.startDate())
                .endDate(createAdventureReq.endDate())
                .user(curUser.orElseThrow())
                .build();

        adventureRepository.save(newAdventure);
    }

    public void deleteAdventure(Long adventureId){
        adventureRepository.deleteById(adventureId);
    }

    public List<ReadAdventureRes> readAdventure(String order,Double lat,Double lng){
        // 거리순 조회
        List<ReadAdventureRes> result=new ArrayList<>();
        if(lat!=null && lng!=null){

        }else{
            // 생성시간 조회
            if(order.equals("update")){
                List<Adventure>temp = adventureRepository.findAllByOrderByCreateTimeAsc().orElseThrow();
                result = toResponse(temp);
            }
            // 달성자순 조회
            else if(order.equals("user")){

            }
        }

        return result;
    }

    public List<ReadAdventureRes> toResponse(List<Adventure> temp){
        List<ReadAdventureRes> result=new ArrayList<>();

        for(Adventure adventrue : temp){
            ReadAdventureRes newReadAdventureRes = new ReadAdventureRes(
                    adventrue.getAdventureId(),
                    adventrue.getCategory().getCategory(),
                    adventrue.getFeat(),
                    adventrue.getTitle(),
                    adventrue.getContent(),
                    adventrue.getDifficulty(),
                    adventrue.getPhoto(),
                    adventrue.getStartDate(),
                    adventrue.getEndDate(),
                    adventrue.getAvgReviewRate()
            );
            result.add(newReadAdventureRes);
        }

        return result;
    }

    public void createAdventureSucceed(Long adventureId, Long userId) {
        User curUser = userRepository.findById(userId).orElseThrow();
        Adventure curAdventure = adventureRepository.findById(adventureId).orElseThrow();

        AdventureSucceed newAdventureSucceed = AdventureSucceed.builder()
                .user(curUser)
                .adventure(curAdventure)
                .build();

        adventureSucceedRepository.save(newAdventureSucceed);
    }
}
