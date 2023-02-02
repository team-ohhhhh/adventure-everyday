import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import AdventureDetailInfo from "../components/Adventure/AdventureDetailInfo";
import AdventureDetailReview from "../components/Adventure/AdventureDetailReview";
import styles from "./AdventureDetailPage.module.css";
import Tabs, { Tab } from "react-best-tabs";
// import Tabs, { Tab } from "../components/Tab.js";
import "../components/Tab.scss";
function AdventureDetailPage() {
  let { id } = useParams();
  console.log("ad detail page");
  return (
    <div className="pageContainer">
      <div className={styles.wrapper}>
        <div className={styles.white}>
          <AdventureInfo className={styles.info}></AdventureInfo>
        </div>

        <div className={styles.purple}>
          <div className={styles.tab}>
            <Tabs
              activeTab="1"
              className={styles.tab}
              ulClassName=""
              activityClassName="bg-success"
              onClick={(event, tab) => console.log(event, tab)}
            >
              <Tab title="탐험 지도" className="mr-2">
                <AdventureDetailInfo></AdventureDetailInfo>
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
