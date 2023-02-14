import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReviewComplete.module.css";
import lottie from "lottie-web";

const ReviewDone = () => {
  const navigate = useNavigate();

  const animationContainerRef = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: "https://assets10.lottiefiles.com/private_files/lf30_bmi15k55.json",
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
      
    });
    setTimeout(() => {
      navigate("/map");
    }, 2000);
  }, []);

  return (
    <div className={styles.pageBackground} >
      <h1 className={styles.header}>후기 작성 완료!</h1>
      <div className={styles.animationContainer}
       ref={animationContainerRef} style={{
        width: '50vw',
        height: '50vh'

      }}>
      </div>
    </div>
  );
};

export default ReviewDone;
