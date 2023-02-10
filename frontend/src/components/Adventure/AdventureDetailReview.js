import styles from "./AdventureDetailReview.module.css";
import { Hashicon } from "@emeraldpay/hashicon-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState, useEffect } from "react";
import ReviewItem from "./review/ReviewItem";
function AdventureDetailReview(props) {
  // 상위 컴포넌트: adventureDetailPage
  // props.info로 reviews 리스트 가져옴


  return (
    <div className={styles.detail}>
      <div className={styles.treasure}>
        <img className={styles.treasureImg} src="/images/decoIcon.png"></img>
        <div className={styles.treasureInfo}>
          <div className={styles.treasureBorder}>
            <Hashicon /* (탐험 아이디 + 칭호 + 탐험 제목)*/
              value={
                props.adDetail.adventureId +
                props.chingho +
                props.adDetail.adventureTitle
              }
              size={100}
            />

            <div className={styles.chingho}>{props.chingho}</div>
          </div>
          <div className={styles.treasureDesc}>
            이 탐험의 보물과 칭호를 받고
            <br /> 후기를 남겨주세요!
          </div>
        </div>
        <img className={styles.treasureImg} src="/images/decoIcon2.png"></img>
      </div>
      <div className={styles.review}>
        <div className={styles.title}>탐험후기</div>

        <div className={styles.reviewList}>
          <div className={styles.reviewItem}>
            {props.info.map((review, index) => {
              return <ReviewItem key={index} 
              data={review} 
              setReviewMoreButton={props.setReviewMoreButton} 
              reviewMoreButton={props.reviewMoreButton} 
              setWhichReviewButton={props.setWhichReviewButton}
              whichReviewButton={props.whichReviewButton}
              ReadReview={props.ReadReview}
              />;
            })}
            {/* 후기가 없으면 보여줄 컴포넌트 */}
            {!props.info && (
              <div className={styles.article}>아직은 후기가 없어요!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdventureDetailReview;
