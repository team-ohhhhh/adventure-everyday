import React, { useState } from "react";
import style from "./SmallArticleItem.module.css";
import { useNavigate } from 'react-router-dom'

function SmallArticleItem(props) {

  //변수 꺼내쓰기
  const postId = props.data.postId
  const title = props.data.title
  const constent = props.data.content
  const w3w = props.data.w3w
  const createdTime = props.data.createTime

  // 포토 변수명 체크
  const photo = props.data.phototUrl
  const userDetailRes = props.data.userDetailRes


  const navigate = useNavigate()
  return (
    <div
      key={postId}
      className={style.articleListItem}
      onClick={() => {
        navigate(`/article/${postId}`);
      }}
    >
      {/* 포토 src 바꿔주기 */}
      <img src={props.data.photoUrl ? props.data.photoUrl : 'images/advImg5.png'} className={style.photo} />
      <div className={style.divForInfo}>
        <div>
          <div className={style.title}> {title} </div>
          <div className={style.nickNameAndTier}>
            <span className={style.nickName}> {userDetailRes.nickname} </span>
            <img className={style.tier} src={`/images/lv${userDetailRes.level}.png`} />
          </div>
        </div>
        <div className={style.date}> {props.data.createTime} </div>
      </div>
    </div>
  );
}

export default SmallArticleItem;
