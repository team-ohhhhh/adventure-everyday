import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import style from "./ComponentsForSignUp.module.css"



// 1. 이메일 인증 화면
function EmailComponent(props) {
  let URL = useSelector((state) => state.url)

  // 메일 보낸 다음 코드 입력 화면을 띄우기 위한 스위치
  const [isSent, setIsSent] = useState(false)

  // 입력받은 코드 저장
  const [code, setCode] = useState('')

  // 이메일 보내기 위한 axios -> 전송 성공시 isSent를 True로 
  const sendEmail = function() {
    axios({
      url : URL + '/email/send',
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
      method : 'post',
      data : {
        email : props.email,
        auth : code
      }
      
    })
    .then((response) => {
      if (response.data) {
        console.log(props.stage)
        props.setStage(props.stage + 1)
      }
      else {
        // TODO: validation 통과못하면 스테이트 바꿔서 메세지를 html로 띄우자
        alert('인증코드가 틀렸습니다')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return(
    <div>
      <div className="titleHolder">
        <h1>사용할 이메일을</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        <input className={style.signUpInput} onChange={(event) => { props.setEmail(event.target.value) }} placeholder="이메일"></input>
        {/* TODO: 여기에 이메일 형식 validation!!! */}
        <button   onClick={ () => {sendEmail()} } className={style.signUpButton}>인증 요청</button>
      </div>             
      { isSent ? 
      <div>
        <div className={style.inputAndButton}>
          {/* TODO: 여기에 인증코드 validation!!! */}
          <input className={style.signUpInput} onChange={(event) => { setCode(event.target.value) }} placeholder="인증 코드"></input>
          <button onClick={ () => {validate()}} className={style.signUpButton}>확인</button>
        </div>
      </div> : null
      }
    </div>
  )
}

// 2. 비밀번호 입력

function PasswordComponent(props) {

  return (
    <div>
      <div className={style.titleHolder}>
        <h1>비밀번호를</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        <input className={style.signUpInput} type={ "password" } id="password" onChange={(event) => { props.setPassword(event.target.value) }} placeholder="비밀번호"></input>
        <input className={style.signUpInput} type={ "password" } id="password2" onChange={(event) => { props.setPassword2(event.target.value) }} placeholder="비밀번호 확인"></input>
        <div className={style.buttonBox}>
          <button onClick={() => { props.setStage(props.stage - 1)}} className={style.signUpButton}>이전</button>
          {/* TODO: 여기에 비밀번호 형식 validation!!! */}
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage + 1)}}>다음</button>
        </div>
      </div>
    </div>

  )
}

function NicknameComponent(props) {
  return (
    <div>
      <div className={style.titleHolder}>
        <h1>닉네임을</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        <input className={style.signUpInput} onChange={(event) => { props.setNickname(event.target.value) }} placeholder="닉네임"></input>
        <div className={style.buttonBox}>
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
          {/* TODO: 여기에 닉네임 형식 validation!!! */}
          <button onClick={() => { props.setStage(props.stage + 1)}} className={style.signUpButton}>다음</button>
        </div>
      </div>
    </div>
  )
}

function IntroduceComponent(props) {
  return (
    <div>
      <div className={style.titleHolder}>
        <h1>소개글을</h1>
        <h1>입력해주세요<h1 style={{display:"inline", color:"#1C0B69"}}>(선택)</h1></h1>
      </div>
      <div className={style.inputAndButton}>
        <input className={style.signUpInput} style={{height:"100px", borderRadius:"29px"}} onChange={(event) => { props.setIntroduce(event.target.value) }} placeholder="소개글"></input>
        <div className={style.buttonBox}>
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage + 1)}}>다음</button>
        </div>
      </div>
    </div>
  )
}

function PhotoComponent(props) {
  
  const savePhoto = () => {
    const file = props.imgRef.current.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      props.setPhoto(reader.result)
    }
    if (file) {
      props.setFile(file)
    }

  }
  return (
    <div>
      <div className={style.titleHolder}>
        <h1>프로필 사진을</h1>
        <h1>등록해주세요<h1 style={{display:"inline", color:"#1C0B69"}}>(선택)</h1></h1>
      </div>
        <label htmlFor="photo" className={style.signUpPhotoLabel}>
          <div className={style.signUpPhotoContiner}>
            <img
            src={props.photo ? props.photo : `defaultProfile.jpg`}
            className={style.signUpPhoto}
            ></img>
          </div>
        </label>
        <input 
        id="photo" 
        type="file"
        accept={ "image/*" } 
        onChange={savePhoto}
        ref={props.imgRef}
        style={{display:"none"}}
        ></input>
      <div className={style.inputAndButton}>
        <div className={style.buttonBox}>
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
          <button className={style.signUpButton} onClick={() => { props.signUp() }}>가입</button>
        </div>
      </div>
    </div>
  )
}

  function SignUpCompletedComponent() {
    const navigate = useNavigate()
        useEffect(() => {
          setTimeout(() => {
          navigate('/login')
          }, 3000)
        }, [])
        // 여기 자꾸 워닝 뜸.. React Hook useEffect has a missing dependency: 'navigate'. Either include it or remove the dependency array
    return (
      <div>
        <div className={style.titleHolder} style={{color:"#1C0B69"}}>
          <h1>가입이</h1>
          <h1>완료되었습니다</h1>
        </div>
        {/* gif 자리 */}
      </div>
    )
  }


export { EmailComponent, PasswordComponent, NicknameComponent, IntroduceComponent, PhotoComponent, SignUpCompletedComponent }