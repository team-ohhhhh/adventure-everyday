package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        User user = userService.getUser(userId);
        return new ResponseEntity<>(user.toResponse(), HttpStatus.OK);
    }

    @PostMapping("/log-in")
    public ResponseEntity<LogInUserRes> logInUser(@RequestBody LogInUserReq logInUserReq) throws Exception {
        //validation 필요!!!!!!!!!!!!!!
        LogInUserRes logInUserRes = userService.logInUser(logInUserReq);
        return new ResponseEntity<>(logInUserRes, HttpStatus.OK);
    }


}
