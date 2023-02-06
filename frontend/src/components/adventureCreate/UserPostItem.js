import React from "react";

import style from "./UserPostItem.module.css";

function UserPostItem(props) {
  //변수 꺼내쓰기
  const postId = props.data.postId;
  const title = props.data.title;
  // const content = props.data.content;
  const w3w = props.data.w3w;
  const date = props.data.createdTime.substr(0, 10);
  const photo = props.data.postUrl;
  // const userDetailRes = props.data.userDetailRes;

  return (
    <div>
      <button onClick={() => props.onPostSelect(props.data)}>선택</button>
      <div
        key={postId}
        className={style.articleListItem}
        onClick={() => {
          // console.log("클릭", postId);
          props.onPostClick(props.data);
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
        <div className={style.date}>{date}</div>
      </div>
    </div>
  );
}

export default UserPostItem;
