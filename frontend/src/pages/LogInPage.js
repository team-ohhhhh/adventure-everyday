import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { saveToken } from "../store/tokenSlice";
import { useNavigate } from "react-router-dom"
import style from "./LogInPage.module.css"

// 로그인 페이지
function LoginPage() {
  let URL = useSelector((state) => state.url)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  const LogIn = function () {
    axios({
      url : URL + '/auth/authenticate',
      method: 'post',
      data: {
        email,
        password
      }
    })
    .then((response) => {
      //TODO: 여기서 토큰 저장하시오
      dispatch(saveToken(response.data.result.token))
      console.log(response.data)
      navigate('/')
    })
  }

  return(
    <div className={style.logInPage}>
      <div className={style.logInContainer}>
        {/* 로고 이미지네.. */}
        <div className={style.logInTitleHolder}>
          <h1>adventure</h1>
          <h1>everyday</h1>
        </div>
        <input className={style.logInInput} id="email" placeholder="이메일을 입력하세요" onChange={(event) => { setEmail(event.target.value) }}></input>
        <input className={style.logInInput} placeholder="비밀번호을 입력하세요" type={ "password" } id="password" onChange={(event) => { setPassword(event.target.value) }}></input>
        <button className={style.logInButton} onClick={ () => { LogIn() } } >로그인</button>
        <div>아직 회원이 아니신가요? <span onClick={() => {navigate('/signup')}} style={{color:"#1C0B69", fontWeight:"bold"}}>회원가입</span></div>
      </div>
    </div>
  )


}

export default LoginPage