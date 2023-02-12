import React, { useState } from "react";
import style from "./BigArticleItem.module.css";
import { useNavigate } from "react-router-dom";

function BigArticleItem({postId, title, w3w, date, photo}) {
  // console.log(props.data);
  //변수 꺼내쓰기
  
  // const userDetailRes = props.data.userDetailRes;

  // // dummy data
  // const postId = 1
  // const photo = "/images.jpg"
  // const title = "title"
  // const nickName = "nickName"
  // const tier = 1
  // const date = 'yy.mm.dd'
  // const w3w = '보라돌이, 뚜비, 나나'

  const navigate = useNavigate();

  return (
    <div
      key={postId}
      className={style.articleListItem}
      onClick={() => {
        navigate(`/article/${postId}`);
      }}
    >
      <div
        className={style.photo}
        style={{ backgroundImage: `url(${photo})` }}
      ></div>

      <div className={style.titleAndW3w}>
        <div className={style.title}>{title}</div>
        <div className={style.w3w}>{w3w}</div>
      </div>
      <div className={style.date}>{date && date.substr(0, 10)}</div>
    </div>
  );
}

export default BigArticleItem;
