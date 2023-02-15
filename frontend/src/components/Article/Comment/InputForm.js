import styles from './InputForm.module.css'
import { useSelector } from 'react-redux'

function InputForm({ commentInput, setCommentInput, postComment}) {
  const USER = useSelector((state) => state.user)

  const onChange = (e) => {
    setCommentInput(e.target.value)
  }

  return (
    <div className={styles.comment}>
        <div className={styles.comment_content}>
          <div className={styles.profile}>
          <img className={styles.profile_picture} src={USER.photoUrl ? USER.photoUrl : '/images/defaultProfile.jpg'}></img>
          <h4 className={styles.username}>{USER.nickname}</h4>
        </div>
        <input value={commentInput} onChange={onChange} className={styles.comment} placeholder="댓글을 작성하세요"></input>
      </div>
      <button className={styles.postButton} onClick={() => {postComment()}}>작성</button>
    </div>
  )
}

export default InputForm