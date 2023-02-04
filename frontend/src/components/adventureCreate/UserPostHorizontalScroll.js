import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import BigArticleItem from "../BigArticleItem";

import style from "./UserPostHorizontalScroll.module.css";

function HorizontalScroll({ posts, onPostClick }) {
  return (
    <div className={style.articleList}>
      <ScrollMenu>
        {posts.map((data) => {
          return (
            <BigArticleItem
              key={data.postId}
              data={data}
              onPostClick={onPostClick}
            />
          );
        })}
      </ScrollMenu>
    </div>
  );
}

export default HorizontalScroll;
