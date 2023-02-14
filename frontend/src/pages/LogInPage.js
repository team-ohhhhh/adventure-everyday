import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { saveToken } from "../store/tokenSlice";
import { saveUserInfo } from "../store/userSlice";

import style from "./LogInPage.module.css";

// 로그인 페이지
function LoginPage() {
  let URL = useSelector((state) => state.url);

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  const LogIn = function () {
    axios({
      url: URL + "/auth/authenticate",
      method: "post",
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        dispatch(saveToken(response.data.result.token));
        dispatch(saveUserInfo(response.data.result.userDetailRes));
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      LogIn();
    }
  };

  const KakaoLogIn = function () {
    axios({
      url: URL + "/auth/kakao/oauth",
      method: "get",
    })
      .then((response) => {
        window.open(response.data, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`pageContainer ${style.bgColor}`}>
      <div className={style.imgContainer}>
        <img
          className={style.img}
          src="images/loginBackground.gif"
          alt="login_background_image"
        />
        <div className={style.logo}>
          adventure
          <br />
          everyday
        </div>
      </div>

      <div className={style.outsideContainer}>
        <div className={style.loginContainer}>
          {!isLogin && (
            <>
              <button
                className={style.logInButton}
                onClick={() => setIsLogin(true)}
              >
                이메일으로 로그인
              </button>
              <button
                className={`${style.logInButton} ${style.logInKakaoButton}`}
                onClick={() => KakaoLogIn()}
              >
                카카오로 로그인
              </button>
              <div>
                아직 회원이 아니신가요?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className={style.signup}
                >
                  회원가입
                </span>
              </div>
            </>
          )}

          {isLogin && (
            <>
              <input
                className={style.logInInput}
                id="email"
                placeholder="이메일을 입력하세요"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
              <input
                className={style.logInInput}
                placeholder="비밀번호을 입력하세요"
                type={"password"}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={onKeyDown}
              ></input>
              <button className={style.logInButton} onClick={() => LogIn()}>
                로그인
              </button>
              <span onClick={() => setIsLogin(false)}>이전으로</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
