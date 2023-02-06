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

  let [adventureDetail, setAdventureDetail] = useState({});

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
  // 탐험 상세 정보 받아오기
  useEffect(() => {
    ReadAdventureDetail();
  }, []);

  return (
    <div className="pageContainer">
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
              onClick={(event, tab) => console.log(event, tab)}
            >
              <Tab title="탐험 지도" className="mr-2">
                <AdventureDetailInfo
                  key={adventureDetail.adventureId}
                  info={adventureDetail}
                ></AdventureDetailInfo>
              </Tab>
              <Tab title="탐험 후기" className="mr-2">
                <AdventureDetailReview></AdventureDetailReview>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdventureDetailPage;
