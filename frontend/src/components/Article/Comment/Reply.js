import style from './Reply.module.css'

function Reply({reply}) {

  return (
    <div className={style.commentCard}>
        <div className={style.header}>
          <div className={style.photoAndNicknameAndTime}>
            <div className={style.photoContainer}>
              <img className={style.photo} src={reply.userDetailRes.photoUrl ? reply.userDetailRes.photoUrl : '/defaultProfile.jpg'}/>
            </div>
            <div className={style.nicknameAndButton}>
              <div className={style.nicknameAndTime}>
                <span className={style.nickname}>{reply.userDetailRes.nickname}</span>
                <span classname={style.time}>{reply.createdTime}</span>
              </div>
            </div>
          </div>
          <div className={style.moreButton}>...</div>
        </div>
        <div className={style.contentAndFooter}>
          <div className={style.content}>{reply.subCommentContent}</div>
          <div className={style.footer}>
            <div className={style.likes}>{reply.subCommentLikes}</div>
          </div>

        </div>
      </div>
  )
}

export default Reply