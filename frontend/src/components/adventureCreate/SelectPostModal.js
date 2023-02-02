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
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1Mjk2MjUwLCJleHAiOjE2NzU2NTYyNTB9.Vq2XbED6j1xf1xmVN8iJojElHMx237-XNShpoU0aq2Q";
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.modalWrap}>
      <button onClick={closeModal}>close</button>
      <h1>
        탐험으로 만들 <br />내 글을 선택하세요
      </h1>
      <UserPostMap
        posts={[
          {
            content: "딸샷추 궁금해",
            createdTime: "2023-02-02T00:06:06",
            nearestPlace: "서울특별시",
            postId: 1,
            title: "딸기라떼",
            updatedTime: "2023-02-02T00:06:06",
            userId: 1,
            w3w: "나가는.오리다.그물",
            lat: 37.517186,
            lng: 127.04128,
          },
          {
            content: "맛있읍니다",
            createdTime: "2023-02-02T00:07:47",
            nearestPlace: "서울특별시",
            postId: 2,
            title: "범표라떼",
            updatedTime: "2023-02-02T00:07:47",
            userId: 1,
            w3w: "나가는.오리다.그물",
            lat: 37.540693,
            lng: 127.07023,
          },
          {
            content: "멀캠입니다",
            createdTime: "2023-02-02T00:07:47",
            nearestPlace: "서울특별시",
            postId: 3,
            title: "멀티캠퍼스",
            updatedTime: "2023-02-02T00:07:47",
            userId: 1,
            w3w: "나가는.오리다.그물",
            lat: 37.50128745884959,
            lng: 127.03956225524968,
          },
          {
            content: "멀캠입니다2",
            createdTime: "2023-02-02T00:07:47",
            nearestPlace: "서울특별시",
            postId: 4,
            title: "멀티캠퍼스2",
            updatedTime: "2023-02-02T00:07:47",
            userId: 1,
            w3w: "나가는.오리다.그물",
            lat: 37.50148714,
            lng: 127.0395622,
          },
          {
            content: "딸샷추 궁금해",
            createdTime: "2023-02-02T00:06:06",
            nearestPlace: "서울특별시",
            postId: 5,
            title: "딸기라떼",
            updatedTime: "2023-02-02T00:06:06",
            userId: 1,
            w3w: "나가는.오리다.그물",
            lat: 37.517186,
            lng: 127.04128,
          },
        ]}
      />
    </div>
  );
};

export default SelectPostModal;
