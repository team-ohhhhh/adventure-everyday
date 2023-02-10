import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../adventureCreate/Step4Done.module.css";

const Step3Done = () => {
  const navigate = useNavigate();

  const animationRef = useRef();

  useEffect(() => {
    const animation = animationRef.current;
    animation.preserveAspectRatio = "xMidYMid slice";

    setTimeout(() => {
      navigate("/map"); // 추후 게시글 상세 페이지로 수정
    }, 3000);
  }, []);

  return (
    <div className={styles.animationContainer}>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_zprb9vzj.json"
        background="transparent"
        speed="1"
        style={{ width: "100vw", height: "100vh" }}
        autoplay
        ref={animationRef}
      ></lottie-player>
      <h1 className={styles.header}>탐험 생성 완료!</h1>
    </div>
  );
};

export default Step3Done;
