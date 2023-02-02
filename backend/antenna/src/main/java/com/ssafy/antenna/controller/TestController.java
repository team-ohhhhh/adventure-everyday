package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.category.Category;
import com.ssafy.antenna.domain.location.Location;
import com.ssafy.antenna.exception.ErrorCode;
import com.ssafy.antenna.repository.CategoryRepository;
import com.ssafy.antenna.util.CardinalDirection;
import com.ssafy.antenna.util.GeometryUtil;
import com.what3words.javawrapper.What3WordsV3;
import com.what3words.javawrapper.request.Coordinates;
import com.what3words.javawrapper.response.ConvertTo3WA;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
@CrossOrigin("*") // 일시적으로 CORS 오류 해결
public class TestController {
    private final CategoryRepository categoryRepository;
    private final EntityManager entityManager;
    @PostMapping("/category")
    public ResponseEntity<String> createCategory(){
        Category testCategory = Category.builder()
                .category("맛집")
                .build();
        // 저장해줌
        categoryRepository.save(testCategory);
        return new ResponseEntity<>("카테고리생성성공~~", HttpStatus.OK);
    }
    @GetMapping("/main")
    public ResultResponse<ErrorResponse> test(){
        return ResultResponse.error(new ErrorResponse(ErrorCode.ANTENNA_NOT_FOUND));
    }
    @GetMapping("/location")
    public Long isPostWithArea(@RequestParam double lng, @RequestParam double lat, @RequestParam double area, @RequestParam Long postId) {
        Location northEast = GeometryUtil.calculateByDirection(lat, lng, area, CardinalDirection.NORTHEAST
                .getBearing());
        Location southWest = GeometryUtil.calculateByDirection(lat, lng, area, CardinalDirection.SOUTHWEST
                .getBearing());
        System.out.println(northEast);
        System.out.println(southWest);
        double x1 = northEast.lng();
        double y1 = northEast.lat();
        double x2 = southWest.lng();
        double y2 = southWest.lat();
        String pointFormat = String.format("'LINESTRING(%f %f, %f %f)')", x1, y1, x2, y2);
        Query query = entityManager.createNativeQuery("" +
                        "SELECT * FROM (SELECT post_id FROM post as p " +
                        "WHERE MBRContains(ST_LINESTRINGFROMTEXT(" + pointFormat + ", p.coordinate) and p.is_public=true" +
                        ") as list where post_id=" + postId
                , Long.class);
        List<Long> isAntennaId = query.getResultList();
        if(isAntennaId.size()==0){
            return 0L;
        }else{
            return isAntennaId.get(0);
        }
    }


}
