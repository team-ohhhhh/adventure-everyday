import style from './MoreList.module.css'
import { useNavigate } from 'react-router-dom'

function MoreList() {

  const navigate = useNavigate()

  return (
    <div className={style.MoreList}>

      <div className={style.MoreListItem} > 로그아웃 </div>
      <div className={style.MoreListItem} onClick={()=> navigate('/passwordchange')}> 비밀번호 변경 </div>
      <div className={style.MoreListItem} onClick={()=> navigate('/delete')}> 탈퇴하기 </div>
    </div>
  )

}

export default MoreList