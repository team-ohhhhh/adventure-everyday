import style from './InputForm.module.css'
import { useSelector } from 'react-redux'

function InputForm({ commentInput, setCommentInput, postComment}) {
  const USER = useSelector((state) => state.user)

  const onChange = (e) => {
    setCommentInput(e.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.infos}>
        <div className={style.photoContainer}>
          <img className={style.photo} src={USER.photoUrl ? USER.photoUrl : '/defaultProfile.jpg'}></img>
        </div>
        <div className={style.nicknameAndInput}>
          <div className={style.nickname}>{USER.nickname}</div>
          <input onChange={onChange} className={style.comment} placeholder="댓글을 작성하세요"></input>
        </div>
      </div>
      <button className={style.postButton} onClick={() => {postComment()}}>작성</button>
    

    </div>
  )
}

export default InputForm