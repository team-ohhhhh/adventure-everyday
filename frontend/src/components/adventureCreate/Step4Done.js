import React, { useEffect, useRef } from "react";
import lottie from 'lottie-web';
import { useNavigate } from 'react-router-dom'

import styles from "./Step4Done.module.css";

const Step4Done = () => {
  const animationContainerRef = useRef(null);
  const navigate = useNavigate() 

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: "https://assets10.lottiefiles.com/packages/lf20_de6cmki0.json",
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
      <h1 className={styles.header}>탐험 생성 완료!</h1>
    </div>
  );
};

export default Step4Done;
