import { RiMoreFill } from  "react-icons/ri"
import ArticleMoreList from "./ArticleMoreList"
import style from './ArticleMoreButton.module.css'
import Modal from 'react-modal'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'


function ArticleMoreButton(props) {
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  const navigate = useNavigate() 
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteArticle = function() {
    axios({
      url: URL + `/posts/${props.article.postId}`,
      method:'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      navigate('/') //TODO: 삭제 후 어디로 보낼지 고민
    })
    .catch((err) => {
      console.log(err)
    })

  }


  return (
    <div className={style.buttonContainer}>
      <RiMoreFill onClick={props.toggle}/>
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
      {props.isOn && <ArticleMoreList isMe={props.isMe} article={props.article} setModalIsOpen={setModalIsOpen}/>} 
    </div>
    )

}

export default ArticleMoreButton