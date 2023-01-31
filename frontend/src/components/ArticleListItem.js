import React, { useState } from "react";
import style from "./ArticleListItem.module.css";

function ArticleListItem(props) {
  const postId = props.articleListItem.post_id;
  const title = props.articleListItem.title;
  const photo = props.articleListItem.photo;
  const nickName = props.articleListItem.nickName;
  const date = props.articleListItem.date;
  const tier = props.articleListItem.tier;
  // const coordinate = props.coordinate
  const tierImage = `./../../public/${tier}`;

  return (
    <div
      key={postId}
      className={style.articleListItem}
      onClick={() => {
        console.log("클릭");
      }}
    >
      <img src="images.jpg" className={style.photo} />
      <div className={style.divForInfo}>
        <div>
          <div className={style.title}> {title} </div>
          <div className={style.nickNameAndTier}>
            {" "}
            <span className={style.nickName}> {nickName} </span>{" "}
            <img src="logo192.png" />
          </div>
        </div>
        <div className={style.date}> {date} </div>
      </div>
    </div>
  );
}

export default ArticleListItem;
