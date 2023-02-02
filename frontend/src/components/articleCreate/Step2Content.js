import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import ArticleMap from "./ArticleMap";

import styles from "./Step2Content.module.css";

const Step2Content = ({ article, setArticle, checkPointList }) => {
  const navigate = useNavigate();

  const selectedAdv = checkPointList.filter((checkpoint) => {
    return checkpoint.id === article.adventureId;
  })[0];

  const handleInput = (e) => {
    setArticle((article) => ({
      ...article,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheck = (e) => {
    setArticle((article) => ({
      ...article,
      isPublic: article.isPublic,
    }));
  };

  const url = useSelector((state) => state.url);
  // const token = useSelector((state) => state.token);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjc1MzI1NjAzLCJleHAiOjE2NzU2ODU2MDN9.eiJgU-w2raqNDBciGlsrAAmO-0f0dVe_NgwjOSFAj1M";

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("lat", article.lat);
    formData.append("lng", article.lng);
    formData.append("isPublic", article.isPublic);
    formData.append("photo", article.photo);
    formData.append("isCheckPoint", article.isCheckPoint);
    formData.append("adventureId", article.adventureId);
    formData.append("adventurePlaceId", article.adventurePlaceId);
    // 제대로 처리하기
    axios
      .post(url + "/posts", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/write/3");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {article.isText ? (
        <div>
          <h1>선택된 위치</h1>
          <ArticleMap lat={article.lat} lng={article.lng} />
        </div>
      ) : (
        <div>
          <h1>선택된 사진</h1>
          <img
            className={styles.uploadedImage}
            src={article.preview}
            alt={article.photo.name}
          ></img>
          <p>{article.address}</p>
        </div>
      )}
      {article.isCheckPoint && (
        <div>
          <h1>선택된 탐험</h1>
          <p>
            {selectedAdv.adv} - {selectedAdv.checkpoint}
          </p>
        </div>
      )}
      <h1>게시글 작성</h1>
      <input
        type="text"
        name="title"
        placeholder="제목을 입력하세요"
        value={article.title}
        onChange={handleInput}
      />
      <textarea
        type="text"
        name="content"
        placeholder="내용을 입력하세요"
        value={article.content}
        onChange={handleInput}
      />
      <span>비공개</span>
      <input
        type="checkbox"
        name="isPublic"
        checked={article.isPublic}
        onChange={handleCheck}
      />
      <div>
        <button onClick={() => navigate(-1)}>이전</button>
        <button onClick={handleSubmit}>완료</button>
      </div>
    </>
  );
};

export default Step2Content;
