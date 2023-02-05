import styles from "./AdventureInfo.module.css";
import ProfileCircle from "../ProfileCircle";

function AdventureInfo(props) {
  console.log("photoUrl" + props.info.userIdPhotoUrl); // 이 부분이 부모 컴포넌트 첫 렌더링 땐 undefined이고 리렌더링 될 땐 나옴
  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{props.info.adventureTitle}</div>
          <img className={styles.diff} src="/images/diff_easy.png"></img>
        </div>
        <div className={styles.period}>
          {" "}
          {props.info.adventureStartDate}~{props.info.adventureEndDate}
        </div>
        <div className={styles.content}>{props.info.adventureContent}</div>
        <div className={styles.people}>
          <div className={styles.maker}>
            <div className={styles.makerProfileContainer}>
              <ProfileCircle
                src={
                  props.info.userIdPhotoUrl
                    ? props.info.userIdPhotoUrl.photoUrl
                    : "/defaultProfile.jpg"
                }
              ></ProfileCircle>
            </div>
            <div className={styles.makerNameAndTierContainer}>
              <span className={styles.makerName}>탐험가</span>
              <div className={styles.makerNameAndTier}>
                <span className={styles.makerName}>
                  {" "}
                  {props.info.userNickname}{" "}
                </span>
                <img
                  className={styles.makerTier}
                  src={props.info.userIdPhotoUrl}
                />
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
              <div className={styles.highlight}>
                #{props.info.adventureCategory}
              </div>
            </div>
            <div className={styles.desc}>
              <div className={styles.normal}>평점:</div>
              <div className={styles.highlight}>
                {props.info.adventureAvgReviewRate}
              </div>
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
