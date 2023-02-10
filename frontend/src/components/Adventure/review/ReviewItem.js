import React, { useState } from "react";
import style from "./ReviewItem.module.css";
import ReactStars from "react-rating-stars-component";

function ReviewItem({ data }) {
  // 상위 컴포넌트: AdventureDetailReview
  // props.data로 review 정보가 내려옴!
  // adventureReviewId
  // userId
  // nickname
  // rate
  // comment

  console.log("review Item");
  console.log(data);

  return (
    <div key={data.adventureReviewId} className={style.reviewListItem}>
      {/* 포토 src 바꿔주기 */}
      <img src="/images/completed.png" className={style.photo} />
      <div className={style.divForInfo}>
        <div className={style.mainInfo}>
          <div className={style.nickNameAndTier}>
            <div className={style.nickName}> {data.nickname}</div>
            <img className={style.tier} src={`/images/lv1.png`} />
          </div>
          <div className={style.rate}>
            <ReactStars
              count={data.rate}
              size={15}
              activeColor="#ffd700"
              value={data.grade}
              edit={false}
            />
          </div>
          <div className={style.comment}> {data.comment} </div>
        </div>
        <div className={style.date}> {data.createTime} </div>
      </div>
    </div>
  );
}

export default ReviewItem;
