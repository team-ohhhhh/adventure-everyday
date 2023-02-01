import { useParams } from "react-router";
import AdventureInfo from "../components/Adventure/AdventureInfo";
import styles from "./AdventureDetailPage.module.css";
import Tabs, { Tab } from "react-best-tabs";
// import Tabs, { Tab } from "../components/Tab.js";
import "../components/Tab.scss";
function AdventureDetailPage() {
  let { id } = useParams();
  console.log("ad detail page");
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.white}>
          <AdventureInfo info={id}></AdventureInfo>
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
                <div className={styles.detail}>
                  <div className={styles.map}>지도 들어갈 자리</div>
                  <div className={styles.checkPoint}>
                    <div className={styles.cpInfo}>
                      <div className={styles.cpTitle}>걷기 좋은 코스</div>
                      <div className={styles.cpDesc}>
                        꽃이랑 풀이 많아서 사진찍기 참 좋아요!
                      </div>
                    </div>
                    <div className={styles.cpArticle}>
                      게시글 컴포넌트 들어갈 자리
                    </div>
                  </div>
                  <div className={styles.checkPointArticles}>
                    <div className={styles.articleInfo}>
                      <div className={styles.cpSubTitle}>
                        이 포인트에서 작성된 글들
                      </div>
                      <button className={styles.arrangeBtn}>정렬버튼</button>
                    </div>
                    <div className={styles.article}>게시글 1</div>
                    <div className={styles.article}>게시글 2</div>
                  </div>
                </div>
              </Tab>
              <Tab title="탐험 후기" className="mr-2">
                <div className={styles.review}>Tab 2 content</div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdventureDetailPage;
