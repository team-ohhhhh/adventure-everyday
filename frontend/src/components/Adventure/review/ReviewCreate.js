import styles from "./ReviewCreate.module.css";
import ReactStars from "react-rating-stars-component";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

function ReviewCreate() {
  const navigate = useNavigate();
  const params = useParams();
  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  const [content, setContent] = useState([]);
  const [grade, setGrade] = useState([]);

  const ratingChanged = (newRating) => {
    setGrade(newRating);
  };

  const handleQuit = () => {
    const answer = window.confirm(
      "작성 중인 내용은 저장되지 않습니다. 작성을 취소하고 나가시겠습니까?"
    );
    if (answer) {
      navigate(-1);
    }
  };

  const handleInput = (e) => {
    setContent(e.target.value);
  };

  function CreateReview() {
    if (grade < 1) {
      alert('별점을 입력해 주세요!')
    } else {
    axios({
      url: URL + `/adventures/${params.id}/reviews`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "post",
      data: {
        content,
        grade,
      },
    })
      .then((response) => {
        console.log("axios 성공");
        console.log(response.data.result);
        console.log(content);
        console.log(grade);
        navigate(`/adventure/detail/${params.id}/createReview/complete`); // 후기 작성 완료 페이지로 이동
      })
      .catch((err) => {
        console.log(err);
        console.log(content);
        console.log(grade);
      });
    }}

  return (
    <div className="pageContainer">
      <div className={styles.reviewContainer}>
        <div className={styles.header}>
          <img className={styles.decoIcon4} src="/images/decoIcon4.png"></img>
        </div>
        <div className={styles.title}>
          탐험의 후기를 <br></br>작성해주세요.
        </div>
        <div className={styles.stars}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />
        </div>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.contentInput}
            type="text"
            name="content"
            placeholder="이 탐험은 당신에게 어떤 의미였나요?"
            onChange={handleInput}
          />
        </div>

        <div className={styles.buttons}>
          <div className={styles.whiteBtn} onClick={handleQuit}>
            취소
          </div>
          <div className={styles.blueBtn} onClick={CreateReview}>
            완료
          </div>
        </div>
        <div className={styles.footer}>
          <img className={styles.decoIcon3} src="/images/decoIcon3.png"></img>
        </div>
      </div>
    </div>
  );
}

export default ReviewCreate;
