import style from './ReplyList.module.css'
import Reply from './Reply'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import InputForm from './InputForm'

function ReplyList({commentId, replyList, getReply, replyMoreButtonOpen, setReplyMoreButtonOpen, whichReplyButton, setWhichReplyButton}) {
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)

  // 대댓글 작성용
  const [replyInput, setReplyInput] = useState()
  const postReply = function () {
    axios({
      url: URL + `/posts/comments/${commentId}`,
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data : {
        content: replyInput
      }
    })
    .then((res) => {
      getReply()
      setReplyInput('')
    })
    .catch((err) => console.log(err))
  }


  return(
    <div>
    <div style={{marginTop:"3%", display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"flex-end"}}>
      {replyList.map((reply) => {
        return <Reply 
        reply={reply} 
        getReply={getReply}
        replyMoreButtonOpen={replyMoreButtonOpen}
        setReplyMoreButtonOpen={setReplyMoreButtonOpen}
        whichReplyButton={whichReplyButton}
        setWhichReplyButton={setWhichReplyButton}
        />
      })}
      
      {/* <div className={style.comment}>
        <div className={style.comment_content}>
        <div className={style.whiteLine}></div>
        <InputForm  setCommentInput={setReplyInput} commentInput={replyInput} postComment={postReply}/>
        </div>
        </div> */}
        </div>
        <div style={{marginRight:"2rem"}}>
        <InputForm  setCommentInput={setReplyInput} commentInput={replyInput} postComment={postReply}/>
        </div>
    </div>
  )
}

export default ReplyList