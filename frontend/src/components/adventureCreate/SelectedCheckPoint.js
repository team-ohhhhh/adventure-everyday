import React from "react";

import styles from "./SelectedCheckPoint.module.css";

const SelectedCheckPoint = ({ point }) => {
  console.log(point);
  return (
    <div className={styles.container}>
      <div>
        <h2>게시글 자리</h2>
      </div>
      <div>
        <input
          type="text"
          name="title"
          placeholder="체크포인트 이름을 설정해주세요"
          // value={article.title}
          // onChange={handleInput}
        />
        <textarea
          type="text"
          name="content"
          placeholder="체크포인트 내용을 입력해주세요"
          // value={article.content}
          // onChange={handleInput}
        />
        <input
          type="checkbox"
          name="isPrivate"
          // checked={article.isPrivate}
          // onChange={handleCheck}
        />
      </div>
    </div>
  );
};

export default SelectedCheckPoint;
