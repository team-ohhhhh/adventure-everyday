import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"

// 1. 이메일 인증 화면
function EmailComponent(props) {
  let URL = useSelector((state) => state.URL)

  // 메일 보낸 다음 코드 입력 화면을 띄우기 위한 스위치
  const [isSent, setIsSent] = useState(false)

  // 입력받은 코드 저장
  const [code, setCode] = useState('')

  // 이메일 보내기 위한 axios -> 전송 성공시 isSent를 True로 
  const sendEmail = function() {
    axios({
      url : URL + '/email',
      method: 'get',
      params: {
        email: props.email
      }
    })
    .then(function() {
      setIsSent(true)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  // 입력한 코드가 맞는지 확인하는 axios -> 확인되면 다음 화면으로
  const validate = function() {
    axios({
      url : URL + '/email/auth',
      method : 'POST',
      data : {
        email : props.email,
        auth : code
      }
    })
    .then((response) => {
      if (response.data) {
        props.setStage(props.stage + 1)
      }
      else {
        alert('인증코드가 틀렸습니다')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return(
    <div>
      <label htmlFor="email">이메일</label>
      <input id="email" onChange={(event) => { props.setEmail(event.target.value) }}></input>
      <button onClick={ () => {sendEmail()} }>이메일로 코드 전송</button>

      <label htmlFor="code">코드를 입력하세요</label>
      <input id="code" onChange={(event) => { setCode(event.target.value) }}></input>
      <button onClick={ () => {validate()}  }>확인</button>

      <button onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
    </div>
  )
}

// 2. 비밀번호 입력

function PasswordComponent(props) {
  let URL = useSelector((state) => state.URL)

  return (
    <div>
      <label htmlFor="password">비밀번호</label>
      <input type={ "password" } id="password" onChange={(event) => { props.setPassword(event.target.value) }}></input>
      <label htmlFor="password2">비밀번호 확인</label>
      <input type={ "password" } id="password2" onChange={(event) => { props.setPassword2(event.target.value) }}></input>
      { props.password == props.password2 && <button onClick={() => { props.setStage(props.stage + 1)}}>다음</button>}
    </div>

  )
}

function NicknameComponent(props) {
  return (
    <div>
      <label htmlFor="nickname">비밀번호</label>
      <input id="nickname" onChange={(event) => { props.setNickname(event.target.value) }}></input>
      <button onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
      { props.nickname.length >= 2 && <button onClick={() => { props.setStage(props.stage + 1)}}>다음</button>}
    </div>
  )
}

export { EmailComponent, PasswordComponent, NicknameComponent }