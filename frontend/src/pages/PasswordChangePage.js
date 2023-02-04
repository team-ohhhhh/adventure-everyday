import { useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import style from './PasswordChangePage.module.css'
import { useNavigate } from 'react-router-dom'

function PasswordChangePage() {
  const [oldPassword, setOldPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newPassword2, setNewPassword2] = useState(null)

  const navigate = useNavigate()

  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)
  let USER = useSelector((state) => state.user)

  const changePassword = function() {
    axios({
      url : URL + '/users/password',
      method: 'put',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        oldPassword,
        newPassword
      }
    })
    .then((res) => {
      navigate(`/profile/${USER.userId}`)
    })
    .catch((err) => console.log(err))
  }

  return (
    <div className="pageContainer" >
      <div className={style.titleHolder}>
        <h1>이전 비밀번호를</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        <input type={"password"} className={style.passwordChangeInput} onChange={(event) => { setOldPassword(event.target.value) }} placeholder="이전 비밀번호"></input>
      </div>
      <div className={style.titleHolder}>
        <h1>새 비밀번호를</h1>
        <h1>입력해주세요</h1>
      </div>
      <div className={style.inputAndButton}>
        <input type={"password"} className={style.passwordChangeInput} onChange={(event) => { setNewPassword(event.target.value) }} placeholder="새 비밀번호"></input>
        <input type={"password"} className={style.passwordChangeInput} onChange={(event) => { setNewPassword2(event.target.value) }} placeholder="새 비밀번호 확인"></input>
        {/* 여기에 validation */}   
        {newPassword === newPassword2 ? <button onClick={() => {changePassword()}} className={style.passwordChangeButton}>변경</button> : '새 비밀번호를 확인해주세요'}
      </div>
    </div>
  )

}

export default PasswordChangePage