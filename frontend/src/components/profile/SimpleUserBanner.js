import React from 'react';
import style from './SimpleUserBanner.module.css'
import { useNavigate } from "react-router-dom";

function SimpleUserBanner(props) {
  const navigate = useNavigate() 
  return(
    <div className={style.userBanner} onClick={() => {navigate(`/profile/${props.data.userId}`)}}>
      <div className={style.photoContainer}>
        <img className={style.photo} src={props.data.photoUrl ? props.data.photoUrl : '/images/defaultProfile.jpg'}/>
      </div>
      <div className={style.nicknameAndTierAndIntroduce}>

        <div className={style.nicknameAndTier}><div>{props.data.nickname}</div><img src={`/images/lv${props.data.level}.png`} style={{height:"18px", weight:"18px", marginLeft:"3px" }}/></div>
         
  
        <div className={style.introduce}>{props.data.introduce}</div>
      </div>
      
  
    </div>
  )
}
export default SimpleUserBanner