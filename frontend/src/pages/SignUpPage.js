import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"

function SignUpPage() {
  let URL = useSelector((state) => state.URL)
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [introduce, setIntroduce] = useState("")
  const [photo, setPhoto] = useState("")
  const signUp = function () {
    axios({
      url : URL + '/users',
      method: 'post',
      data: {
        email,
        nickname,
        password,
        introduce,
        photo,
      }
    })
  }

  return(
    <div>
      <label htmlFor="email">이메일</label>
      <input id="email" onChange={(event) => { setEmail(event.target.value) }}></input>
      
      <label htmlFor="nickName">닉네임</label>
      <input id="nickName" onChange={(event) => { setNickname(event.target.value) }}></input>

      <label htmlFor="password">비밀번호</label>
      <input type={ "password" } id="password" onChange={(event) => { setPassword(event.target.value) }}></input>

      <label htmlFor="introduce">자기소개</label>
      <textarea id="introduce" onChange={(event) => { setIntroduce(event.target.value) }}></textarea>
      
      <label htmlFor="photo">프로필 사진</label>
      <input type={ "file" } accept={ "image/*" } id="photo" onChange={(event) => { setPhoto(event.target.value) }}></input>

      
      <button onClick={ () => { signUp() } }>회원가입</button>

    </div>
  )


}

export default SignUpPage