import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step4Done = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/adventure"); // 추후 모험 상세 페이지로 수정
    }, 4000);
  }, []);

  return (
    <>
      <h1>탐험 생성 완료!</h1>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_rj4titti.json"
        background="transparent"
        speed="1.5"
        style={{ width: "300px", height: "300px" }}
        autoplay
      ></lottie-player>
    </>
  );
};

export default Step4Done;
