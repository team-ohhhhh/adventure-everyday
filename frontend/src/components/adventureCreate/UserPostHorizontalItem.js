import React from "react";

import style from "./UserPostHorizontalItem.module.css";

function UserPostHorizontalItem({ post, onPostClick, onPostSelect }) {
  return (
    <div>
      <button onClick={() => onPostSelect(post)}>선택</button>
      <div
        key={post.postId}
        className={style.articleListItem}
        onClick={() => {
          onPostClick(post);
        }}
      >
        <div
          className={style.photo}
          style={{ backgroundImage: `url(${post.photo})` }}
        ></div>

        <div className={style.titleAndW3w}>
          <div className={style.title}>{post.title}</div>
          <div className={style.w3w}>{post.w3w}</div>
        </div>
        <div className={style.date}>{post.date}</div>
      </div>
    </div>
  );
}

export default UserPostHorizontalItem;
