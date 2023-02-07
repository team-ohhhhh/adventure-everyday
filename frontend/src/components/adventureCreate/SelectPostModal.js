import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserPostMap from "./UserPostMap";

import styles from "./SelectPostModal.module.css";
import styles2 from "../../pages/ArticleCreatePage.module.css";
import { AiOutlineClose } from "react-icons/ai";

const SelectPostModal = ({ myPosts, setMyPosts, closeModal, selectPost }) => {
  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  // 모달 마운트 시 유저가 쓴 글 조회
  useEffect(() => {
    axios({
      url: url + "/posts/users/" + user.userId,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        // console.log(res.data.result);
        setMyPosts(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mapRef = useRef();

  const userHeight = useMemo(() => {
    const map = mapRef.current;
    const mapHeight = map.getBoundingClientRect();
    const viewHeight = document.documentElement.clientHeight;
    console.log(viewHeight);
  }, [mapRef.current]);

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalBody}>
        <AiOutlineClose
          className={styles.closeBtn}
          onClick={closeModal}
          size={30}
        />
        <h1 className={styles2.header}>
          탐험으로 만들
          <br />내 글을 선택하세요
        </h1>
      </div>
      <div ref={mapRef}>
        <UserPostMap
          myPosts={myPosts}
          selectPost={selectPost}
          userHeight={userHeight}
        />
      </div>
    </div>
  );
};

export default SelectPostModal;
