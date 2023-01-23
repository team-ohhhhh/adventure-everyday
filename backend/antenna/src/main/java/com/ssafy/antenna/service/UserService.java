package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.Follow;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.repository.FollowRepository;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    public User createUser(PostUserReq postUserReq) {
        //validation 필요!!!!!!!!!!!!!!
        User savedUser = userRepository.save(User.saveUser(postUserReq));
        return savedUser;
    }

    public User getUser(Long userId) throws Exception {
        return userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
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

    public User deleteUser(Long userId) throws Exception {
        //유저 정보가 존재 하는지 먼저 검색
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
        ;
        //존재한다면, delete 작업 수행한다.
        userRepository.deleteById(userId);
        return user;
    }

    public User modifyPwdUser(Long userId, ModifyPwdUserReq modifyPwdUserReq) throws Exception {
        //유저 정보가 존재 하는지 먼저 검색
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
        //존재한다면, 비밀번호 수정 작업을 수행한다.
        user.setPassword(modifyPwdUserReq.newPassword());
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public FollowDetailRes createFollowUser(Long userId, CreateFollowUserReq createFollowUserReq) throws Exception {
        //두 유저가 존재하는지 먼저 확인하기
        User follower = userRepository.findById(userId).orElseThrow(() -> new Exception("팔로잉을 하려는 유저가 존재하지 않습니다."));
        User following = userRepository.findById(createFollowUserReq.followingId()).orElseThrow(() -> new Exception("팔로잉의 대상인 유저가 존재하지 않습니다."));
        //두 유저가 모두 존재한다면, 데이터 넣어주기.
        Follow newFollow = new Follow();
        newFollow.setFollowerId(userId);
        newFollow.setFollowingId(createFollowUserReq.followingId());
        newFollow.setFollowerUser(follower);
        newFollow.setFollowingUser(following);
        followRepository.save(newFollow);
        return newFollow.toResponse();
    }

    public List<UserDetailRes> getFollowingUser(Long userId) throws Exception {
        //유저가 존재하는지 먼저 확인
        userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
        List<Follow> followList = followRepository.findByFollowingId(userId);
        List<UserDetailRes> userDetailResList = new ArrayList<>();
        for (int i = 0; i < followList.size(); i++) {
            userDetailResList.add(followList.get(i).getFollowerUser().toResponse());
        }
        return userDetailResList;
    }

    public List<UserDetailRes> getFollowerUser(Long userId) throws Exception {
        //유저가 존재하는지 먼저 확인
        userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
        List<Follow> followList = followRepository.findByFollowerId(userId);
        List<UserDetailRes> userDetailResList = new ArrayList<>();
        for (int i = 0; i < followList.size(); i++) {
            userDetailResList.add(followList.get(i).getFollowingUser().toResponse());
        }
        return userDetailResList;
    }

    public Follow deleteFollowingUser(Long userId, Long followId) throws Exception {
        //유저가 존재하는지 먼저 확인
        userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
        //팔로우 아이디 존재하는지 확인
        Follow deletedFollow = followRepository.findById(followId).orElseThrow(() -> new Exception("취소하려는 팔로잉이 존재하지 않습니다."));
        followRepository.deleteById(followId);
        return deletedFollow;
    }
}
