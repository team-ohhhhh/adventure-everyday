import styles from "./AdventureInfo.module.css";
import ProfileCircle from "../ProfileCircle";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import ParticipantsCircle from "./ParticipantsCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function AdventureInfo(props) {
  console.log("ad info");
  console.log(props.info); // 이 부분이 부모 컴포넌트 첫 렌더링 땐 undefined이고 리렌더링 될 땐 나옴

  const params = useParams(); // 특정 탐험 id가져오기
  const navigate = useNavigate();

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  let photoList = [];
  // 참가자 컴포넌트 props로 내려주기 위해 id와 url 쌍으로 오는 배열을 url 배열로만 만들어주기
  if (props.info.userIdPhotoUrlList) {
    photoList = props.info.userIdPhotoUrlList.map(
      (IdUrlList) => IdUrlList.photoUrl
    );
  }

  // 참가하기 함수
  function Participate() {
    axios({
      url: URL + `/adventures/${params.id}/adventure-in-progress`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "post",
    }).then((response) => {
      console.log("참가 결과");
      props.getAdventureDetail();
    });
  }

  // 포기하기 함수
  function Giveup() {
    axios({
      url: URL + `/adventures/${params.id}/adventure-in-progress`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "delete",
    }).then((response) => {
      console.log("포기되었습니다.");
      props.getAdventureDetail();
    });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{props.info.adventureTitle}</div>
          <img
            className={styles.diff}
            src={`/images/diff_${props.info.adventureDifficulty}.png`}
          ></img>
        </div>
        <div className={styles.period}>
          {props.info.adventureStartDate && (
            <span>
              {props.info.adventureStartDate.substr(0, 10)}~
              {props.info.adventureEndDate.substr(0, 10)}
            </span>
          )}
        </div>
        <div className={styles.content}>{props.info.adventureContent}</div>
        <div className={styles.people}>
          <div className={styles.maker}>
            <div className={styles.makerProfileContainer}>
              <ProfileCircle
                src={
                  props.info.userIdPhotoUrl
                    ? props.info.userIdPhotoUrl.photoUrl
                    : "/defaultProfile.jpg"
                }
              ></ProfileCircle>
            </div>
            <div className={styles.makerNameAndTierContainer}>
              <span className={styles.makerName}>탐험가</span>
              <div className={styles.makerNameAndTier}>
                <span className={styles.makerName}>
                  {" "}
                  {props.info.userNickname}{" "}
                </span>
                <img
                  className={styles.makerTier}
                  src={`/images/lv${props.info.userLevel}.png`}
                />
              </div>
            </div>
          </div>
          <div
            className={styles.participants}
            onClick={() => {
              navigate(
                `/adventure/detail/${props.info.adventureId}/adventure-in-progress-list`
              );
            }}
          >
            <ParticipantsCircle photoList={photoList}></ParticipantsCircle>
          </div>
        </div>
        <div className={styles.etc}>
          <div className={styles.typeAndStars}>
            <div className={styles.desc}>
              <div className={styles.normal}>종류: </div>
              <div className={styles.highlight}>
                #{props.info.adventureCategory}
              </div>
            </div>
            <div className={styles.desc}>
              <div className={styles.normal}>평점:</div>
              <div className={styles.highlight}>
                {props.info.adventureAvgReviewRate ? (
                  <span>{props.info.adventureAvgReviewRate.toFixed(1)}점</span>
                ) : (
                  <span>정보없음</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button className={styles.notice}>
              <HiOutlineBellAlert size={23} />
            </button>
            <button className={styles.share}>
              <FiShare2 size={23} />
            </button>

            {/* 참여 안한 상태에서 참여하기 버튼 보여주기 */}
            {!props.info.participation && !props.info.clear && (
              <button
                className={styles.participate}
                onClick={() => {
                  console.log(props.info.participation);
                  Participate();
                }}
              >
                참여하기
              </button>
            )}

            {/* 참여한 상태에서 포기하기 버튼 보여주기 */}
            {props.info.participation && (
              <button
                className={styles.giveup}
                onClick={() => {
                  Giveup();
                }}
              >
                포기하기
              </button>
            )}

            {/* 탐험 달성하면 후기 달성 버튼 보이기 */}
            {props.info.clear && (
              <button
                className={styles.review}
                onClick={() => {
                  navigate(`/adventure/detail/${params.id}/createReview`);
                }}
              >
                후기작성
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default AdventureInfo;
