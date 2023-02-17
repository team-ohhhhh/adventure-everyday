import React, { useRef, useState } from "react";
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

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  const LogIn = function () {
    if (email < 1) {
      alert("이메일을 입력해주세요.");
      emailRef.current.focus();
      return;
    }
    if (password < 1) {
      alert("비밀번호를 입력해주세요.");
      passwordRef.current.focus();
      return;
    }

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
        navigate("/map");
      })
      .catch((error) => {
        // console.log(error.response.data.result.message);
        // const msg = error.response.data.result.message;
        alert("아이디 또는 비밀번호를 확인해주세요.");
      });
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
    <div className="pageContainer">
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
              <div className={style.move}>
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
                ref={emailRef}
              ></input>
              <input
                className={style.logInInput}
                placeholder="비밀번호을 입력하세요"
                type={"password"}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={onKeyDown}
                ref={passwordRef}
              ></input>
              <button className={style.logInButton} onClick={() => LogIn()}>
                로그인
              </button>
              <div className={style.move} onClick={() => setIsLogin(false)}>
                이전으로
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
