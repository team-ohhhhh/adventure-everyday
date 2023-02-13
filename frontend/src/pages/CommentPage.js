 import axios from 'axios'
 import { useEffect, useState } from 'react'
 import { useSelector } from 'react-redux'
 import { useParams } from 'react-router-dom'
 import Comment from '../components/Article/Comment/Comment'
 import InputForm from '../components/Article/Comment/InputForm'
 import styles from "./CommentPage.module.css"; 
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMessage } from "@fortawesome/free-solid-svg-icons";
 
 function CommentPage() {
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  let { articleId } = useParams();

  
  const [commentList, setCommentList] = useState([])
  
  const getComments = function() {
    axios({
      url : URL + `/posts/${articleId}/comments`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      setCommentList(res.data.result)
    })
    .catch((err) => console.log(err))
  }
  
  
  

  // 댓글 작성용
  const [commentInput, setCommentInput] = useState('')
  const postComment = function() {
    axios({
      url: URL + `/posts/${articleId}/comments`,
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data : {
        content: commentInput
      }
    })
    .then((res) => {
      getComments()
      setCommentInput('')
    })
    .catch((err) => console.log(err))
  }
  
  // 수정삭제 버튼 토글용 버튼 제어
  const [moreButtonOpen, setMoreButtonOpen] = useState(false)
  const [whichButton, setWhichButton] = useState(null)
  const [replyMoreButtonOpen, setReplyMoreButtonOpen] = useState(false)
  const [whichReplyButton, setWhichReplyButton] = useState(null)
  
  const closeMoreButton = function() {
    if(moreButtonOpen) {
      setMoreButtonOpen(false)
      setWhichButton(null)
    }}

  const closeReplyMoreButton = function() {
    if(replyMoreButtonOpen) {
      setReplyMoreButtonOpen(false)
      setWhichReplyButton(null)
    }
  }


  useEffect(() => {
    getComments()
  }, [moreButtonOpen, whichButton])

  return (
    <div className="commentPageContainer" onClick={()=>{closeMoreButton(); closeReplyMoreButton();}} >
      <div className={styles.comments_container}>
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "5%" }}>
            <FontAwesomeIcon icon={faMessage} style={{ marginLeft: "10px"}} />
            <span style={{marginLeft:"2%", marginBottom:"5%" }}>{commentList.length}개의 댓글</span>
          </div>
      <div>
        {commentList.map((comment) => {
          return ( <Comment key={comment.commentId} 
            comment={comment} 
            getComments={getComments}
            //코멘트 용
            moreButtonOpen={moreButtonOpen}
            setMoreButtonOpen={setMoreButtonOpen}
            whichButton={whichButton}
            setWhichButton={setWhichButton}
            // 리플라이 용
            replyMoreButtonOpen={replyMoreButtonOpen}
            setReplyMoreButtonOpen={setReplyMoreButtonOpen}
            whichReplyButton={whichReplyButton}
            setWhichReplyButton={setWhichReplyButton}

            />)
        })}
      </div>
      <div className={styles.whiteLine}></div>
        <InputForm setCommentInput={setCommentInput} commentInput={commentInput} postComment={postComment} />
        
        </div>
    </div>
  )

 }

 export default CommentPage