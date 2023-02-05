import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import UserPostMap from "./UserPostMap";

import styles from "./SelectPostModal.module.css";

const SelectPostModal = ({ closeModal, selectPost }) => {
  const [posts, setPosts] = useState([]);

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
