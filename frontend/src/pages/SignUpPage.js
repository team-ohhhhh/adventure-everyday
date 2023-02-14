import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  EmailComponent,
  PasswordComponent,
  NicknameComponent,
  IntroduceComponent,
  PhotoComponent,
  SignUpCompletedComponent,
} from "../components/SignUp/ComponentsForSignUp";

import style from "./LogInPage.module.css";

function SignUpPage() {
  const navigate = useNavigate();

  let URL = useSelector((state) => state.url);

  // 로그인 단계 저장용 변수
  // 0 : 메인, 1: 이메일 선택 창, 2: 비밀번호 입력 창, 3: 닉네임 입력창, 4: 소개글 입력 창, 5: 프로필 사진 업로드 창, 6: 완료 창
  const [stage, setStage] = useState(0);

  // 로그인에 필요한 정보들
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [photo, setPhoto] = useState("");
  const [file, setFile] = useState("");

  const imgRef = useRef();

  // 회원가입 axios
  const signUp = function () {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("nickname", nickname);
    formData.append("password", password);
    formData.append("introduce", introduce);
    formData.append("file", file);
    axios
      .post(URL + "/auth/register", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      // .then(function (response) {
      //   console.log(response);
      // })
      .then(setStage(stage + 1))
      .catch((error) => console.log(error));
  };

  //카카오 회원가입 axios
  const KakaoSignUpAuth = function () {
    axios({
      url: URL + "/auth/kakao/oauth/signup",
      method: "get",
    }).then((response) => {
      window.location.href = response.data;
    });
  };

  // 스테이지 별 컴포넌트 변경
  switch (stage) {
    case 0:
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
              <button
                className={style.logInButton}
                onClick={() => setStage(stage + 1)}
              >
                이메일으로 회원가입
              </button>
              <button
                className={`${style.logInButton} ${style.logInKakaoButton}`}
                onClick={() => KakaoSignUpAuth()}
              >
                카카오로 회원가입
              </button>
              <div className={style.move} onClick={() => navigate("/login")}>
                로그인 화면으로 이동
              </div>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <EmailComponent
          setEmail={setEmail}
          email={email}
          setStage={setStage}
          stage={stage}
        />
      );
    case 2:
      return (
        <PasswordComponent
          setPassword={setPassword}
          setPassword2={setPassword2}
          stage={stage}
          setStage={setStage}
          password={password}
          password2={password2}
        />
      );
    case 3:
      return (
        <NicknameComponent
          setNickname={setNickname}
          setStage={setStage}
          stage={stage}
          nickname={nickname}
        />
      );
    case 4:
      return (
        <IntroduceComponent
          setStage={setStage}
          stage={stage}
          setIntroduce={setIntroduce}
        />
      );
    case 5:
      return (
        <PhotoComponent
          setFile={setFile}
          signUp={signUp}
          imgRef={imgRef}
          setStage={setStage}
          stage={stage}
          setPhoto={setPhoto}
          photo={photo}
        />
      );
    case 6:
      return <SignUpCompletedComponent />;
    default:
      return <></>;
  }
}

export default SignUpPage;
