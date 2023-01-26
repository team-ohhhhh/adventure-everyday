import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// 로그인 페이지
function LoginPage() {
  let URL = useSelector((state) => state.URL)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const navigate = useNavigate()

  // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  const LogIn = function () {
    axios({
      url : URL + '/users/log-in',
      method: 'post',
      data: {
        email,
        password
      }
    })
    .then((response) => {
      //TODO: 여기서 토큰 저장하시오
      navigate('/')
    })
  }

  return(
    <div>
      <label htmlFor="email">이메일</label>
      <input id="email" onChange={(event) => { setEmail(event.target.value) }}></input>
      <label htmlFor="password">비밀번호</label>
      <input type={ "password" } id="password" onChange={(event) => { setPassword(event.target.value) }}></input>
      <button onClick={ () => { LogIn() } }>로그인</button>
    </div>
  )


}

export default LoginPage