import style from './Reply.module.css'
import { AiOutlineHeart, AiFillHeart } from  "react-icons/ai"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { RiMoreFill } from "react-icons/ri"

function Reply({reply, getReply, replyMoreButtonOpen, setReplyMoreButtonOpen, whichReplyButton, setWhichReplyButton}) {
  let USER = useSelector((state) => state.user)
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)


  const likeReply = function() {
    axios({
      url : URL + `/posts/comments/subcomments/${reply.subCommentId}/like`,
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      getReply()
    })
    .catch((err) => console.log(err))
  }
  const unlikeReply = function() {
    axios({
      url : URL + `/posts/comments/subcomments/${reply.subCommentId}/like`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      getReply()
    })
    .catch((err) => console.log(err))
  }

  // 삭제 화면용 state
  const [wouldYouDelete, setWouldYouDelete] = useState(false)

  // 수정 화면용 state
  const [wouldYouUpdate, setWouldYouUpdate] = useState(false)
  const [newReply, setNewReply] = useState(reply.subCommentContent)
  const onChange = function(e) {
    setNewReply(e.target.value)
  }
  const updateReply = function() {
    axios({
      url : URL + `/posts/comments/subcomments/${reply.subCommentId}`,
      method : 'update',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        content: newReply
      }
    })
    .then((res) => {
      getReply()
    })
    .catch((err) => {console.log(err)})
  }

  const deleteReply = function() {
    axios({
      url : URL + `/posts/comments/subcomments/${reply.subCommentId}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        content: newReply
      }
    })
    .then((res) => {
      getReply()
    })
    .catch((err) => {console.log(err)})
  }
  


  return (
    <div>
      {wouldYouDelete 
      ? <div className={style.commentCard}>
          <div className={style.wouldYouDelete}>
            <div>삭제하시겠습니까?</div>
            <div className={style.buttonHolder}>
              <button className={style.yesDelete} onClick={()=>{deleteReply()}}>삭제</button>
              <button className={style.noDelete} onClick={()=>{setWouldYouDelete(false)}}>취소</button>
            </div>
          </div>
        </div>
      :<div className={style.commentCard}>
          <div className={style.header}>
            <div className={style.photoAndNicknameAndTime}>
              <div className={style.photoContainer}>
                <img className={style.photo} src={reply.userDetailRes.photoUrl ? reply.userDetailRes.photoUrl : '/defaultProfile.jpg'}/>
              </div>
              <div className={style.nicknameAndButton}>
                <div className={style.nicknameAndTime}>
                  <span className={style.nickname}>{reply.userDetailRes.nickname}</span>
                  <span classname={style.time}>{reply.createdTime && reply.createdTime.substr(0,10)}</span>
                </div>
              </div>
            </div>
            <div className={style.moreButton}>
              {wouldYouUpdate
                  ? <div><span onClick={()=>{updateReply()}}>수정</span><span onClick={()=>{setWouldYouUpdate(false)}} style={{marginLeft:"2vw"}}>취소</span></div>
                  : replyMoreButtonOpen && whichReplyButton === reply.subCommentId
                  ? <div><span onClick={()=>{setWouldYouDelete(true)}}> 삭제 </span> <span onClick={()=>{setWouldYouUpdate(true)}}> 수정 </span></div>
                  : <RiMoreFill onClick={() => {setReplyMoreButtonOpen(true); setWhichReplyButton(reply.subCommentId)}}/>
                }
            </div>
          </div>
          <div className={style.contentAndFooter}>
            {wouldYouUpdate 
              ? <input onChange={onChange} defaultValue={reply.subCommentContent}/>
              : <div className={style.content}>{reply.subCommentContent}</div>
            }
            <div className={style.footer}>
              <div className={style.likes}>
                {reply.userIdxList.length}
                {reply.userIdxList.find(idx => idx === USER.userId)
                ? <AiFillHeart onClick={() => {unlikeReply()}}/>
                : <AiOutlineHeart onClick={() => {likeReply()}}/>
              }

              </div>
            </div>

          </div>
        </div>}
    </div>
  )
}

export default Reply