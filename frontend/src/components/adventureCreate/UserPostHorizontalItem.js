import React from "react";

import BigArticleItem from "./BigArticleItem";

function UserPostHorizontalItem({ post, onPostClick, onPostSelect }) {
  return (
    <>
      <button onClick={() => onPostSelect(post)}>선택</button>
      <div
        style={{ width: "80vw", marginLeft: "1.5rem" }}
        key={post.postId}
        onClick={() => {
          onPostClick(post);
        }}
      >
        <BigArticleItem
          post={{ ...post, photo: post.photoUrl, date: post.createTime }}
        />
      </div>
    </>
  );
}

export default UserPostHorizontalItem;
