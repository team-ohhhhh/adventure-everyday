import styles from "./AdventureInfo.module.css";
import ProfileCircle from "../ProfileCircle";

function AdventureInfo(props) {
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
              <ProfileCircle src={"/images/alien.jpg"}></ProfileCircle>
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
            <ProfileCircle src={"/defaultProfile.jpg"}></ProfileCircle>
            <ProfileCircle src={"/defaultProfile.jpg"}></ProfileCircle>
            <ProfileCircle src={"/defaultProfile.jpg"}></ProfileCircle>
            <ProfileCircle src={"/defaultProfile.jpg"}></ProfileCircle>
          </div>
        </div>
        <div className={styles.etc}>
          <div className={styles.typeAndStars}>
            <div className={styles.desc}>
              <div className={styles.normal}>종류: </div>
              <div className={styles.highlight}>#취미</div>
            </div>
            <div className={styles.desc}>
              <div className={styles.normal}>평점:</div>
              <div className={styles.highlight}>4.5점</div>
            </div>
          </div>
          <div className={styles.button}>
            <button>알</button>
            <button>공</button>
            <button
              style={{
                /*버튼 디자인 */
                justifyItems: "center",
                alignItems: "center",

                width: "fit-content",
                height: "fit-content",
                padding: "0.4rem",
                paddingLeft: "0.8rem",
                paddingRight: "0.8rem",

                background: "#1C0B69",
                borderRadius: "2rem",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              참여하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdventureInfo;
