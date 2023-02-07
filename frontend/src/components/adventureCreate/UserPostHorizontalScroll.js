import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import UserPostHorizontalItem from "./UserPostHorizontalItem";

import style from "./UserPostHorizontalScroll.module.css";

function UserPostHorizontalScroll({ posts, onPostClick, onPostSelect }) {
  return (
    <div className={style.articleList}>
      <ScrollMenu>
        {posts.map((post) => {
          return (
            <UserPostHorizontalItem
              key={post.postId}
              post={post}
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
