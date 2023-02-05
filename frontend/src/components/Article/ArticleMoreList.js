import style from './ArticleMoreList.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { saveArticle } from "./../../store/articleSlice";
import Modal from 'react-modal'
import axios from 'axios'
import { useState } from 'react'




function ArticleMoreList({ isMe, article }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toUpdate = function() {
    dispatch(saveArticle(article))
    navigate('update')
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  let URL = useSelector((state) => state.url)
  let TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1NTc4MzU3LCJleHAiOjE2NzU5MzgzNTd9.H_1_PJ4Y2KM4GAFM3pKU4rvt8Dk8LVkqVOnIy1VRsB4'

  // 모달 스타일 주기
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      zIndex: 10,
    },
    content: {
      height: "25vw",
      width: "50vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      outline: "none",
      zIndex: 10,
      margin:"auto",
      background: "#FFFFFF",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px"
    },
  };

  const deleteArticle = function() {
    axios({
      url: URL + `/posts/${article.postId}`,
      method:'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  }




  if (isMe) {
    return ( 
      <div className={style.MoreList}>
        <div className={style.MoreListItem} onClick={() => {toUpdate()}}> 수정 </div>
        <div className={style.MoreListItem} onClick={() => {setModalIsOpen(true)}}> 삭제 </div>
        <Modal 
          isOpen={modalIsOpen}
          style={modalStyle}
          >
          <div style={{textAlign:"center"}}>
          진짜 삭제하실건가요???
          </div>
          <div className={style.buttonHolder}>
            <button className={style.cancelButton} onClick={() => setModalIsOpen(false)}>취소</button>
            <button className={style.deleteUserButton} onClick={() => deleteArticle()}>삭제</button>
          </div>
        </Modal>
      </div>
    )
  } else {
    return (
      <div className={style.MoreList}>
        <div className={style.MoreListItem} style={{color:'red'}} onClick={()=>{console.log('신고')}}> 게시글 신고 </div>
      </div>
    )
  }


}
Modal.setAppElement('#root')
export default ArticleMoreList