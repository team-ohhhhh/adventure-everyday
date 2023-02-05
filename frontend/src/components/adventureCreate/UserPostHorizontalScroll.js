import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import UserPostItem from "./UserPostItem";

import style from "./UserPostHorizontalScroll.module.css";

function UserPostHorizontalScroll({ posts, onPostClick, onPostSelect }) {
  return (
    <div className={style.articleList}>
      <ScrollMenu>
        {posts.map((data) => {
          return (
            <UserPostItem
              key={data.postId}
              data={data}
              onPostClick={onPostClick}
              onPostSelect={onPostSelect}
            />
          );
        })}
      </ScrollMenu>
    </div>
  );
}

export default UserPostHorizontalScroll;
