import React, { useState } from "react";
import style from './BigArticleItem.module.css'
import { useNavigate } from "react-router-dom";

function BigArticleItem(props) {
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
  const w3w = '보라돌이, 뚜비, 나나'

  const navigate = useNavigate()

  return (
    <div key={ postId } className={style.articleListItem} onClick={() => {navigate(`/article/${postId}`)}}>
      <div className={style.photo} style={{backgroundImage: `url(${photo})`}}></div>
      
      <div className={style.titleAndW3w}>
        <div className={style.title}>{title}</div>
        <div className={style.w3w}>{w3w}</div>
      </div>
      <div className={style.date}>{date}</div>
  
    </div>
  )
}

export default BigArticleItem