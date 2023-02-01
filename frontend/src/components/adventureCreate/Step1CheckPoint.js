import React from "react";
import { useNavigate } from "react-router-dom";

const Step1CheckPoint = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>choose checkpoint</h1>

      <p>탐험으로 만들 내 글을 선택하세요!</p>
      <p>게시글은 최대 5개까지 선택할 수 있습니다.</p>

      <button onClick={() => navigate(-1)}>취소</button>
      <button onClick={() => navigate("/adventure/create/2")}>다음</button>
    </div>
  );
};

export default Step1CheckPoint;
