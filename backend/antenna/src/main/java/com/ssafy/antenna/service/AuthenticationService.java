package com.ssafy.antenna.service;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.config.JwtService;
import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ssafy.antenna.domain.user.User;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public LogInUserRes register(PostUserReq postUserReq) {
        var user = User.builder()
                .email(postUserReq.email())
                .nickname(postUserReq.nickname())
                .password(passwordEncoder.encode(postUserReq.password()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken);
    }

    public LogInUserRes authenticate(LogInUserReq logInUserReq) {
        var user = userRepository.findByEmail(logInUserReq.email())
                .orElseThrow();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserId(),
                        logInUserReq.password()
                )
        );
        var jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken);
    }
}
