import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";

import styles from "../adventureCreate/Step4Done.module.css";

const Step3Done = ({ postType }) => {
  const navigate = useNavigate();

  const animationContainerRef = useRef(null);

  const animationByPostType = () => {
    switch (postType) {
      case 1:
        return "https://assets3.lottiefiles.com/packages/lf20_zprb9vzj.json"; // 1
      case 2:
        return "https://assets7.lottiefiles.com/private_files/lf30_nSM2dY.json"; // 2
      case 3:
        return "https://assets9.lottiefiles.com/packages/lf20_8edlac32.json"; // 3
      default:
        break;
    }
  };

  const textByPostType = () => {
    switch (postType) {
      case 1:
        return "게시글 생성 완료!";
      case 2:
        return "체크포인트 달성!";
      case 3:
        return "축하해요!";
      default:
        break;
    }
  };

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: animationByPostType(),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });
    // setTimeout(() => {
    //   navigate("/map");
    // }, 3000);
  }, []);

  return (
    <div
      className={styles.animationContainer}
      ref={animationContainerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1
        className={styles.header}
        style={{ color: postType === 3 ? "#1c0b69" : "white" }}
      >
        {textByPostType()}
      </h1>
      {postType === 3 && <h1 className={styles.header2}>모험을 완료했어요</h1>}
    </div>
  );
};

export default Step3Done;
