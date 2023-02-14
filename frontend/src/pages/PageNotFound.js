import lottie from 'lottie-web';
import styles from "./PageNotFound.module.css"
import { useEffect, useRef } from "react"

const PageNotFound = function() {

  const animationContainerRef = useRef()

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: "https://assets6.lottiefiles.com/packages/lf20_rnuslwfx.json",
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet'
      }
      
    });
  }, [])

  return (
    <div className={styles.animationContainer} ref={animationContainerRef} style={{
      width: '100vw',
      height: '100vh'
    }}>
      <h1 className={styles.header}>페이지가 없습니다</h1>
    </div>
  )

}

export default PageNotFound