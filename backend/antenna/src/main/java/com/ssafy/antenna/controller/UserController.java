package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.domain.user.dto.PostUserRes;
import com.ssafy.antenna.domain.user.dto.UserDetailRes;
import com.ssafy.antenna.repository.UserRepository;
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
        return new ResponseEntity<PostUserRes>(new PostUserRes(user.getUserId(),user.getNickname()), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailRes> getUser(@PathVariable Long userId){
        //validation 필요!!!!!!!!!!!!!!
        User user = userService.getUser(userId);
        return new ResponseEntity<UserDetailRes>(user.toResponse(), HttpStatus.OK);
    }


}
