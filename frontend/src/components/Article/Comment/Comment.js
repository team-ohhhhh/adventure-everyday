import axios from 'axios'
import style from './Comment.module.css'
import ReplyList from './ReplyList'
import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from  "react-icons/ai"
import { MdOutlineReply } from "react-icons/md"
import { useSelector } from 'react-redux'
import InputForm from './InputForm'

function Comment({comment, getComments}) {
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const [replyList, setReplyList] = useState([])

  let USER = useSelector((state) => state.user)
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)

  // 대댓글 창 열기
  const toggle = function() {
    setIsReplyOpen((prev) => !prev)
  }

  // 대댓글 가져오기
  const getReply = function() {
    axios({
      url: URL + `/posts/comments/${comment.commentId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setReplyList(res.data.result)
    })
    .catch((err) => console.log(err))
  }

  // 좋아요 / 안좋아요
  const likeComment = function() {
    axios({
      url : URL + `/posts/${comment.commentId}/comment-like`,
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      getComments()
    })
  }



  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
      <div className={style.commentCard}>
        <div className={style.header}>
          <div className={style.photoAndNicknameAndTime}>
            <div className={style.photoContainer}>
              <img className={style.photo} src={comment.userDetailRes.photoUrl ? comment.userDetailRes.photoUrl : '/defaultProfile.jpg'}/>
            </div>
            <div className={style.nicknameAndButton}>
              <div className={style.nicknameAndTime}>
                <span className={style.nickname}>{comment.userDetailRes.nickname}</span>
                <span classname={style.time}>{comment.createdTime && comment.createdTime.substr(0,10)}</span>
              </div>
            </div>
          </div>
          <div className={style.moreButton}>...</div>
        </div>
        <div className={style.contentAndFooter}>
          <div className={style.content}>{comment.commentContent}</div>
          <div className={style.footer}>
            <div className={style.likes}>{comment.commentLikes}
              {comment.userIdxfilter && comment.userIdxList.filter((idx) => {
                return idx === USER.userId
              }).length ? <AiFillHeart /> : <AiOutlineHeart onClick={()=>{likeComment()}}/> }
            </div>
            <div className={style.reply} onClick={() => {toggle(); getReply();}}>{comment.subCommentDtoList.length}<MdOutlineReply /></div>
          </div>

        </div>
      </div>
      { isReplyOpen && 
      <div>
        <ReplyList commentId={comment.commentId} replyList={replyList} getReply={getReply} />
      </div>
      }
    </div>
  )
}

export default Comment