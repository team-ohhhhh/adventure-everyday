package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.CheckTokenRes;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.exception.conflict.DuplicateEmailException;
import com.ssafy.antenna.exception.not_found.UserNotFoundException;
import com.ssafy.antenna.exception.unauthorized.ExpiredRefreshTokenException;
import com.ssafy.antenna.exception.unauthorized.InvalidRefreshTokenException;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AwsS3Service awsS3Service;
    private final AuthenticationManager authenticationManager;
    @Value("${kakao.rest-token}")
    String kakaoToken;
    @Value("${aws-cloud.aws.s3.bucket.url}")
    private String bucketUrl;

    public LogInUserRes registerUser(PostUserReq postUserReq, MultipartFile photo) {
        if (userRepository.findByEmail(postUserReq.email()).isPresent()) {
            throw new DuplicateEmailException();
        }
        String refreshToken = jwtService.generateRefreshToken();
        User user = User.builder()
                .email(postUserReq.email())
                .nickname(postUserReq.nickname())
                .password(passwordEncoder.encode(postUserReq.password()))
                .refreshToken(refreshToken)
                .level(1)
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
                    .refreshToken(refreshToken)
                    .level(1)
                    .introduce((postUserReq.introduce() != null) ? postUserReq.introduce() : null)
                    .role(Role.USER)
                    .build();
        }


        userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        System.out.println();
        return new LogInUserRes(jwtToken, refreshToken, user.toResponse());
    }

    public LogInUserRes authenticate(LogInUserReq logInUserReq) {
        User user = userRepository.findByEmail(logInUserReq.email())
                .orElseThrow(UserNotFoundException::new);
        user.setRefreshToken(jwtService.generateRefreshToken());
        userRepository.save(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserId(),
                        logInUserReq.password()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtService.generateToken(user);
        return new LogInUserRes(jwtToken, user.getRefreshToken(), user.toResponse());
    }

    public CheckTokenRes checkToken(Long userId, String refreshToken) {
        //유저가 존재하는지 확인
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        //유저가 존재하면, 리프레시 토큰 비교
        if (!refreshToken.equals(user.getRefreshToken()))
            throw new InvalidRefreshTokenException();
        //리프레시 토큰이 일치하면, 유효기간 남았는지 체크
        //토큰이 만료됐으면
        if (jwtService.isTokenExpired(refreshToken))
            throw new ExpiredRefreshTokenException();
        else {
            //토큰이 만료되지 않았으면, 토큰을 새로 생성해서 리프레시 토큰이랑 넣어준다.
            String jwtToken = jwtService.generateToken(user);
            return new CheckTokenRes(jwtToken, refreshToken);
        }
    }

}
