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
    <div style={{width:"90vw", display:"flex", flexDirection:"column", alignItems:"end"}}>
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
      {/*TODO: 여기 css 왼쪽으로 맞춰줘야 함.. */}
      <InputForm setCommentInput={setReplyInput} commentInput={replyInput} postComment={postReply}/>
    </div>
  )
}

export default ReplyList