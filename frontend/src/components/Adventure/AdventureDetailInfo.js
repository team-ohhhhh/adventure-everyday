import styles from "./AdventureDetailInfo.module.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";

function AdventureInfo() {

  const articlList = [1, 2, 3]

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
            <BigArticleItem/>
          </div>
        </div>
        <div className={styles.checkPointArticles}>
          <div className={styles.articleInfo}>
            <div className={styles.cpSubTitle}>이 포인트에서 작성된 글들</div>
            <button className={styles.arrangeBtn}>정렬버튼</button>
          </div>
          <div className={styles.articles}>
            {articlList.map((article) => {
              return(
                <SmallArticleItem data={article}/>
              )
            })}
            <div className={styles.article}>게시글 2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureInfo;
