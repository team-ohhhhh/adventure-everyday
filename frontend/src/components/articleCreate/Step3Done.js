import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "lottie-web";

import styles from "../adventureCreate/Step4Done.module.css";

const Step3Done = () => {
  const navigate = useNavigate();

  const animationContainerRef = useRef(null);

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
      navigate("/map");
    }, 3000);
  }, []);

  return (
    <div className={styles.animationContainer} ref={animationContainerRef} style={{
      width: '100vw',
      height: '100vh'
    }}>
      <h1 className={styles.header}>게시글 생성 완료!</h1>
    </div>
  );
};

export default Step3Done;

