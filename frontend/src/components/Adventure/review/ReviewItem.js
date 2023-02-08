import React, { useState } from "react";
import style from "./ReviewItem.module.css";

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
    <div key={data.adventureReviewId} className={style.articleListItem}>
      {/* 포토 src 바꿔주기 */}
      <img src="/alien.jpg" className={style.photo} />
      <div className={style.divForInfo}>
        <div>
          <div className={style.title}> {data.comment} </div>
          <div className={style.nickNameAndTier}>
            <span className={style.nickName}> {data.nickname} </span>
            <img className={style.tier} src={`/images/lv1.png`} />
          </div>
        </div>
        <div className={style.date}> {data.createTime} </div>
      </div>
    </div>
  );
}

export default ReviewItem;
