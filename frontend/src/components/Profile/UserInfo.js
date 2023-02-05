import React, { useState, useEffect, useRef } from 'react';
import style from './UserInfo.module.css'
import { BiSearchAlt2, BiPencil } from "react-icons/bi"
import { RxCheck, RxCross2 } from "react-icons/rx"
import axios from 'axios'
import { useSelector } from "react-redux"
import { useParams, useNavigate } from 'react-router-dom'
import MoreButton from './MoreButton'


function UserInfo(props) {
  const [user, setUser] = useState({})
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)
  const MyId = useSelector((state) => state.user.userId)
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])

  let navigate = useNavigate()
  let { userId } = useParams();

  const getFollowers = function() {
    axios({
      url: URL + `/users/followings/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setFollowers(res.data.result)
      
    })
    .catch((err) => {console.log(err)});
  }

  const getFollowings = function() {
    axios({
      url: URL + `/users/followers/${userId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {
      setFollowings(res.data.result)
    })
    .catch((err) => {console.log(err)});
  }




  const follow = function() {
    axios({
      url: URL + '/users/followings',
      method: 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        followingId: userId
      }
    })
    .then((res) => {
      console.log(res)
      // 이후 팔로잉/팔로워 목록 업데이트
    })
    .then((res) => {
      getFollowers()
    })
    .catch((err) => console.log(err))
  }

  

  const unfollow = function() {
    const relationId = followers.find((user) => user.userDetailRes.userId === MyId).followId //TODO: 여기 변수명 수정
    axios({
      url: URL + `/users/followers/${relationId}`, //TODO: 관계번호로 해야함...
      method: 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      console.log(res)
      // 이후 팔로잉/팔로워 목록 업데이트
    })
    .then((res) => {
      getFollowers()
    })
    .catch((err) => console.log(err))
  }

  
  

  useEffect(() => {
    axios({
      url: URL + `/users/${userId}`,
      method : 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      setUser(res.data.result)
    })
    .then((res) => {
      getFollowers(userId)
      getFollowings(userId)
    })
    .catch((err) => console.log(err))
    
   //TODO: BODY에서 errorCode 찾아서 404페이지로 보내기
  }, [userId])

  // 유저 사진 수정
  const imgRef = useRef()
  const changePhoto = function() {
    const file = imgRef.current.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('photo', file)
      axios.put(URL + "/users/photo", formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
      })
      .then((res) => {
        setUser(res.data.result) // 반환값을 그대로 반영
      })
      .catch((err) => console.log(err))

    }
  }

  // 자기소개 수정
  const [introduceModify, setIntroduceModify] = useState(false)
  const [newIntroduce, setNewIntroduce] = useState(user.introduce)
  const onChange = (e) => {
    setNewIntroduce(e.target.value)
  }
  const changeIntroduce = function() {
    axios({
      url : URL + '/users/profile',
      method: 'put',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        introduce : newIntroduce
      }
    })
    .then((res) => {
      setUser(res.data.result)
    })
    .then(() => setIntroduceModify(false))
    .catch((err) => {console.log(err)})
  }

  


 
  

  const isMe = (user.userId === MyId)
  return (
    <div className={style.userInfo} >
      <div className={style.nicknameAndSearchAndMore}>
        <div className={style.nicknameAndIntroduce}>
          <div className={style.nickName}>
              {user.nickname} <img src={`/images/lv${user.level}.png`} style={{height:"28px", weight:"28px"}}/>
          </div>
          <div className={style.introduce} style={{fontWeight: "500"}}>
            {!introduceModify
            ? (<div>
                {user.introduce} {user.userId === MyId &&<BiPencil onClick={()=>{setIntroduceModify(true)}}/>}
              </div>)
            : (<div><input onChange={onChange} defaultValue={user.introduce}/><RxCheck onClick={() => {changeIntroduce()}}/><RxCross2 onClick={() => {setIntroduceModify(false)}}/></div>)
            }
          </div>
        </div>
        <div className={style.searchAndMore}>
          <div>
            <BiSearchAlt2 onClick={() => {navigate('/search/user')}}/>

          </div>
          <div>
            {/* TODO: 팝업창 띄우기 부터 시작 */}
            <MoreButton isOn={props.isOn} toggle={props.toggle} isMe={isMe}/> 
          </div>
      </div>
    </div>
    <div className={style.photoAndFollowInfo}>
      <div className={style.photoAndFollowButton}>
        <div className={style.photoAndChangeButton}>
          <div className={style.photoContainer}>
            <img className={style.photo} src={user.photoUrl ? user.photoUrl : '/defaultProfile.jpg'}/>
          </div>
          {user.userId === MyId && <label htmlFor='photoChange'><div className={style.changePhotoButton}>+</div></label>}
          <input id='photoChange' type="file" accept={'image/*'} onChange={changePhoto} ref={imgRef} style={{display:"none"}}/>
        </div>
        {user.userId !== MyId && 
          <div style={{marginTop : '10px'}}>
            {followers.find(user => user.userDetailRes.userId === MyId) 
            ? <button onClick={() => {unfollow()}} className={style.unfollowButton}>unfollow</button> 
            : <button onClick={() => {follow()}} className={style.followButton}>follow</button>}
          </div>
        }
      </div>
      <div className={style.followInfo}>
        <div className={style.followInfoNumber}><div style={{fontWeight: "700"}}>20</div>posts</div>
        <div className={style.followInfoNumber} onClick={()=> {navigate(`/profile/${userId}/followers`)}}><div style={{fontWeight: "700"}}>{followers.length}</div>followers</div>
        <div className={style.followInfoNumber} onClick={()=> {navigate(`/profile/${userId}/followings`)}}><div style={{fontWeight: "700"}}>{followings.length}</div>followings</div>
      </div>
    </div>
  </div>
  )
}

export default UserInfo