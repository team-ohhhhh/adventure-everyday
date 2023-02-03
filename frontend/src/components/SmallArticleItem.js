import React, { useState } from "react";
import style from "./SmallArticleItem.module.css";

function SmallArticleItem(props) {
  // //변수 꺼내쓰기
  // const postId = props.data.postId
  // const title = props.data.title
  // const constent = props.data.content
  // const w3w = props.data.w3w
  // const createdTime = props.data.createdTime
  // const updatedTime = props.data.updatedTime
  // // 포토 변수명 체크
  // const photo = props.data.photo
  // const userDetailRes = props.data.userDetailRes

  const postId = 1
  const photo = "/images.jpg"
  const title = "title"
  const nickName = "nickName"
  const tier = 1
  const date = 'yy.mm.dd'


  return (
    <div
      key={postId}
      className={style.articleListItem}
      onClick={() => {
        console.log("클릭");
      }}
    >
      {/* 포토 src 바꿔주기 */}
      <img src={photo} className={style.photo} />
      <div className={style.divForInfo}>
        <div>
          <div className={style.title}> {title} </div>
          <div className={style.nickNameAndTier}>
            <span className={style.nickName}> {nickName} </span>
            <img className={style.tier} src={`/images/lv${tier}.png`} />
          </div>
        </div>
        <div className={style.date}> {date} </div>
      </div>
    </div>
  );
}

export default SmallArticleItem;
