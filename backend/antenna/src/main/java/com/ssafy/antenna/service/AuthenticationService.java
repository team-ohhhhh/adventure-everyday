package com.ssafy.antenna.service;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.repository.UserRepository;
import com.ssafy.antenna.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ssafy.antenna.domain.user.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ImageUtil imageUtil;
    public LogInUserRes register(PostUserReq postUserReq, MultipartFile photo) throws IOException {
        User user = User.builder()
                .email(postUserReq.email())
                .nickname(postUserReq.nickname())
                .password(passwordEncoder.encode(postUserReq.password()))
                .introduce(postUserReq.introduce())
                .photo(imageUtil.compressImage(photo.getBytes()))
                .photoType(String.valueOf(photo.getOriginalFilename()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken);
    }

    public LogInUserRes authenticate(LogInUserReq logInUserReq) {
        User user = userRepository.findByEmail(logInUserReq.email())
                .orElseThrow();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserId(),
                        logInUserReq.password()
                )
        );
        String jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken);
    }
}
