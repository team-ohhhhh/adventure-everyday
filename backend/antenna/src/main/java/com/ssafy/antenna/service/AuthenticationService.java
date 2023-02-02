package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AwsS3Service awsS3Service;
    private final AuthenticationManager authenticationManager;
    @Value("${aws-cloud.aws.s3.bucket.url}")
    private String bucketUrl;

    public LogInUserRes registerUser(PostUserReq postUserReq, MultipartFile photo) throws IOException {
        User user = User.builder()
                .email(postUserReq.email())
                .nickname(postUserReq.nickname())
                .password(passwordEncoder.encode(postUserReq.password()))
                .introduce((postUserReq.introduce() != null) ? postUserReq.introduce() : null)
                .role(Role.USER)
                .build();
        if (photo != null) {
            String photoName = awsS3Service.uploadImage(photo);
            String photoUrl = bucketUrl + photoName;
            user = User.builder()
                    .email(postUserReq.email())
                    .nickname(postUserReq.nickname())
                    .password(passwordEncoder.encode(postUserReq.password()))
                    .photoUrl(photoUrl)
                    .photoName(photoName)
                    .introduce((postUserReq.introduce() != null) ? postUserReq.introduce() : null)
                    .role(Role.USER)
                    .build();
        }


        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken, user.toResponse());
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
        return new LogInUserRes(jwtToken, user.toResponse());
    }
}
