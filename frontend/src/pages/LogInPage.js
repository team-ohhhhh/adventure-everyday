import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"

function LoginPage() {
  let URL = useSelector((state) => state.URL)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const LogIn = function () {
    axios({
      url : URL + '/users/log-in',
      method: 'post',
      data: {
        email,
        password
      }
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