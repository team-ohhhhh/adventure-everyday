import axios from 'axios'
import style from './Comment.module.css'
import ReplyList from './ReplyList'
import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from  "react-icons/ai"
import { MdOutlineReply } from "react-icons/md"
import { RiMoreFill } from "react-icons/ri"
import { useSelector } from 'react-redux'
import InputForm from './InputForm'


function Comment({comment, getComments, moreButtonOpen, setMoreButtonOpen, whichButton, setWhichButton, replyMoreButtonOpen, setReplyMoreButtonOpen, whichReplyButton, setWhichReplyButton}) {
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

  const unlikeComment = function() {
    axios({
      url : URL + `/posts/${comment.commentId}/comment-like`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      getComments()
    })
  }

  const deleteComment = function() {
    axios({
      url : URL + `/posts/comments/${comment.commentId}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      getComments()
    })
    .catch((err) => {console.log(err)})
  }
  
  // 삭제전 알려주기용 state
  const [wouldYouDelete, setWouldYouDelete] = useState(false)

  // 수정 화면용 state
  const [wouldYouUpdate, setWouldYouUpdate] = useState(false)
  const [newComment, setNewComment] = useState(comment.commentContent)
  const onChange = function(e) {
    setNewComment(e.target.value)
  }
  const updateComment = function() {
    axios({
      url : URL + `/posts/comments/${comment.commentId}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        content: newComment
      }
    })
    .then((res) => {
      getComments()
    })
    .catch((err) => {console.log(err)})
  }

  
  



  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"end"}}>
      {wouldYouDelete 
      ? <div className={style.commentCard}>
          <div className={style.wouldYouDelete}>
            <div>삭제하시겠습니까?</div>
            <div className={style.buttonHolder}>
              <button className={style.yesDelete} onClick={()=>{deleteComment()}}>삭제</button>
              <button className={style.noDelete} onClick={()=>{setWouldYouDelete(false)}}>취소</button>
            </div>
          </div>
        </div>
      : <div className={style.commentCard}>
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
            <div className={style.moreButton}>
              <div>
                {wouldYouUpdate
                ? <div><span onClick={()=>{updateComment()}}>수정</span><span onClick={()=>{setWouldYouUpdate(false)}} style={{marginLeft:"2vw"}}>취소</span></div>
                : moreButtonOpen && whichButton === comment.commentId
                  ? <div><span onClick={()=>{setWouldYouDelete(true)}}> 삭제 </span> <span onClick={()=>{setWouldYouUpdate(true)}}> 수정 </span></div>
                  : <RiMoreFill onClick={() => {setMoreButtonOpen(true); setWhichButton(comment.commentId)}}/>
                }
              </div>
            </div>
          </div>
          <div className={style.contentAndFooter}>
            {wouldYouUpdate 
            ? <input onChange={onChange} defaultValue={comment.commentContent}/>
            : <div className={style.content}>{comment.commentContent}</div>
            }
            <div className={style.footer}>
              <div className={style.likes}>{comment.userIdxList.length}
                {comment.userIdxList.find(idx => idx === USER.userId) ? <AiFillHeart onClick={()=>{unlikeComment()}}/> : <AiOutlineHeart onClick={()=>{likeComment()}}/> }
              </div>
              <div className={style.reply} onClick={() => {toggle(); getReply();}}>{comment.subCommentDtoList.length}<MdOutlineReply /></div>
            </div>

          </div>
      </div> }
      { isReplyOpen && 
      <div>
        <ReplyList 
        commentId={comment.commentId} 
        replyList={replyList} 
        getReply={getReply} 
        replyMoreButtonOpen={replyMoreButtonOpen}
        setReplyMoreButtonOpen={setReplyMoreButtonOpen}
        whichReplyButton={whichReplyButton}
        setWhichReplyButton={setWhichReplyButton}
        />
      </div>
      }
    </div>
  )
}

export default Comment