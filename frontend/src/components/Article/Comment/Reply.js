import style from './Reply.module.css'
import { AiOutlineHeart, AiFillHeart } from  "react-icons/ai"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { RiMoreFill } from "react-icons/ri"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faEllipsisH, faMessage, faHeartBroken } from "@fortawesome/free-solid-svg-icons";


function Reply({reply, getReply, replyMoreButtonOpen, setReplyMoreButtonOpen, whichReplyButton, setWhichReplyButton}) {
  let USER = useSelector((state) => state.user)
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  //시간 계산
  const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	};

  const nowDate = detailDate(new Date(reply.createdTime));

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
      method : 'put',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        content: newReply
      }
    })
    .then((res) => {
      getReply()
      wouldYouUpdate(false)
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
    })
    .then((res) => {
      getReply()
    })
    .catch((err) => {console.log(err)})
  }

  return (
    <div className={style.comment}>
      {wouldYouDelete 
      ? <div className={style.comment_content}>
          <div className={style.wouldYouDelete}>
            <div>삭제하시겠습니까?</div>
            <div className={style.buttonHolder}>
              <button className={style.yesDelete} onClick={()=>{deleteReply()}}>삭제</button>
              <button className={style.noDelete} onClick={()=>{setWouldYouDelete(false)}}>취소</button>
            </div>
          </div>
        </div>
      :<div className={style.comment_content}>
      <div className={style.profile}>
          <img className={style.profile_picture}src={reply.userDetailRes.photoUrl ? reply.userDetailRes.photoUrl : '/defaultProfile.jpg'}/>
          <h4 className={style.username}>{reply.userDetailRes.nickname}</h4>
          <span style={{ color: '#626262', fontSize: "12px", marginLeft:"2%", marginTop:"1%"}}>{nowDate}</span>
          {reply.userDetailRes.userId === USER.userId &&
              (wouldYouUpdate
              ? <div style={{ marginLeft: "auto", marginRight:"3%", fontSize:"20" }}><span onClick={()=>{updateReply()}}>수정</span><span onClick={()=>{setWouldYouUpdate(false)}} style={{marginLeft:"2vw"}}>취소</span></div>
              : replyMoreButtonOpen && whichReplyButton === reply.subCommentId
                ? <div style={{ marginLeft: "auto", marginRight:"3%", fontSize:"20" }}><span onClick={()=>{setWouldYouDelete(true)}}> 삭제 </span> <span onClick={()=>{setWouldYouUpdate(true)}}> 수정 </span></div>
                : <RiMoreFill style={{ marginLeft: "auto", marginRight:"3%", fontSize:"20" }} onClick={() => {setReplyMoreButtonOpen(true); setWhichReplyButton(reply.subCommentId)}}/>
              )}
      </div>
      <div className={style.text}>{wouldYouUpdate 
      ? <input onChange={onChange} defaultValue={reply.subCommentContent}/>
      : <div className={style.content}>{reply.subCommentContent}</div>
      }</div>
      <div style={{ display: "flex", justifyContent: "flex-start",  marginTop: "5%" }}>
        {reply.userIdxList.find(idx => idx === USER.userId) ? <FontAwesomeIcon icon={faHeart} style={{ marginLeft: "19.5%",marginRight:"2%" }} onClick={()=>{unlikeReply()}}/> : <FontAwesomeIcon icon={faHeartBroken} style={{ marginLeft: "19.5%",marginRight:"2%" }} onClick={()=>{likeReply()}}/> }
        {reply.userIdxList.length}
        {/* <FontAwesomeIcon icon={faComment} style={{ marginLeft: "5%", marginRight: "2%" }} onClick={() => {toggle(); getReply();}} /><span>댓글 달기({comment.subCommentDtoList.length})</span> */}
      </div>         
  </div>}
    </div>
  )
}

export default Reply


