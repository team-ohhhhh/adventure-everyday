package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ErrorResponse;
import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.domain.antenna.dto.DetailAntennaRes;
import com.ssafy.antenna.domain.antenna.dto.PostAntennaReq;
import com.ssafy.antenna.domain.email.dto.AuthEmailRes;
import com.ssafy.antenna.domain.user.dto.*;
import com.ssafy.antenna.exception.AbstractAppException;
import com.ssafy.antenna.exception.ErrorCode;
import com.ssafy.antenna.exception.bad_request.BadConstantException;
import com.ssafy.antenna.service.UserService;
import com.ssafy.antenna.util.ValidationRegex;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/users")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;
    private final ValidationRegex validationRegex;

    @GetMapping("/{userId}")
    public ResultResponse<UserDetailRes> getUser(@PathVariable Long userId) throws AbstractAppException {
        if (userId < 1) {throw new BadConstantException();}
        return ResultResponse.success(userService.getUser(userId).toResponse());
    }


    @DeleteMapping
    public ResultResponse<UserDetailRes> deleteUser(Authentication authentication) throws Exception {
        return ResultResponse.success(userService.deleteUser(Long.valueOf(authentication.getName())).toResponse());
    }

    @PutMapping("/password")
    public ResultResponse<UserDetailRes> modifyPwdUser(
            @RequestBody @Valid ModifyPwdUserReq modifyPwdUserReq,
            Authentication authentication
    ) throws Exception {
        return ResultResponse.success(userService.modifyPwdUser(Long.valueOf(authentication.getName()), modifyPwdUserReq).toResponse());
    }

    @PutMapping("/password/reset")
    public ResultResponse<AuthEmailRes> resetPwdUser(
            @RequestBody @Valid ResetPwdUserReq resetPwdUserReq
    ) throws Exception {
        return ResultResponse.success(userService.resetPwdUser(resetPwdUserReq));
    }

    /*팔로잉의 뜻
    follow + ing 의 형태로 팔로우를 하고 있는 상태를 말합니다.
    팔로우 중이라는 뜻으로 내가 이미 이 계정을 팔로우하고 있다, 글 받아보기를 하고 있는 것입니다.
    이때 내가 팔로우 한 사람/계정이 A 라고 하면, 나는 A를 팔로잉 하고 있고, 나는 A의 팔로워가 됩니다. */
    @PostMapping("/followings")
    public ResultResponse<FollowDetailRes> createFollowUser(
            @RequestBody @Valid CreateFollowUserReq createFollowUserReq,
            Authentication authentication
    ) throws Exception {
        return ResultResponse.success(userService.createFollowUser(Long.valueOf(authentication.getName()), createFollowUserReq));
    }

    @GetMapping("/followings/{userId}")
    public ResultResponse<List<GetFollowRes>> getFollowingUser(@PathVariable Long userId) throws Exception {
        if (userId < 1) {throw new BadConstantException();}
        return ResultResponse.success(userService.getFollowingUser(userId));
    }

    @GetMapping("/followers/{userId}")
    public ResultResponse<List<GetFollowRes>> getFollowerUser(@PathVariable Long userId) throws Exception {
        if (userId < 1) {throw new BadConstantException();}
        return ResultResponse.success(userService.getFollowerUser(userId));
    }

    @DeleteMapping("/followers/{followId}")
    public ResultResponse<FollowDetailRes> deleteFollowingUser(Authentication authentication, @PathVariable Long followId) throws Exception {
        if (followId < 1) {throw new BadConstantException();}
        return ResultResponse.success(userService.deleteFollowingUser(Long.valueOf(authentication.getName()), followId).toResponse());
    }

    @GetMapping("/check-email")
    public ResultResponse<?> checkEmailUser(@RequestParam String email) throws Exception {
        if (!validationRegex.isRegexEmail(email)) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.EMAIL_INVALID));
        }
        return ResultResponse.success(userService.checkEmailUser(email));
    }

    @GetMapping("/check-nickname")
    public ResultResponse<?> checkNicknameUser(@RequestParam String nickname) throws Exception {
        if (nickname.length() < 1 || nickname.length() > 8) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.NICKNAME_INVALID));
        }
        return ResultResponse.success(userService.checkNicknameUser(nickname));
    }

    @GetMapping("/search")
    public ResultResponse<?> likeNicknameUser(@RequestParam String nickname) throws Exception {
        return ResultResponse.success(userService.likeNicknameUser(nickname));
    }

    @PutMapping("/profile")
    public ResultResponse<UserDetailRes> modifyProfileUser(
            @RequestBody @Valid ModifyProfileUserReq modifyProfileUserReq,
            Authentication authentication
    ) throws Exception {
        return ResultResponse.success(userService.modifyProfileUser(modifyProfileUserReq.introduce(), Long.valueOf(authentication.getName())));
    }

    @PutMapping("/photo")
    public ResultResponse<UserDetailRes> modifyProfilePhoto(
            @RequestParam MultipartFile photo,
            Authentication authentication
    ) {
        return ResultResponse.success(userService.modifyProfilePhoto(photo, Long.valueOf(authentication.getName())).toResponse());
    }

    @DeleteMapping("/photo")
    public ResultResponse<UserDetailRes> deleteProfilePhoto(Authentication authentication) {
        return ResultResponse.success(userService.deleteProfilePhoto(Long.valueOf(authentication.getName())).toResponse());
    }

//    @GetMapping("/{userId}/feats")
//    public ResultResponse<List<UserFeatsDto>> getUserFeats(@PathVariable Long userId) {
//        return userService.getUserFeats(userId);
//    }

    @PostMapping("/antennae")
    public ResultResponse<DetailAntennaRes> createAntenna(
            @RequestBody @Valid PostAntennaReq postAntennaReq,
            Authentication authentication
    ) {
        return ResultResponse.success(userService.createAntenna(postAntennaReq, Long.valueOf(authentication.getName())));
    }

    @DeleteMapping("/antennae/{antennaId}")
    public ResultResponse<DetailAntennaRes> deleteAntenna(
            Authentication authentication,
            @PathVariable Long antennaId
    ) {
        if (antennaId < 1) {throw new BadConstantException();}
        return ResultResponse.success(userService.deleteAntenna(antennaId, Long.valueOf(authentication.getName())));
    }

    @GetMapping("/antennae")
    public ResultResponse<List<DetailAntennaRes>> getAllAntennae(Authentication authentication) {
        return ResultResponse.success(userService.getAllAntennae(Long.valueOf(authentication.getName())));
    }

    @GetMapping("/antennae/{antennaId}")
    public ResultResponse<?> getAntenna(Authentication authentication, @PathVariable Long antennaId) {
        if (antennaId < 1) {
            return ResultResponse.error(ErrorResponse.of(ErrorCode.BAD_CONSTANT));
        }
        return ResultResponse.success(userService.getAntenna(antennaId, Long.valueOf(authentication.getName())));
    }

    @GetMapping("/logout")
    public ResultResponse<String> logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResultResponse.success("true");
    }


}
