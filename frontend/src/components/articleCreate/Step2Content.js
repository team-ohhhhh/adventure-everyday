import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import useGeolocation from "react-hook-geolocation";

import ArticleMap from "./ArticleMap";

import { AiOutlineClose } from "react-icons/ai";

const Step2Content = ({ article, setArticle, checkPointList, styles }) => {
  const navigate = useNavigate();
  const geolocation = useGeolocation();

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleQuit = () => {
    if (!(article.photo || article.title || article.content)) {
      navigate(-2);
    } else {
      const answer = window.confirm(
        "작성 중인 내용은 저장되지 않습니다. 작성을 취소하고 나가시겠습니까?"
      );
      if (answer) {
        navigate(-2);
      }
    }
  };

  const handleInput = (e) => {
    setArticle((article) => ({
      ...article,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheck = (e) => {
    setArticle((article) => ({
      ...article,
      isPublic: !article.isPublic,
    }));
  };

  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);

  const handleSubmit = (e) => {
    if (article.isText && !geolocation.latitude) {
      alert(
        "위치 정보가 확인되지 않습니다. 위치 접근을 허용한 뒤 잠시 기다려주세요. 또는 위치 데이터가 존재하는 사진을 업로드하여 게시글 작성 바랍니다."
      );
      return;
    } else if (article.title.length < 1) {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (article.content.length < 5) {
      alert("내용을 5글자 이상 입력해주세요.");
      contentRef.current.focus();
      return;
    }

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

    axios
      .post(url + "/posts", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        navigate("/write/3");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.closeContainer}>
        <AiOutlineClose onClick={handleQuit} size={35} />
      </div>

      {article.isText ? (
        <div>
          <h1 className={styles.header} style={{ marginTop: "1rem" }}>
            선택된 장소
          </h1>
          <ArticleMap lat={article.lat} lng={article.lng} />
          <div className={styles.textContainer}>{article.address}</div>
        </div>
      ) : (
        <div>
          <h1 className={styles.header} style={{ marginTop: "1rem" }}>
            선택된 사진
          </h1>
          <img
            className={styles.uploadedImg}
            src={article.preview}
            alt={article.photo.name}
          ></img>
          <div className={styles.textContainer}>{article.address}</div>
        </div>
      )}

      {article.isCheckPoint && (
        <div>
          <h1 className={styles.header}>선택된 탐험</h1>
          <div className={styles.textContainer}>
            {article.adventureTitle} - {article.adventurePlaceTitle}
          </div>
        </div>
      )}

      <h1 className={styles.header}>게시글 작성</h1>
      <input
        className={styles.titleInput}
        type="text"
        name="title"
        placeholder="제목을 입력해주세요"
        value={article.title}
        onChange={handleInput}
        ref={titleRef}
      />
      <textarea
        className={styles.contentInput}
        type="text"
        name="content"
        placeholder="내용을 입력해주세요"
        value={article.content}
        onChange={handleInput}
        ref={contentRef}
      />
      <div className={styles.checkboxContainer}>
        <span>비공개</span>
        <input
          className={styles.input}
          type="checkbox"
          id="isPublic"
          name="isPublic"
          checked={!article.isPublic}
          onChange={handleCheck}
        />
        <label htmlFor="isPublic" className={styles.label}>
          비공개
        </label>
      </div>

      <div className={styles.btnContainer}>
        <div className={styles.whiteBtn} onClick={() => navigate(-1)}>
          이전
        </div>
        <div className={styles.blueBtn} onClick={handleSubmit}>
          완료
        </div>
      </div>
    </>
  );
};

export default Step2Content;
