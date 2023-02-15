import React, { useState } from "react";
import style from "./BigArticleItem.module.css";
import { useNavigate } from "react-router-dom";

function BigArticleItem({postId, title, w3w, date, photo, isAdventure}) {

  const navigate = useNavigate();

  return (
    <div
      key={postId}
      className={isAdventure? style.articleListAdventureItem : style.articleListItem}
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
