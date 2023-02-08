import style from "./AdventureBanner.module.css";
import { Route, Routes, useNavigate } from "react-router";
import AdventureDetailPage from "../../pages/AdventurePage";
import AdventureProgressBar from "./AdventureProgressBar";


function AdventureBanner({ adventureItem }) {
  const navigate = useNavigate();

  return (
    // TODO: onClick 이벤트로 해당 모험으로 네비게이트 달아주기(모험 id 값을 파라미터로)
    // 그래디언트의 끝과 끝 점의 색상을 모두 반투명하게 하고 이미지 파일 위에 그래디언트가 오버랩 되는 방식..?
    <div
      className={style.banner}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${adventureItem.photoUrl})`,
      }}
      onClick={() => {
        navigate(`/adventure/detail/${adventureItem.adventureId}`);
      }}
    >
      <div className={style.titleAndDifficulty}>
        <div className={style.title}>{adventureItem.adventureTitle}</div>
        <div className={style.difficulty}>
          <img src={adventureItem.adventureDifficulty}></img>
        </div>
      </div>
      {/* 여기가 탐험 진행도 자리 */}
      <AdventureProgressBar clearRate={adventureItem.clearRate}/>
      <div className={style.makerAndParticipants}>
        <div className={style.maker}>
          <div className={style.makerProfileContainer}>
            <img className={style.makerProfile} src={adventureItem.userPhotoUrl} />
          </div>
          <div className={style.makerNameAndTierContainer}>
            <span>탐험가</span>
            <div className={style.makerNameAndTier}>
              {" "}
              <span className={style.makerName}>
                {" "}
                {adventureItem.userId}{" "}
              </span>{" "}
              <img
                src={"/images/lv" + adventureItem.userLevel + ".png"}
              />
            </div>
          </div>
        </div>
        <div className={style.participants}>participants</div>
      </div>
    </div>
  );
}

export default AdventureBanner;
