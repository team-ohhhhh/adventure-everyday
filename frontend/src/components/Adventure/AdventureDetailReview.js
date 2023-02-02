import styles from "./AdventureDetailReview.module.css";
import { Hashicon } from "@emeraldpay/hashicon-react";
function AdventureDetailReview() {
  return (
    <>
      <div className={styles.detail}>
        <div className={styles.treasure}>
          <img className={styles.treasureImg} src="/images/decoIcon.png"></img>
          <div className={styles.treasureInfo}>
            <div className={styles.treasureBorder}>
              <Hashicon value={991016} size={100} />
              <div className={styles.chingho}>걷기왕</div>
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
            <div className={styles.reviewItem}>후기 컴포넌트 들어갈 자리</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdventureDetailReview;
