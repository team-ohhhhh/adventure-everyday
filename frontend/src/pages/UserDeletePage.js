import { useState } from 'react'
import style from './UserDeletePage.module.css'
import { useSelector } from "react-redux"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { useDispatch } from "react-redux"
import { deleteUserInfo } from "./../store/userSlice"
import { deleteToken } from "./../store/tokenSlice"



function UserDeletePage() {
  const [email, setEmail] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  let USER = useSelector((state) => state.user)

  const logout = function() {
    dispatch(deleteToken()) 
    dispatch(deleteUserInfo())
    //TODO: 먼가 여기 다음에 만나요 페이지 있으면 좋겠다
    navigate('/')
  }

  const deleteUser = function() {
    axios({
      url : URL + '/users',
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      logout()
    })
    .catch((err) => console.log(err))
  }
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


  return (
    <div className="pageContainer">
      <div className={style.titleHolder}>탈퇴를 원하시면 자신의 이메일을 적어주세요</div>
      <div className={style.inputAndButton}>
        <input className={style.emailInput} onChange={(event) => { setEmail(event.target.value) }} placeholder="이메일"></input>
        {email === USER.email && <button onClick={()=> setModalIsOpen(true)} className={style.deleteUserButton}>탈퇴</button>}
      </div>
      <Modal 
      isOpen={modalIsOpen}
      style={modalStyle}
      >
        <div style={{textAlign:"center"}}>
          진짜 탈퇴하실건가요???
        </div>
        <div className={style.buttonHolder}>
          <button className={style.cancelButton} onClick={() => navigate(`/profile/${USER.userId}`)}>취소</button>
          <button className={style.deleteUserButton} onClick={() => deleteUser()}>탈퇴</button>
        </div>
      </Modal>
    </div>
  )
}

Modal.setAppElement('#root')
export default UserDeletePage