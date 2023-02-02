import ArticleListItem from "../ArticleListItem";
import ArticleListItem2 from "../ArticleListItem2";
import styles from "./AdventureDetailInfo.module.css";
function AdventureInfo() {
  // 큰 articleListItem
  const dummyBig = {
    postId: "1",
    title: "title",
    photo: "/images.jpg",
    nickName: "nickName",
    date: "2023-02-02",
    tier: "tier",
  };

  // 작은 articleListItem
  const dummySmall = {
    postId: "1",
    title: "title",
    date: "2023-02-02",
    userDetail: "detail",
    nickName: "nickName",
    level: "2",
    photo: "/images/alien.jpg",
  };

  return (
    <>
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
            <ArticleListItem2 articleListItem={dummyBig}></ArticleListItem2>
          </div>
        </div>
        <div className={styles.checkPointArticles}>
          <div className={styles.articleInfo}>
            <div className={styles.cpSubTitle}>이 포인트에서 작성된 글들</div>
            <button className={styles.arrangeBtn}>정렬버튼</button>
          </div>
          <div className={styles.articles}>
            <ArticleListItem articleListItem={dummySmall}></ArticleListItem>
            <div className={styles.article}>게시글 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureInfo;
