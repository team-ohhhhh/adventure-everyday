import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserPostMap from "./UserPostMap";

import styles from "./SelectPostModal.module.css";

const SelectPostModal = ({ closeModal, selectPost }) => {
  const [posts, setPosts] = useState([]);

  // 모달 마운트 시 유저가 쓴 글 조회
  const url = useSelector((state) => state.url);
  const userId = "1";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1NjAxMDY5LCJleHAiOjE2NzU5NjEwNjl9.hLb1M2qGM2omvM6mrMqkOMKCxh-GFLKOtpBVhCgewFg";

  useEffect(() => {
    axios({
      url: url + "/posts/users/" + userId,
      method: "get",
      headers: {
        Authorization: "Bearer " + TOKEN,
      },
    })
      .then((res) => {
        setPosts(res.data.result);
        // console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.modalWrap}>
      <button onClick={closeModal}>close</button>
      <h1>탐험으로 만들</h1>
      <h1>내 글을 선택하세요</h1>
      <UserPostMap posts={posts} selectPost={selectPost} />
    </div>
  );
};

export default SelectPostModal;
