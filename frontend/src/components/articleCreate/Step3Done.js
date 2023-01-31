import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step3Done = ({ setStep }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // 추후 게시글 상세 페이지로 수정
    }, 3000);
  }, [navigate]);

  return (
    <>
      <h2>작성 완료</h2>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player
        src="https://assets10.lottiefiles.com/private_files/lf30_bmi15k55.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        autoplay
      ></lottie-player>
    </>
  );
};

export default Step3Done;
