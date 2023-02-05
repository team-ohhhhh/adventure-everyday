import styles from "./AdventureInfo.module.css";
import ProfileCircle from "../ProfileCircle";

function AdventureInfo(props) {
  // 현재 props로 넘어오는 데이터 미리보기
  const dummy = {
    // 1. 하얀 부분 데이터
    adventureId: 1,
    userId: "silverain_9",
    advetureMakerTier: 2,
    category: "맛집",
    featTitle: "걷기왕",
    featContent: null, // 칭호 설명용으로 넣은 것이지만 사실 모험이름이라 쓸 일 없을듯
    title: "adventure1",
    content: "아주 맛있는 맛집 모음이에요",
    difficulty: "/images/diff_normal.png",
    photoUrl: "/images/alien.jpg",
    startDate: "2023-01-24",
    endDate: "2023-02-03",
    avgReviewRate: 4.5,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{props.info.title}</div>
          <img className={styles.diff} src="/images/diff_easy.png"></img>
        </div>
        <div className={styles.period}>
          {" "}
          {props.info.startDate}~{props.info.endDate}
        </div>
        <div className={styles.content}>{props.info.content}</div>
        <div className={styles.people}>
          <div className={styles.maker}>
            <div className={styles.makerProfileContainer}>
              <ProfileCircle src={props.info.photoUrl}></ProfileCircle>
            </div>
            <div className={styles.makerNameAndTierContainer}>
              <span className={styles.makerName}>탐험가</span>
              <div className={styles.makerNameAndTier}>
                <span className={styles.makerName}> silverain_9 </span>
                <img className={styles.makerTier} src={props.info.photoUrl} />
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
              <div className={styles.highlight}>#{props.info.category}</div>
            </div>
            <div className={styles.desc}>
              <div className={styles.normal}>평점:</div>
              <div className={styles.highlight}>{props.info.avgReviewRate}</div>
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
