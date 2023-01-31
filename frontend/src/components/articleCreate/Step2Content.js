import React from "react";
import styles from "./Step2Content.module.css";

const Step2Content = ({ article, setStep, address, advList, setArticle }) => {
  const selectedAdv = advList.filter((advItem) => {
    return advItem.id === article.advId;
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
      isPrivate: !article.isPrivate,
    }));
  };

  return (
    <>
      <h1>게시글 정보</h1>
      {article.type === "image" && (
        <div>
          <h2>선택된 사진</h2>
          <img
            className={styles.uploadedImage}
            src={article.image.preview}
            alt={article.image.name}
          ></img>
        </div>
      )}
      <div>
        <h2>선택된 장소</h2>
        <p>{address}</p>
      </div>
      {article.isAdv && (
        <div>
          <h2>선택된 모험</h2>
          <p>
            {selectedAdv.adv} - {selectedAdv.checkpoint}
          </p>
        </div>
      )}
      <h1>내용 작성</h1>
      <h2>제목</h2>
      <input
        type="text"
        name="title"
        placeholder="제목을 입력하세요"
        value={article.title}
        onChange={handleInput}
      />
      <h2>내용</h2>
      <textarea
        type="text"
        name="content"
        placeholder="내용을 입력하세요"
        value={article.content}
        onChange={handleInput}
      />
      <h2>비공개 여부</h2>
      <input
        type="checkbox"
        name="isPrivate"
        checked={article.isPrivate}
        onChange={handleCheck}
      />
      <div>
        <button onClick={() => setStep((step) => step - 1)}>이전</button>
        <button onClick={() => setStep((step) => step + 1)}>완료</button>
      </div>
    </>
  );
};

export default Step2Content;
