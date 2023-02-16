package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.EmailUserRes;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.exception.conflict.DuplicateEmailException;
import com.ssafy.antenna.exception.not_found.EmailEmptyException;
import com.ssafy.antenna.exception.not_found.UserNotFoundException;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KakaoService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    @Value("${kakao.rest-token}")
    String kakaoToken;

    public String kakaoConnect() {
//        String codeUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoToken
//                + "&redirect_uri=http://localhost:3000/kakao/callback&response_type=code";
        String codeUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoToken
                + "&redirect_uri=https://i8a305.p.ssafy.io/kakao/callback&response_type=code";
        return codeUrl;
    }

    public String kakaoSignUpConnect() {
//        String codeUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoToken
//                + "&redirect_uri=http://localhost:3000/kakao/callback/signup&response_type=code";
        String codeUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoToken
                + "&redirect_uri=https://i8a305.p.ssafy.io/kakao/callback/signup&response_type=code";
        return codeUrl;
    }

    public String getToken(String code) throws IOException {
        // 인가코드로 토큰받기
        String host = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(host);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String token = "";
        try {
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            String sb = "grant_type=authorization_code" +
                    "&client_id=" + kakaoToken +
//            sb.append("&redirect_uri=http://localhost:3000/kakao/callback");
                    "&redirect_uri=https://i8a305.p.ssafy.io/kakao/callback" +
                    "&code=" + code;

            bw.write(sb);
            bw.flush();

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            // json parsing
            JSONParser parser = new JSONParser();
            JSONObject elem = (JSONObject) parser.parse(result);

            String access_token = elem.get("access_token").toString();
            String refresh_token = elem.get("refresh_token").toString();
            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            token = access_token;

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }


        return token;
    }

    public String getTokenSignUp(String code) throws IOException {
        // 인가코드로 토큰받기
        String host = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(host);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String token = "";
        try {
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            String sb = "grant_type=authorization_code" +
                    "&client_id=" + kakaoToken +
//            sb.append("&redirect_uri=http://localhost:3000/kakao/callback/signup");
                    "&redirect_uri=https://i8a305.p.ssafy.io/kakao/callback/signup" +
                    "&code=" + code;

            bw.write(sb);
            bw.flush();

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            // json parsing
            JSONParser parser = new JSONParser();
            JSONObject elem = (JSONObject) parser.parse(result);

            String access_token = elem.get("access_token").toString();
            String refresh_token = elem.get("refresh_token").toString();
            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            token = access_token;

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }


        return token;
    }


    public LogInUserRes getUserInfoForLogin(String access_token) {
        String host = "https://kapi.kakao.com/v2/user/me";
        LogInUserRes logInUserRes = null;
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);


            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }

            System.out.println("res = " + res);


            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
            JSONObject properties = (JSONObject) obj.get("properties");

            String id = obj.get("id").toString();
            String photo = properties.get("profile_image").toString();
            String nickname = properties.get("nickname").toString();
            String email = kakao_account.get("email").toString();
            if (kakao_account.get("email") == null) {
                throw new EmailEmptyException();
            }
            //이메일이 이미 있을경우 -> 회원이므로 로그인 처리
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                //로그인 처리
                user.get().setRefreshToken(jwtService.generateRefreshToken());
                userRepository.save(user.get());
                String jwtToken = jwtService.generateToken(user.get());
                logInUserRes = new LogInUserRes(jwtToken, user.get().getRefreshToken(), user.get().toResponse());
            } else {
                throw new UserNotFoundException();
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return logInUserRes;
    }

    public EmailUserRes getUserInfoForSign(String access_token) {
        String host = "https://kapi.kakao.com/v2/user/me";
        LogInUserRes logInUserRes = null;
        String email = null;
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);


            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }

            System.out.println("res = " + res);


            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
            email = kakao_account.get("email").toString();
            if (kakao_account.get("email") == null) {
                throw new EmailEmptyException();
            }
            //이메일이 이미 있을경우 -> 회원이므로 로그인 처리
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                throw new DuplicateEmailException();
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return new EmailUserRes(email);
    }

}
