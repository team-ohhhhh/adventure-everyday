import React, { useState } from "react";
import './ArticleListItem.css'

function ArticleListItem(props) {
  const postId = props.articleListItem.post_id
  const title = props.articleListItem.title
  const photo = props.articleListItem.photo
  const nickName = props.articleListItem.nickName
  const date = props.articleListItem.date
  const tier = props.articleListItem.tier
  // const coordinate = props.coordinate
  const tierImage =  `./../../public/${tier}`

  return (
    <div key={ postId } className="articleListItem" onClick={() => {console.log("클릭")}}>
      <img src="images.jpg" className="photo" />
      <div className="divForInfo">
        <div>
          <div className="title"> { title } </div>
          <div className="nickNameAndTier"> <span className="nickName"> { nickName } </span> <img src="logo192.png"/></div>
        </div>
        <div className="date"> { date } </div>
      </div>
    </div>
  )
}

export default ArticleListItem