import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewComplete.module.css";

const ReviewDone = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const html = window.document.getElementsByTagName("html")[0];
    html.style.backgroundColor = "#1c0b69";
    html.style.color = "white";

    setTimeout(() => {
      navigate("/map"); // 추후 탐험 상세 페이지로 수정
    }, 3000);

    return () => {
      html.style.backgroundColor = "white";
      html.style.color = "black";
    };
  }, []);

  return (
    <>
      <h1 className={styles.header}>후기 작성 완료</h1>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <lottie-player
        src="https://assets10.lottiefiles.com/private_files/lf30_bmi15k55.json"
        background="transparent"
        speed="1"
        style={{ width: "100%" }}
        autoplay
      ></lottie-player>
    </>
  );
};

export default ReviewDone;
