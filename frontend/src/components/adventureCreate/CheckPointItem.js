import React from "react";

import BigArticleItem from "./BigArticleItem";

import styles from "./CheckPointItem.module.css";
import { AiOutlineClose } from "react-icons/ai";

const CheckPointItem = ({
  idx,
  point,
  deselectPost,
  setCheckpoints,
  isRep,
  setAdventure,
}) => {
  const handleInput = (e) => {
    setCheckpoints((checkpoints) => {
      return checkpoints.map((checkpoint) => {
        if (checkpoint.postId === point.postId) {
          return { ...checkpoint, [e.target.name]: e.target.value };
        } else {
          return checkpoint;
        }
      });
    });
  };

  const handleCheck = () => {
    setAdventure((adventure) => ({
      ...adventure,
      RepresentativePostId: point.postId,
    }));
  };

  return (
    <div className={styles.checkpointContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.checkpointName}>체크포인트 {idx}</h2>
        <AiOutlineClose
          className={styles.closeBtn}
          onClick={() => deselectPost(point)}
          size={25}
        />
      </div>

      <div className={styles.articleContainer}>
        <BigArticleItem data={point} />
        {/* {point.postDetail.photo && ( */}
        <div
          className={isRep ? styles.rep : `${styles.rep} ${styles.notRep}`}
          onClick={handleCheck}
        >
          대표
        </div>
        {/* )} */}
      </div>

      <input
        className={styles.titleInput}
        type="text"
        name="adventurePlaceTitle"
        placeholder="체크포인트 이름을 설정해주세요"
        value={point.adventurePlaceTitle}
        onChange={handleInput}
      />
      <textarea
        className={styles.contentInput}
        type="text"
        name="adventurePlaceContent"
        placeholder="체크포인트 내용을 입력해주세요"
        value={point.adventurePlaceContent}
        onChange={handleInput}
      />
    </div>
  );
};

export default React.memo(CheckPointItem);
