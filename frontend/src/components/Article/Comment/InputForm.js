import { useSelector } from "react-redux";

import styles from "./InputForm.module.css";

function InputForm({ commentInput, setCommentInput, postComment }) {
  const USER = useSelector((state) => state.user);

  const onChange = (e) => {
    setCommentInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.profile}
          src={USER.photoUrl ? USER.photoUrl : "/images/defaultProfile.jpg"}
          alt="profile"
        ></img>

        <div className={styles.inputContainer}>
          <div className={styles.username}>{USER.nickname}</div>
          <textarea
            value={commentInput}
            onChange={onChange}
            className={styles.input}
            placeholder="댓글을 작성하세요"
          ></textarea>
        </div>
      </div>

      <button className={styles.postButton} onClick={() => postComment()}>
        작성
      </button>
    </div>
  );
}

export default InputForm;
