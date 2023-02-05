import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Step3Badge.module.css";

const Step3Badge = ({ adv, setAdv, advCheckPoints }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e) => {
    setAdv((adv) => ({
      ...adv,
      [e.target.name]: e.target.value,
    }));
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const url = useSelector((state) => state.url);
  const token = useSelector((state) => state.token);

  const handleSubmit = (e) => {
    console.log(adv);

    const formData = new FormData();
    formData.append("category", adv.category);
    formData.append("featTitle", adv.featTitle);
    formData.append("featContent", adv.featTitle);
    formData.append("title", adv.title);
    formData.append("content", adv.content);
    formData.append("difficulty", adv.difficulty);
    formData.append("startDate", adv.startDate);
    formData.append("endDate", adv.endDate);
    formData.append("photo", adv.photo);

    axios
      .post(url + "/adventures", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const advId = res.data.result.adventureId;
        axios.post(
          url + "/adventures/" + advId + "/places",
          JSON.stringify(advCheckPoints),
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then(() => {
        navigate("/adventure/create/4");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>탐험 생성</h1>

      <h2>내 탐험의 보물</h2>
      <div>물음표</div>
      <p>보물의 모양은 탐험 생성 이후</p>
      <p>상세 페이지에서 확인할 수 있어요</p>

      <h2>내 탐험의 칭호</h2>
      <input
        type="text"
        name="featTitle"
        placeholder="내 탐험을 완료한 탐험가들에게 부여할 칭호를 적어주세요"
        value={adv.featTitle}
        onChange={handleInput}
      />

      <p>모든 준비가 완료되었나요?</p>
      <p>탐험을 만들고 나면 수정과 삭제가 불가능합니다</p>

      <button onClick={() => navigate(-1)}>이전</button>
      <button onClick={openModal}>다음</button>

      {showModal && (
        <div className={styles.modalWrap}>
          <p>곧 모험이 완성됩니다</p>
          <p>탐험을 완성하고 나면 수정과 삭제가 불가능합니다</p>
          <button onClick={closeModal}>취소</button>
          <button onClick={handleSubmit}>완료</button>
        </div>
      )}
    </>
  );
};

export default Step3Badge;
