import styles from "./ProfileCircle.module.css";

// props로 이미지 경로를 받아와 보여주는 컴포넌트
function ProfileCircle(props) {
  return (
    <>
      <img className={styles.makerProfile} src={props.src} />
    </>
  );
}

export default ProfileCircle;
