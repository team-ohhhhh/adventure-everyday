import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import UserPostHorizontalItem from "./UserPostHorizontalItem";

import style from "./UserPostHorizontalScroll.module.css";

function UserPostHorizontalScroll({ posts, onPostClick, onPostMore }) {
  return (
    <div className={style.articleList}>
      <ScrollMenu>
        {posts.map((post) => (
          <UserPostHorizontalItem
            key={post.postId}
            post={post}
            onPostClick={onPostClick}
            onPostMore={onPostMore}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}

export default UserPostHorizontalScroll;
