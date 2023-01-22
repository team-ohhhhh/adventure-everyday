package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
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

    public User getUser(Long userId) throws Exception {
        return userRepository.findById(userId).orElseThrow(()-> new Exception("입력된 인덱스를 갖는 유저가 없습니다.")) ;
    }

    public LogInUserRes logInUser(LogInUserReq logInUserReq) throws Exception {
        //userName 있는지 확인 - 에러 처리 필요
        User user = (User) userRepository.findByEmail(logInUserReq.email())
                .orElseThrow(() -> new Exception("이메일을 다시 확인해주세요."));

        //password가 일치하는지 확인 - 에러 처리 필요
        if (!user.getPassword().equals(logInUserReq.password())) {
            throw new Exception("비밀번호를 다시 확인해주세요.");
        }
        return new LogInUserRes(user.getUserId(), user.getNickname());

    }
}
