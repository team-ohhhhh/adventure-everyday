import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import style from "./ComponentsForSignUp.module.css"
import lottie from "lottie-web";


// 1. 이메일 인증 화면
function EmailComponent(props) {
  let URL = useSelector((state) => state.url)

  // 메일 중복일 경우에 false => 문구 띄우기
  const [isChecked, setIsChecked] = useState(true)

  // 메일 보낸 다음 코드 입력 화면을 띄우기 위한 스위치
  const [isSent, setIsSent] = useState(false)

  // 입력받은 코드 저장
  const [code, setCode] = useState('')

  // 로딩 중
  const [isLoading, setIsLoading] = useState(false)

  

  // 이메일 중복확인 먼저 => 통과되면 이메일 보내기 위한 axios -> 전송 성공시 isSent를 True로 
  // 실패시 문구 띄우기
  const sendEmail = function() {
    setIsLoading(true)
    axios({
      url : URL + '/users/check-email',
      method: 'get',
      params: {
        email: props.email
      }
    })
    .then((res) => {
      if (!res.data.result.result) {
        setIsChecked(true)
        console.log(res)
        axios({
          url : URL + '/email/send',
          method: 'get',
          params: {
            email: props.email
          }
        })
        .then(function() {
          setIsSent(true)
          setIsLoading(false)
        })
        .catch(function(err) {
          console.log(err)
        })
      } else {
        setIsChecked(false)
        setIsLoading(false)
      }

    })
  }


  const [isCodeCorrect, setIsCodeCorrect] = useState(true)
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
      if (response.data.result.result) {
        console.log(response)
        props.setStage(props.stage + 1)
      }
      else {
        setIsCodeCorrect(false)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  



  return(
    <div>
      <div className={style.titleHolder}>
        <h1>사용할 이메일을</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        {!isChecked && <div >이미 가입된 이메일입니다.</div>}  
        <input className={style.signUpInput} onChange={(event) => { props.setEmail(event.target.value) }} placeholder="이메일"></input>
        {/* TODO: 여기에 이메일 형식 validation!!! */}
        <button onClick={ () => {sendEmail()} } className={style.signUpButton}>인증 요청</button>
    
      </div>
      { isSent ? 
      <div>
        <div className={style.inputAndButton}>
          {/* TODO: 여기에 인증코드 validation!!! */}
          {!isCodeCorrect && <div>인증코드가 다릅니다.</div>} 
          <input className={style.signUpInput} onChange={(event) => { setCode(event.target.value) }} placeholder="인증 코드"></input>
          <button onClick={ () => {validate()}} className={style.signUpButton}>확인</button>
        </div>
      </div> : null}
      {isLoading ? <div>전송중</div> : null}
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
          <button className={style.hideButton}></button>
          {/* TODO: 여기에 비밀번호 형식 validation!!! */}
          {(props.password.length < 6 || props.password.length > 12) ? <div>비밀번호는 6~12자리!</div> : props.password === props.password2 ? <button className={style.signUpButton} onClick={() => { props.setStage(props.stage + 1)}}>다음</button> : <div>비밀번호를 확인해주세요</div>}
        </div>
      </div>
    </div>

  )
}

function NicknameComponent(props) {
  // 닉네임 중복체크
  let URL = useSelector((state) => state.url)
  const [isNicknameChecked, setIsNicknameChecked] = useState(false) // 닉네임 중복을 체크하면 true
  const [nicknameCheckResult, setNicknameCheckResult] = useState(false) // 닉네임 중복 체크 결과

  // 중복체크 함수
  const nicknameCheck = function() {
    axios({
      url : URL + '/users/check-nickname',
      method : 'get',
      params : {
        nickname : props.nickname
      }
    })
    .then((res)=>{
      setIsNicknameChecked(true)
      if (res.data.result.result) {
        setNicknameCheckResult(false)
      } else if (!res.data.result.result) {
        setNicknameCheckResult(true)
      }
    })
    .catch((err) => console.log(err))
  }

  // 다음으로 가기전에 닉네임을 바꾸는 경우 방지
  const goNext = function() {
    axios({
      url : URL + '/users/check-nickname',
      method : 'get',
      params : {
        nickname : props.nickname
      }
    })
    .then((res)=>{
      if (res.data.result.result) {
        setNicknameCheckResult(false)
  
      } else if (!res.data.result.result) {
        // setNicknameCheckResult(true)
        props.setStage(props.stage + 1)
      }
    })
    }
  

  return (
    <div>
      <div className={style.titleHolder}>
        <h1>닉네임을</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        {(props.nickname.length < 3 || props.nickname.length > 8) ? <div>닉네임은 1~8자!</div> :  isNicknameChecked && !nicknameCheckResult ? <div>이미 있는 닉네임입니다.</div> : isNicknameChecked && nicknameCheckResult ? <div>사용 가능한 닉네임입니다.</div> : null}
        <input className={style.signUpInput} onChange={(event) => { props.setNickname(event.target.value) }} placeholder="닉네임" defaultValue={props.nickname}></input>
        <div className={style.buttonBox}>
          <button className={style.signUpButton} onClick={() => { props.setStage(props.stage - 1)}}>이전</button>
          {/* TODO: 여기에 닉네임 형식 validation!!! */}
          {isNicknameChecked && nicknameCheckResult ? <button onClick={() => { goNext() }} className={style.signUpButton}>다음</button> : <button onClick={() => { nicknameCheck() }} className={style.signUpButton}>중복 체크</button>}
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
            src={props.photo ? props.photo : `images/defaultProfile.jpg`}
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
    const animationContainerRef = useRef()
        useEffect(() => {
          lottie.loadAnimation({
            container: animationContainerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "https://assets3.lottiefiles.com/packages/lf20_zprb9vzj.json",
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
            
          });
          setTimeout(() => {
          navigate('/login')
          }, 2000)
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