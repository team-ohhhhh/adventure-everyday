import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { saveToken } from "../../store/tokenSlice";
import { saveUserInfo } from "../../store/userSlice";
import queryString from "query-string";

// 로그인 페이지
function KakaoLogIn() {
  // console.log(window.location.search)
  let qs = queryString.parse(window.location.search);

  let URL = useSelector((state) => state.url);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 로그인 버튼에 달린 로그인 axios -> 성공시 메인페이지로 이동
  const KakaoLogIn = function () {
    axios({
      url: URL + `/auth/kakao/callback?code=${qs.code}&action=login`,
      method: "get",
    })
      .then((response) => {
        //TODO: 여기서 토큰 저장하시오
        dispatch(saveToken(response.data.result.token));
        dispatch(saveUserInfo(response.data.result.userDetailRes));
        // console.log(response.data);
        navigate("/map");
      })
      .catch((error) => {
        // console.log(error);
        alert("카카오로 회원가입을 먼저 진행해주세요.");
        navigate("/signup");
      });
  };

  useEffect(() => {
    KakaoLogIn();
  }, []);

  return (
    <div>
      <div>카카오 로그인 진행 중...</div>
    </div>
  );
}

export default KakaoLogIn;
