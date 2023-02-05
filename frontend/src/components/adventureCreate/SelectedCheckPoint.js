import React from "react";

import BigArticleItem from "../BigArticleItem";

import styles from "./SelectedCheckPoint.module.css";

const SelectedCheckPoint = ({ point, unSelectPost }) => {
  // console.log(point);
  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="체크포인트 이름을 설정해주세요"
          // value={article.title}
          // onChange={handleInput}
        />
        <button onClick={() => unSelectPost(point)}>삭제</button>
      </div>
      <div>
        대표
        <input
          type="checkbox"
          name="isRep"
          // checked={article.isRep}
          // onChange={handleCheck}
        />
        <BigArticleItem data={point} />
      </div>
      <textarea
        type="text"
        name="content"
        placeholder="체크포인트 내용을 입력해주세요"
        // value={article.content}
        // onChange={handleInput}
      />
    </div>
  );
};

export default SelectedCheckPoint;
