import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { saveToken } from "../../store/tokenSlice";
import { saveUserInfo } from "../../store/userSlice";
import { useNavigate,Link, useParams } from "react-router-dom"
import style from "./KakaoLogin.module.css"
import queryString from 'query-string';

// 로그인 페이지
function KakaoLogIn() {

    console.log(window.location.search)
  let qs = queryString.parse(window.location.search)

  
    let URL = useSelector((state) => state.url);
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  

    const KakaoLogIn = function () {
        axios({
          url: URL + `/auth/kakao/callback?code=${qs.code}&action=login`,
          method: "get"
        }).then((response) => {
          //TODO: 여기서 토큰 저장하시오
          dispatch(saveToken(response.data.result.token))
          dispatch(saveUserInfo(response.data.result.userDetailRes))
          console.log(response.data)
          navigate('/')
        }).catch((error) => console.log(error))
      }

      useEffect(()=>{
        KakaoLogIn()
      }, [])
  
    return (
      <div>
        <h1>카카오 로그인 진행중...</h1>
      </div>
    );
  }
  
  export default KakaoLogIn;