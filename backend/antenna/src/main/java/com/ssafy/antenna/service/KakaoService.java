package com.ssafy.antenna.service;

import com.ssafy.antenna.domain.user.Role;
import com.ssafy.antenna.domain.user.User;
import com.ssafy.antenna.domain.user.dto.LogInUserReq;
import com.ssafy.antenna.domain.user.dto.LogInUserRes;
import com.ssafy.antenna.domain.user.dto.PostUserReq;
import com.ssafy.antenna.exception.not_found.EmailEmptyException;
import com.ssafy.antenna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KakaoService {
    @Value("${kakao.rest-token}")
    String kakaoToken;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    public String kakaoConnect() {
        String codeUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoToken
                +"&redirect_uri=http://localhost:8080/api/v1/auth/kakao/callback&response_type=code";
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
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+kakaoToken);
            sb.append("&redirect_uri=http://localhost:8080/api/v1/auth/kakao/callback");
            sb.append("&code=" + code);

            bw.write(sb.toString());
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


    public LogInUserRes getUserInfo(String access_token) {
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
            while((line=br.readLine())!=null)
            {
                res+=line;
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
            if(kakao_account.get("email")==null){
                throw new EmailEmptyException();
            }
            //이메일이 이미 있을경우 -> 회원이므로 로그인 처리
            Optional<User> user = userRepository.findByEmail(email);
            if(user.isPresent()){
                //로그인 처리
                String jwtToken = jwtService.generateToken(user.get());
                logInUserRes = new LogInUserRes(jwtToken, user.get().toResponse());
            }else{
                //회원가입 후 로그인 처리
                User newUser = User.builder()
                        .email(email)
                        .nickname(nickname+id)
                        .password(UUID.randomUUID().toString().concat(email))
                        .level(1)
                        .introduce(null)
                        .photoUrl(photo)
                        .role(Role.USER)
                        .build();
                userRepository.save(newUser);
                String jwtToken = jwtService.generateToken(newUser);
                logInUserRes = new LogInUserRes(jwtToken,newUser.toResponse());
            }


        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return logInUserRes;
    }

}
