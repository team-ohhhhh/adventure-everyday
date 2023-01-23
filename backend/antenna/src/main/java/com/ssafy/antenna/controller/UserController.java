package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    @PostMapping
    public ResponseEntity<PostUserRes> createUser(@RequestBody PostUserReq postUserReq){
        //validation 필요!!!!!!!!!!!!!!
        User user = userService.createUser(postUserReq);
        return new ResponseEntity<>(new PostUserRes(user.getUserId(),user.getNickname()), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailRes> getUser(@PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getUser(userId).toResponse(), HttpStatus.OK);
    }

    @PostMapping("/log-in")
    public ResponseEntity<LogInUserRes> logInUser(@RequestBody LogInUserReq logInUserReq) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.logInUser(logInUserReq), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<UserDetailRes> deleteUser(@PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.deleteUser(userId).toResponse(), HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDetailRes> modifyPwdUser(@RequestBody ModifyPwdUserReq modifyPwdUserReq, @PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.modifyPwdUser(userId,modifyPwdUserReq).toResponse(), HttpStatus.OK);
    }
    /*팔로잉의 뜻
    follow + ing 의 형태로 팔로우를 하고 있는 상태를 말합니다.
    팔로우 중이라는 뜻으로 내가 이미 이 계정을 팔로우하고 있다, 글 받아보기를 하고 있는 것입니다.
    이때 내가 팔로우 한 사람/계정이 A 라고 하면, 나는 A를 팔로잉 하고 있고, 나는 A의 팔로워가 됩니다. */
    @PostMapping("/{userId}/followings")
    public ResponseEntity<FollowDetailRes> CreateFollowUser(@RequestBody CreateFollowUserReq createFollowUserReq, @PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.createFollowUser(userId, createFollowUserReq), HttpStatus.OK);
    }

    @GetMapping("/{userId}/followings")
    public ResponseEntity<List<UserDetailRes>> GetFollowingUser(@PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getFollowingUser(userId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserDetailRes>> GetFollowerUser(@PathVariable Long userId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getFollowerUser(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/followers/{followId}")
    public ResponseEntity<FollowDetailRes> deleteFollowingUser(@PathVariable Long userId, @PathVariable Long followId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.deleteFollowingUser(userId,followId).toResponse(), HttpStatus.OK);
    }

}
