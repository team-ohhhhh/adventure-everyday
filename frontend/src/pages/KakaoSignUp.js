import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { saveToken } from "../store/tokenSlice";
import { saveUserInfo } from "../store/userSlice";
import { useNavigate,Link, useParams } from "react-router-dom"
import style from "./KakaoSignUp.module.css"
import queryString from 'query-string';
import { EmailComponent, PasswordComponent, NicknameComponent, IntroduceComponent, PhotoComponent, SignUpCompletedComponent } from "../components/SignUp/ComponentsForSignUp";


// 로그인 페이지
function KakaoSignUp() {

    // console.log(window.location.search)
  let qs = queryString.parse(window.location.search)

  
    let URL = useSelector((state) => state.url);
  
    // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  

    const KakaoSignUp = function () {
        axios({
          url: URL + `/auth/kakao/callback?code=${qs.code}&action=signup`,
          method: "get"
        }).then((response) => {
          //TODO: 여기서 이메일 저장
          // console.log(response.data.result)
          setEmail(response.data.result.email)
        }).catch((error) => console.log(error))
      }

      useEffect(()=>{
        KakaoSignUp()
      }, [])

  // 로그인 단계 저장용 변수
  // 0 : 메인, 1: 이메일 선택 창, 2: 비밀번호 입력 창, 3: 닉네임 입력창, 4: 소개글 입력 창, 5: 프로필 사진 업로드 창, 6: 완료 창
  const [stage, setStage] = useState(2)

  // 로그인에 필요한 정보들
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [introduce, setIntroduce] = useState("")
  const [photo, setPhoto] = useState("")
  const [file, setFile] = useState("")

  const imgRef = useRef()
  

  // 회원가입 axios
  const signUp = function () {
    const formData = new FormData()
    formData.append("email", email)
    formData.append("nickname", nickname)
    formData.append("password", password)
    formData.append("introduce", introduce)
    formData.append("file", file)
    axios.post(URL + "/auth/register", formData, {
      headers: {
      "Content-type": "multipart/form-data",// date로 되어있는데 왜 됐지...
    },
    })
    .then(function (response) {
      // console.log(response)
    })
    .then(setStage(stage + 1))
    .catch((error) => console.log(error))
  }
  // 스테이지 별 컴포넌트 변경
  switch (stage) {
      case 2:
        return (
          <PasswordComponent setPassword={setPassword} setPassword2={setPassword2} stage={stage} setStage={setStage} password={password} password2={password2}/>
        )
      case 3:
        return (
          <NicknameComponent setNickname={setNickname} setStage={setStage} stage={stage} nickname={nickname}/>
        )
      case 4:
        return (
          <IntroduceComponent setStage={setStage} stage={stage} setIntroduce={setIntroduce}/>
        )
      case 5:
        return (
          <PhotoComponent setFile={setFile} signUp={signUp} imgRef={imgRef} setStage={setStage} stage={stage} setPhoto={setPhoto} photo={photo}/>
        )
      case 6:
        return (
          <SignUpCompletedComponent/>
        )
    }
  }
  
  export default KakaoSignUp;