import styles from "./AdventureInfo.module.css";

function AdventureInfo() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>제목</div>
        <div className={styles.period}> 탐험기간: 2023-01-13 ~ 2023-01-31</div>
        <div className={styles.content}>
          요즘 같은 날씨에 딱인 탐험입니다. <br /> 힘들지 않은 예쁜 코스로
          짜봤어요 :)
        </div>
        <div className={styles.people}>
          <div className={styles.maker}>
            <div className={styles.makerProfileContainer}>
              <img className={styles.makerProfile} src="/images/alien.jpg" />
            </div>
            <div className={styles.makerNameAndTierContainer}>
              <span className={styles.makerName}>탐험가</span>
              <div className={styles.makerNameAndTier}>
                <span className={styles.makerName}> silverain_9 </span>{" "}
                <img src="/images/alien.png" />
              </div>
            </div>
          </div>
          <div className={styles.participants}>participants</div>
        </div>
        <div className={styles.etc}>종류, 평점과 버튼</div>
      </div>
    </>
  );
}
export default AdventureInfo;
