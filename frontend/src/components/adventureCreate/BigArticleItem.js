import React, { useMemo } from "react";

import style from "./BigArticleItem.module.css";

function BigArticleItem({ post }) {
  const date = useMemo(() => {
    return post.date ? post.date.substr(0, 10) : "";
  }, [post.date]);

  const w3w = useMemo(() => {
    return post.w3w ? post.w3w.split(".").join(", ") : "";
  }, [post.w3w]);

  return (
    <div key={post.postId} className={style.articleListItem}>
      <div
        className={style.photo}
        style={{
          backgroundImage: `url(${
            post.photo ? post.photo : "/images/emptyBanner3.png"
          })`,
        }}
      ></div>

      <div className={style.titleAndW3w}>
        <div className={style.title}>{post.title}</div>
        <div className={style.w3w}>{w3w}</div>
      </div>

      <div className={style.date}>{date}</div>
    </div>
  );
}

export default BigArticleItem;
