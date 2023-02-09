import React from "react";

import BigArticleItem from "./BigArticleItem";

import styles from "./UserPostHorizontalItem.module.css";
import { RxMagnifyingGlass } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

function UserPostHorizontalItem({
  post,
  onPostClick,
  onPostMore,
  onPostSelect,
  isSelected,
}) {
  return (
    <div style={{ position: "relative" }}>
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
      <div className={styles.btnContainer}>
        <div className={styles.btn} onClick={() => onPostMore(post)}>
          <RxMagnifyingGlass size={23} />
        </div>
        <div
          className={`${styles.btn} ${isSelected ? styles.selected : ""}`}
          onClick={() => onPostSelect(post)}
        >
          <AiOutlineCheck size={23} />
        </div>
      </div>
    </div>
  );
}

export default UserPostHorizontalItem;
