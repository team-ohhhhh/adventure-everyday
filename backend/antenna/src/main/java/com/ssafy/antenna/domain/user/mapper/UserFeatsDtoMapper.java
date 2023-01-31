package com.ssafy.antenna.domain.user.mapper;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.user.dto.UserFeatsDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserFeatsDtoMapper implements Function<Adventure, UserFeatsDto> {
    @Override
    public UserFeatsDto apply(Adventure adventure) {
        return new UserFeatsDto(
                adventure.getFeatTitle(),
                adventure.getFeatContent()
        );
    }
}
