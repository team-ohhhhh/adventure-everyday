import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserPostMap from "./UserPostMap";

import styles from "./SelectPostModal.module.css";

const SelectPostModal = ({ closeModal }) => {
  const [posts, setPosts] = useState([]);

  // 모달 마운트 시 유저가 쓴 글 조회
  const URL = useSelector((state) => state.URL);
  const userId = "1";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1NDEzNTk2LCJleHAiOjE2NzU3NzM1OTZ9.bL68Q9tSsRRGETi1WvItEEuWXEoy74VHTzp06LlOMNo";

  useEffect(() => {
    axios({
      url: URL + "/posts/users/" + userId,
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
      <UserPostMap posts={posts} />
    </div>
  );
};

export default SelectPostModal;
