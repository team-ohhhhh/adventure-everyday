package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.domain.email.dto.CheckEmailRes;
import com.ssafy.antenna.domain.user.Follow;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.repository.FollowRepository;
import com.ssafy.antenna.repository.UserRepository;
import com.ssafy.antenna.util.EmailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;

    public User getUser(Long userId) throws Exception {
        return userRepository.findById(userId).orElseThrow(() -> new Exception("입력된 인덱스를 갖는 유저가 없습니다."));
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
        //존재한다면, 기존 비밀번호가 일치하는지 확인한다.
        if (passwordEncoder.matches(modifyPwdUserReq.oldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(modifyPwdUserReq.newPassword()));
            User savedUser = userRepository.save(user);
            return savedUser;
        } else {
            throw new Exception("기존 비밀번호가 일치하지 않습니다.");
        }


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

    public CheckEmailRes checkEmailUser(String email) throws Exception {
        int count = userRepository.countByEmail(email);
        CheckEmailRes checkEmailRes = new CheckEmailRes(false, null);
        if (count == 1) {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new Exception("유저 조회중 문제 발생"));
            checkEmailRes = new CheckEmailRes(true, user.toResponse());
        }
        return checkEmailRes;
    }

    @Transactional
    public AuthEmailRes resetPwdUser(ResetPwdUserReq resetPwdUserReq) throws Exception {
        EmailHandler emailHandler = new EmailHandler(javaMailSender);
        User user = userRepository.findById(resetPwdUserReq.userId()).orElseThrow(() -> new Exception("유저가 존재하지 않습니다."));
        emailHandler.setTo(user.getEmail());
        emailHandler.setSubject("antenna 임시 비밀번호 발급 안내입니다.");
        Random rand = new Random();
        StringBuffer key = new StringBuffer();
        for (int i = 0; i < 12; i++) {
            int index = rand.nextInt(3);
            switch (index) {
                case 0:
                    key.append(Character.toChars(((rand.nextInt(26)) + 97)));
                    break;
                case 1:
                    key.append(Character.toChars(((rand.nextInt(26)) + 65)));
                    break;
                case 2:
                    key.append(Character.toChars((rand.nextInt(10)) + 48));
                    break;
            }
        }
        String htmlContent = "<p> 임시 비밀번호는 [" + key.toString() + "] 입니다.<p>";
        emailHandler.setText(htmlContent, true);
        emailHandler.send();
        User newUser = new User(user.getCreateTime(), user.getUpdateTime(), user.getUserId(), user.getEmail(), user.getNickname(), passwordEncoder.encode(key.toString()), user.getLevel(), user.getExp(), user.getIntroduce(), user.getPhoto());
        userRepository.save(newUser);

        return new AuthEmailRes(true);
    }

    public CheckNicknameRes checkNicknameUser(String nickname) throws Exception {
        int count = userRepository.countByNickname(nickname);
        CheckNicknameRes checkNicknameRes = new CheckNicknameRes(false, null);
        if (count == 1) {
            User user = userRepository.findByNickname(nickname).orElseThrow(() -> new Exception("유저 조회중 문제 발생"));
            checkNicknameRes = new CheckNicknameRes(true, user.toResponse());
        }
        return checkNicknameRes;
    }

    public List<UserDetailRes> likeNicknameUser(String nickname) {
        List<User> userList = userRepository.findAllByNicknameStartingWith(nickname);
        List<UserDetailRes> userDetailResList = new ArrayList<>();
        for (int i = 0; i < userList.size(); i++) {
            userDetailResList.add(userList.get(i).toResponse());
        }
        return userDetailResList;
    }
}
