import styles from "./AdventureInfo.module.css";

function AdventureInfo() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>걷기 딱 좋은 탐험</div>
          <img className={styles.diff} src="/images/diff_easy.png"></img>
        </div>
        <div className={styles.period}> 탐험기간: 2023-01-13 ~ 2023-01-31</div>
        <div className={styles.content}>
          요즘 같은 날씨에 딱인 탐험입니다. <br /> 힘들지 않은 예쁜 코스로
          짜봤어요 :)
        </div>
        <div className={styles.people}>
          <div className={styles.maker}>
            <div className={styles.makerProfileContainer}>
              <img className={styles.makerProfile} src="/defaultProfile.jpg" />
            </div>
            <div className={styles.makerNameAndTierContainer}>
              <span className={styles.makerName}>탐험가</span>
              <div className={styles.makerNameAndTier}>
                <span className={styles.makerName}> silverain_9 </span>
                <img className={styles.makerTier} src="/images/lv2.png" />
              </div>
            </div>
          </div>
          <div className={styles.participants}>
            <img className={styles.partImg} src="/defaultProfile.jpg"></img>
            <img className={styles.partImg} src="/defaultProfile.jpg"></img>
            <img className={styles.partImg} src="/defaultProfile.jpg"></img>
            <img className={styles.partImg} src="/defaultProfile.jpg"></img>
            <img className={styles.partImg} src="/defaultProfile.jpg"></img>
          </div>
        </div>
        <div className={styles.etc}>
          <div className={styles.typeAndStars}>
            <div className={styles.desc}>
              <div>종류: </div>
              <div className={styles.highlight}>#취미</div>
            </div>
            <div className={styles.desc}>
              <div>평점:</div> <div className={styles.highlight}>4.5점</div>
            </div>
          </div>
          <div className={styles.button}>
            <button>알</button>
            <button>공</button>
            <button>참여하기</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdventureInfo;
