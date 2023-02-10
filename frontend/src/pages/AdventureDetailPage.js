import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import AdventureDetailInfo from "../components/Adventure/AdventureDetailInfo";
import AdventureDetailReview from "../components/Adventure/AdventureDetailReview";
import styles from "./AdventureDetailPage.module.css";
import Tabs, { Tab } from "react-best-tabs";
import tabs from "./AdventureDetailTab.module.scss";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdventureDetailPage() {
  const params = useParams(); // 특정 탐험 id가져오기

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  let [reviews, setReviews] = useState([]);
  let [chingho, setChingho] = useState();
  let [adventureDetail, setAdventureDetail] = useState({});

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
  function ReadAdventureDetail() {
    axios({
      url: URL + `/adventures/${params.id}`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      setAdventureDetail(response.data.result);
      console.log("axios 성공");
      console.log(response.data.result);
    });
  }

  // 이 탐험의 후기 조회
  function ReadReview() {
    axios({
      url: URL + `/adventures/${params.id}/adventure-review`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    })
      .then((response) => {
        console.log(response.data)
        setReviews(response.data.result.subAdventureReviews);
        setChingho(response.data.result.adventureFeat)
        return response
      })
      .catch((err) => console.log(err));
  }
  // 탐험 상세 정보 받아오기
  useEffect(() => {
    ReadAdventureDetail();
  }, []);

  return (
    <div
      className="pageContainer"
      onClick={() => {
        close();
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.white}>
          <AdventureInfo
            className={styles.info}
            key={adventureDetail.adventureId}
            info={adventureDetail}
          ></AdventureInfo>
        </div>

        <div className={styles.purple}>
          <div className={styles.tab}>
            <Tabs
              activeTab="1"
              className={[styles.tab]} // tabs.rb-tabs
              ulClassName=""
              activityClassName="bg-success"
              onClick={(event, tab) => {
                // tab이 2면 (탐험 후기 탭을 누르면 후기 조회하기)
                console.log(tab);
                if (tab === 2) {
                  ReadReview();
                }
              }}
            >
              <Tab title="탐험 지도" className="mr-2">
                <AdventureDetailInfo
                  key={adventureDetail.adventureId}
                  info={adventureDetail}
                ></AdventureDetailInfo>
              </Tab>
              <Tab title="탐험 후기" className="mr-2">
                <AdventureDetailReview
                  info={reviews}
                  setReviewMoreButton={setReviewMoreButton}
                  setWhichReviewButton={setWhichReviewButton}
                  reviewMoreButton={reviewMoreButton}
                  whichReviewButton={whichReviewButton}
                  ReadReview={ReadReview}
                  chingho={chingho}
                  adDetail={adventureDetail}
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
