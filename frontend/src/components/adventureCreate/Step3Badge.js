import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Step3Badge.module.css";
import styles2 from "../../pages/ArticleCreatePage.module.css";
import styles3 from "./Step2Content.module.css";
import styles4 from "./CheckPointItem.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";

const Step3Badge = ({ adventure, setAdventure, checkpoints }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInput = (e) => {
    setAdventure((adventure) => ({
      ...adventure,
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
    console.log(adventure);

    const formData = new FormData();
    formData.append("category", adventure.category);
    formData.append("featTitle", adventure.featTitle);
    formData.append("featContent", adventure.featTitle);
    formData.append("title", adventure.title);
    formData.append("content", adventure.content);
    formData.append("difficulty", adventure.difficulty);
    formData.append("startDate", adventure.startDate);
    formData.append("endDate", adventure.endDate);
    formData.append("photo", adventure.photo);

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
          JSON.stringify(checkpoints),
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

  const handleQuit = () => {
    if (checkpoints.length > 0) {
      const answer = window.confirm(
        "작성 중인 내용은 저장되지 않습니다. 작성을 취소하고 나가시겠습니까?"
      );
      if (answer) {
        navigate(-3);
      }
    } else {
      navigate(-3);
    }
  };

  return (
    <>
      <div className={styles2.closeContainer}>
        <AiOutlineClose onClick={handleQuit} size={35} />
      </div>

      <h1 className={styles2.header} style={{ marginTop: "1rem" }}>
        탐험 생성
      </h1>

      <div className={styles3.infoContainer}>
        <div className={styles3.subContainer}>
          <h2 className={styles3.subHeader}>탐험 보물</h2>
          <div className={styles.badgeBox}>
            <FaQuestion size={50} />
          </div>
          <div className={styles.badgeInfo}>
            보물의 모양은 탐험 생성 이후
            <br />
            상세 페이지에서 확인할 수 있어요
          </div>
        </div>

        <div className={styles3.subContainer}>
          <h2 className={styles3.subHeader}>탐험 칭호</h2>
          <input
            className={styles4.titleInput}
            style={{ textAlign: "center" }}
            type="text"
            name="feat"
            placeholder="탐험가들에게 부여할 칭호를 입력해주세요"
            value={adventure.feat}
            onChange={handleInput}
          />
        </div>
      </div>

      <div>
        <div>모든 준비가 완료되었나요?</div>
        <div>탐험을 만들고 나면 수정과 삭제가 불가능합니다</div>
      </div>

      <div className={styles2.btnContainer}>
        <div className={styles2.whiteBtn} onClick={() => navigate(-1)}>
          이전
        </div>
        <div className={styles2.blueBtn} onClick={openModal}>
          다음
        </div>
      </div>

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
