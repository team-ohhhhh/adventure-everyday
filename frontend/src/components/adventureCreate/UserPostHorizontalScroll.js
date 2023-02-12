import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import UserPostHorizontalItem from "./UserPostHorizontalItem";

import style from "./UserPostHorizontalScroll.module.css";

function UserPostHorizontalScroll({
  posts,
  onPostClick,
  onPostMore,
  onPostSelect,
  checkpoints,
}) {
  const isSelected = (post) => {
    return !checkpoints.every((point) => point.postId !== post.postId);
  };

  return (
    <div className={style.articleList}>
      <ScrollMenu>
        {posts.map((post) => (
          <UserPostHorizontalItem
            key={post.postId}
            post={post}
            onPostClick={onPostClick}
            onPostMore={onPostMore}
            onPostSelect={onPostSelect}
            isSelected={isSelected(post)}
          />
        ))}
      </ScrollMenu>
    </div>
  );
}

export default UserPostHorizontalScroll;
