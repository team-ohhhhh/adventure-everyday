import React, { useState } from "react";
import style from './ArticleListItem.module.css'

function ArticleListItem(props) {
  const postId = props.articleListItem.postId
  const title = props.articleListItem.title
  
  const date = props.articleListItem.date
  // 작성자 관련 정보
  // const userDetail = props.articleListItem.userDetail
  const nickName = props.articleListItem.nickName  //userDetail.nickName
  const level = 1 //userDetail.level
  //TODO: S3에서 올 사진 URI
  const photo = props.articleListItem.photo

  

  return (
    <div key={ postId } className={style.articleListItem} onClick={() => {console.log("클릭")}}>
      {/* 포토 src 바꿔주기 */}
      <img src="images.jpg" className={style.photo} /> 
      <div className={style.divForInfo}>
        <div>
          <div className={style.title}> { title } </div>
          <div className={style.nickNameAndTier}> <span className={style.nickName}> { nickName } </span> <img className={style.tier} src={`images/lv${level}.png`}/></div>
        </div>
        <div className={style.date}> { date } </div>
      </div>
    </div>
  )
}

export default ArticleListItem