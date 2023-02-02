import React from 'react';
import style from './UserInfo.module.css'
import { BiSearchAlt2, BiPencil } from "react-icons/bi"
import { RiMoreFill } from  "react-icons/ri"

function UserInfo() {

  return (
    <div className={style.userInfo}>
      <div className={style.nicknameAndSearchAndMore}>
        <div className={style.nicknameAndIntroduce}>
          <div className={style.nickName}>
              rightarm <img src={'/images/lv4.png'} style={{height:"28px", weight:"28px"}}/>
          </div>
          <div className={style.introduce} style={{fontWeight: "500"}}>
            은비의 오른팔입니다~ <BiPencil />
          </div>
        </div>
        <div className={style.searchAndMore}>
          <div>
            <BiSearchAlt2 />
          </div>
          <div>
            <RiMoreFill />
          </div>
      </div>
    </div>
    <div className={style.photoAndFollowInfo}>
      <div className={style.photoAndFollowButton}>
        <div className={style.photoAndChangeButton}>
          <div className={style.photoContainer}>
            <img className={style.photo} src="/profile.jpg"/>
          </div>
          <div className={style.changePhotoButton}>+</div>
        </div>
        <div><button className={style.followButton}>follow</button></div>
      </div>
      <div className={style.followInfo}>
        <div className={style.followInfoNumber}><div style={{fontWeight: "700"}}>20</div>posts</div>
        <div className={style.followInfoNumber}><div style={{fontWeight: "700"}}>100</div>followers</div>
        <div className={style.followInfoNumber}><div style={{fontWeight: "700"}}>100</div>followings</div>
      </div>
    
    </div>
  </div>
  )
}

export default UserInfo