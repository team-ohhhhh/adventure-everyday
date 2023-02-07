import styles from "./ParticipantsCircle.module.css";

// props로 이미지 리스트를 받아와 보여주는 컴포넌트
function ParticipantsCircle(props) {
  console.log("participants circle");
  console.log(props);
  return (
    <div className={styles.container}>
      {/* 참가자 프로필 반복 */}
      {props.photoList ? (
        props.photoList.slice(0, 4).map((photo, index) => {
          // photoList에 유저 id와 사진 리스트가 옴
          return (
            <img
              className={`${styles.participant} ${
                styles.participant + { index }
              }`}
              src={photo.photoUrl}
            />
          );
        })
      ) : (
        <div className={styles.nullInfo}>아직 참가자가 없어요!</div>
      )}

      {/* 하드코딩한 것 */}
      {/* <img
        className={`${styles.participant} ${styles.participant1}`}
        src={"/defaultProfile.jpg"}
      />
      <img
        className={`${styles.participant} ${styles.participant2}`}
        src={"/defaultProfile.jpg"}
      />
      <img
        className={`${styles.participant} ${styles.participant3}`}
        src={"/defaultProfile.jpg"}
      />
      <img
        className={`${styles.participant} ${styles.participant4}`}
        src={"/defaultProfile.jpg"}
      />
      <img
        className={`${styles.participant} ${styles.participant5}`}
        src={"/defaultProfile.jpg"}
      /> */}
    </div>
  );
}

export default ParticipantsCircle;
