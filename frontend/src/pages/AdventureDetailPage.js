import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Tabs, { Tab } from "react-best-tabs";
import axios from "axios";

import AdventureInfo from "../components/Adventure/AdventureInfo";
import AdventureDetailInfo from "../components/Adventure/AdventureDetailInfo";
import AdventureDetailReview from "../components/Adventure/AdventureDetailReview";

import styles from "./AdventureDetailPage.module.css";
import "./ProfilePage.css";

function AdventureDetailPage() {
  const params = useParams(); // 특정 탐험 id가져오기

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);
  let USER = useSelector((state) => state.user);

  let [reviews, setReviews] = useState([]);
  let [chingho, setChingho] = useState();
  let [adventureDetail, setAdventureDetail] = useState({});

  // const dispatch = useDispatch();

  // 후기 수정 삭제 버튼 조작
  const [reviewMoreButton, setReviewMoreButton] = useState(false);
  const [whichReviewButton, setWhichReviewButton] = useState(null);

  // 수정 탭 닫기
  const close = function () {
    if (reviewMoreButton) {
      setReviewMoreButton(false);
      setWhichReviewButton(null);
    }
  };

  // 탐험 상세 정보 받아오기
  function getAdventureDetail() {
    axios({
      url: URL + `/adventures/${params.id}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    })
      .then((response) => {
        setAdventureDetail(response.data.result);
        console.log(response.data.result);
      })
      .then((response) => {});
  }

  // 이 탐험의 후기 조회
  function getReview() {
    axios({
      url: URL + `/adventures/${params.id}/adventure-review`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    })
      .then((response) => {
        setReviews(response.data.result.subAdventureReviews);
        setChingho(response.data.result.adventureFeat);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  // // 탐험 체크포인트 bounds 지정
  // function setBounds() {
  //   // props로 받아온 체크포인트 좌표들을 positions에 저장

  //   if (adventureDetail.subAdventurePlaces) {
  //     // 체크포인트 좌표들 props에서 받아와 저장
  //     for (var i = 0; i < adventureDetail.subAdventurePlaces.length; i++) {
  //       checkpoints[i] = adventureDetail.subAdventurePlaces[i].subCoordinate;
  //     }
  //   }

  //   // 마커를 돌며 bounds 범위 정해주기
  //   checkpoints.forEach((point) => {
  //     bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
  //   });

  //   dispatch(saveBound(bounds)); // bounds가 a로 들어가서 저장됨
  // }

  // 탐험 상세 정보 받아오기
  useEffect(() => {
    getAdventureDetail();
    getReview();
  }, []);

  return (
    <div id="adventure" className="pageContainer" onClick={() => close()}>
      <div className={styles.wrapper}>
        <div className={styles.white}>
          <AdventureInfo
            className={styles.info}
            key={adventureDetail.adventureId}
            info={adventureDetail}
            getAdventureDetail={getAdventureDetail}
            isReview={
              reviews.filter((review) => {
                return review.userId === USER.userId;
              }).length > 0
            }
          ></AdventureInfo>
        </div>

        <div className={styles.purple}>
          <div className={styles.tab}>
            <Tabs
              activeTab="1"
              className={[styles.tab]} // tabs.rb-tabs
              ulClassName=""
              activityClassName="activeTab"
              onClick={(event, tab) => {
                // tab이 2면 (탐험 후기 탭을 누르면 후기 조회하기)
                console.log(tab);
              }}
            >
              <Tab title="탐험 지도">
                <AdventureDetailInfo
                  key={adventureDetail.adventureId}
                  info={adventureDetail}
                ></AdventureDetailInfo>
              </Tab>
              <Tab title="탐험 후기">
                <AdventureDetailReview
                  info={reviews}
                  setReviewMoreButton={setReviewMoreButton}
                  setWhichReviewButton={setWhichReviewButton}
                  reviewMoreButton={reviewMoreButton}
                  whichReviewButton={whichReviewButton}
                  reviews={reviews}
                  chingho={chingho}
                  adDetail={adventureDetail}
                  getReview={getReview}
                ></AdventureDetailReview>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdventureDetailPage;
