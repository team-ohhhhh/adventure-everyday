import style from './MoreList.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { deleteUserInfo } from "./../../store/userSlice"
import { deleteToken } from "./../../store/tokenSlice"


function MoreList() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = function() {
    dispatch(deleteToken()) 
    dispatch(deleteUserInfo())
    navigate('/login')
  }

  return (
    <div className={style.MoreList}>
      <div className={style.MoreListItem} onClick={() => {logout()}}> 로그아웃 </div>
      <div className={style.MoreListItem} onClick={()=> navigate('/passwordchange')}> 비밀번호 변경 </div>
      <div className={style.MoreListItem} onClick={()=> navigate('/delete')}> 탈퇴하기 </div>
    </div>
  )

}

export default MoreList