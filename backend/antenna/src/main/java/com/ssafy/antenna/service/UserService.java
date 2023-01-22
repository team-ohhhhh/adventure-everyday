package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createUser(PostUserReq postUserReq) {
        //validation 필요!!!!!!!!!!!!!!
        User savedUser = userRepository.save(User.saveUser(postUserReq));
        return savedUser;
    }

    public User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }
}
