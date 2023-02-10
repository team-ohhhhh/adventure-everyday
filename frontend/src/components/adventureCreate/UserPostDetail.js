import React, { useMemo } from "react";

import styles from "./UserPostDetail.module.css";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

const UserPostDetail = ({ postDetail, closeModal, selectPost }) => {
  const date = useMemo(() => {
    return postDetail.createTime ? postDetail.createTime.substr(0, 10) : "";
  }, [postDetail.createTime]);

  const w3w = useMemo(() => {
    return postDetail.w3w ? postDetail.w3w.split(".").join(", ") : "";
  }, [postDetail.w3w]);

  return (
    <div>
      <div className={styles.modalWrap}>
        <div className={styles.photoWrap}>
          <img
            className={styles.photo}
            src={
              postDetail.photoUrl
                ? postDetail.photoUrl
                : "/images/noImage_rect.png"
            }
            alt={postDetail.title}
          />
          <div className={styles.w3wWrap}>
            <MdLocationOn size={16} />
            <div className={styles.w3w}>{w3w}</div>
          </div>

          <AiOutlineClose
            className={styles.closeBtn}
            onClick={closeModal}
            size={35}
          />
        </div>

        <div className={styles.notPhotoWrap}>
          <div className={styles.contentWrap}>
            <div className={styles.infoWrap}>
              <div className={styles.title}>{postDetail.title}</div>
              <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.content}>{postDetail.content}</div>
          </div>
        </div>

        <div className={styles.btnWrap}>
          <div className={styles.btn} onClick={() => selectPost(postDetail)}>
            <AiOutlineCheck size={23} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostDetail;
