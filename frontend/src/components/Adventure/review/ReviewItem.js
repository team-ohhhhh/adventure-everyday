import React, { useState } from "react";
import style from "./ReviewItem.module.css";
import ReactStars from "react-rating-stars-component";
import {RiMoreFill} from "react-icons/ri"
import { useSelector } from "react-redux";
import axios from 'axios'

function ReviewItem({ data, setReviewMoreButton, setWhichReviewButton, reviewMoreButton, whichReviewButton, ReadReview }) {
  // 상위 컴포넌트: AdventureDetailReview
  // props.data로 review 정보가 내려옴!
  // adventureReviewId
  // userId
  // nickname
  // rate
  // comment
  console.log(data)

  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)
  const USER = useSelector((state) => state.user)

  // 삭제 관련
  const [wouldYouDelete, setWouldYouDelete] = useState(false)
  const deleteReview = function() {
    axios({
      url : URL + `/adventures/reviews/${data.adventureReviewId}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      ReadReview()
    })
  }

  // 수정 관련
  const [wouldYouUpdate, setWouldYouUpdate] = useState(false)
  const [newReview, setNewReview] = useState(data.content)
  const [newRate, setNewRate] = useState(data.rate)
  const onChange = function(e) {
    setNewReview(e.target.value)
  }
  const rateUpdate = function(newRating) {
    setNewRate(newRating)
  }
  const updateReview = function() {
    axios({
      url : URL + `/adventures/reviews/${data.adventureReviewId}`,
      method : 'put',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        content : newReview,
        grade : newRate
      }
    })
    .then((res) => {
      ReadReview()
      setWouldYouUpdate(false)
    })
    .catch((err) => console.log(err))
  }



  


  return (
    <div key={data.adventureReviewId} style={{width : "100%", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      {!wouldYouDelete 
      ? <div className={style.reviewListItem}> 
      <img src="/images/completed.png" className={style.photo} />
        <div className={style.divForInfo}>
          <div className={style.mainInfo}>
            <div className={style.nicknameAndMoreButton}>
              <div className={style.nickNameAndTier}>
                <div className={style.nickName}> {data.nickname}</div>
                <img className={style.tier} src={`/images/lv1.png`} />
              </div>
                {data.userId === USER.userId &&
                (wouldYouUpdate
                ? <div><span onClick={()=>{updateReview()}}>수정</span><span onClick={()=>{setWouldYouUpdate(false)}} style={{marginLeft:"1.5vw"}}>취소</span></div>
                : reviewMoreButton && whichReviewButton === data.adventureReviewId 
                ? <div><span onClick={()=>{setWouldYouDelete(true)}}>삭제</span><span style={{marginLeft:"1.5vw"}} onClick={()=>setWouldYouUpdate(true)}>수정</span></div>
                : <div><RiMoreFill onClick={() => {setReviewMoreButton(true); setWhichReviewButton(data.adventureReviewId); console.log()}}/></div>)}
            </div>
            <div className={style.rate}>
              {wouldYouUpdate && <ReactStars
                // count={data.rate}
                size={15}
                activeColor="#ffd700"
                value={data.rate}
                onChange={rateUpdate}
                edit={true}
              />}
              {!wouldYouUpdate && 
              <div style={{color:"#ffd700"}}>{"★".repeat(data.rate) + "☆".repeat(5-data.rate)}</div>}
            </div>
            {wouldYouUpdate 
              ? <input onChange={onChange} defaultValue={data.content}/>
              :<div className={style.comment}> {data.content} </div>
            }
          </div>
          <div className={style.date}> {data.createTime ? data.createTime.substr(0, 10) : null} </div>
        </div>
      </div> 
      : <div className={style.reviewListItem}>
          삭제 하시겠습니까?
          <button onClick={()=>{deleteReview()}}>삭제</button>
          <button onClick={()=>{setWouldYouDelete(false)}}>취소</button>
        </div>
      }
      
    </div>
  );
}

export default ReviewItem;
