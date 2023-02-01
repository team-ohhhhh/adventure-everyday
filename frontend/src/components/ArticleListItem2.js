import React, { useState } from "react";
import style from './ArticleListItem2.module.css'

function ArticleListItem2(props) {
  const postId = props.articleListItem.post_id
  const title = props.articleListItem.title
  const photo = 'images.jpg'
  const nickName = props.articleListItem.nickName
  const date = props.articleListItem.date
  const tier = props.articleListItem.tier
  // const coordinate = props.coordinate
  const tierImage =  `./../../public/${tier}`

  return (
    <div key={ postId } className={style.articleListItem} onClick={() => {console.log("클릭", postId)}}>
      <div className={style.photo} style={{backgroundImage: `url(${photo})`}}></div>
      <div className={style.title}>{title}</div>
      <div className={style.nickName}>{nickName}</div>
      <div className={style.date}>{date}</div>
    </div>
  )
}

export default ArticleListItem2