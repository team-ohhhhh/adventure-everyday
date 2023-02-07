 import axios from 'axios'
 import { useEffect, useState } from 'react'
 import { useSelector } from 'react-redux'
 import { useParams } from 'react-router-dom'
 import Comment from '../components/Article/Comment/Comment'
 import InputForm from '../components/Article/Comment/InputForm'
 
 
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
      console.log(res)
    })
    .catch((err) => console.log(err))
  }



  useEffect(() => {
    getComments()
  }, [])

  return (
    <div className="pageContainer">
      <div>댓글 작성</div>
        <InputForm setCommentInput={setCommentInput} commentInput={commentInput} postComment={postComment} />
      <div>{}개의 댓글</div>
      <div>
        {commentList.map((comment) => {
          return ( <Comment comment={comment} getComments={getComments}/>)
        })}
      </div>
    </div>
  )

 }

 export default CommentPage