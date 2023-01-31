package com.ssafy.antenna.domain.user.mapper;

import com.ssafy.antenna.domain.adventure.Adventure;
import com.ssafy.antenna.domain.adventure.AdventureSucceed;
import com.ssafy.antenna.domain.user.dto.UserFeatsDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserFeatsDtoMapper implements Function<AdventureSucceed, UserFeatsDto> {
    @Override
    public UserFeatsDto apply(AdventureSucceed adventureSucceed) {
        return new UserFeatsDto(
                adventureSucceed.getAdventure().getFeatTitle(),
                adventureSucceed.getAdventure().getFeatContent(),
                adventureSucceed.isSelected()
        );
    }
}
