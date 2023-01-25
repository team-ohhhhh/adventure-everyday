package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailRes> getUser(@PathVariable Long userId, Authentication authentication) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getUser(userId).toResponse(), HttpStatus.OK);
    }


    @DeleteMapping
    public ResponseEntity<UserDetailRes> deleteUser(Authentication authentication) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.deleteUser(Long.valueOf(authentication.getName())).toResponse(), HttpStatus.OK);
    }

    @PutMapping("/password")
    public ResponseEntity<UserDetailRes> modifyPwdUser(@RequestBody ModifyPwdUserReq modifyPwdUserReq, Authentication authentication) throws Exception {
        System.out.println(Long.valueOf(authentication.getName()));
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.modifyPwdUser(Long.valueOf(authentication.getName()),modifyPwdUserReq).toResponse(), HttpStatus.OK);
    }
    /*팔로잉의 뜻
    follow + ing 의 형태로 팔로우를 하고 있는 상태를 말합니다.
    팔로우 중이라는 뜻으로 내가 이미 이 계정을 팔로우하고 있다, 글 받아보기를 하고 있는 것입니다.
    이때 내가 팔로우 한 사람/계정이 A 라고 하면, 나는 A를 팔로잉 하고 있고, 나는 A의 팔로워가 됩니다. */
    @PostMapping("/followings")
    public ResponseEntity<FollowDetailRes> createFollowUser(@RequestBody CreateFollowUserReq createFollowUserReq, Authentication authentication) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.createFollowUser(Long.valueOf(authentication.getName()), createFollowUserReq), HttpStatus.OK);
    }

    @GetMapping("/followings")
    public ResponseEntity<List<UserDetailRes>> getFollowingUser(Authentication authentication) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getFollowingUser(Long.valueOf(authentication.getName())), HttpStatus.OK);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<UserDetailRes>> getFollowerUser(Authentication authentication) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.getFollowerUser(Long.valueOf(authentication.getName())), HttpStatus.OK);
    }

    @DeleteMapping("/followers/{followId}")
    public ResponseEntity<FollowDetailRes> deleteFollowingUser(Authentication authentication, @PathVariable Long followId) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(userService.deleteFollowingUser(Long.valueOf(authentication.getName()),followId).toResponse(), HttpStatus.OK);
    }

    @GetMapping("/check-email")
    public ResponseEntity<AuthEmailRes> CheckEmailUser(@RequestParam String email) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        return new ResponseEntity<>(new AuthEmailRes(userService.checkEmailUser(email)), HttpStatus.OK);
    }

}
