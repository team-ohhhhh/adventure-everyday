import React, { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import { EmailComponent, PasswordComponent, NicknameComponent, IntroduceComponent, PhotoComponent, SignUpCompletedComponent } from "../components/SignUp/ComponentsForSignUp";


function SignUpPage() {
  let URL = useSelector((state) => state.URL)

  // 로그인 단계 저장용 변수
  // 0 : 메인, 1: 이메일 선택 창, 2: 비밀번호 입력 창, 3: 닉네임 입력창, 4: 소개글 입력 창, 5: 프로필 사진 업로드 창, 6: 완료 창
  const [stage, setStage] = useState(2)

  // 로그인에 필요한 정보들
  const [email, setEmail] = useState("jh8671@naver.com")
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
      "Content-type": "multipart/form-date",
    },
    })
    .then(function (response) {
      console.log(response)
    })
    .then(setStage(stage + 1))
    .catch((error) => console.log(error))
  }
  // 스테이지 별 컴포넌트 변경
  switch (stage) {
    case 0:
      return (
        <div>
          <button className="signUpButton" onClick={ () => {setStage(stage+1)}}>이메일로 회원가입</button>
        </div>
      )
      case 1:
        return (
          <EmailComponent setEmail={setEmail} email={email} setStage={setStage} stage={stage}/>
        )
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

export default SignUpPage