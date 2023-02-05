import style from "./AdventureBanner.module.css";
import { Route, Routes, useNavigate } from "react-router";
import AdventureDetailPage from "../../pages/AdventurePage";
function AdventureBanner(props) {
  console.log(props.id);
  const navigate = useNavigate();
  const adventureItem = props.articleListItem;

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
        console.log(adventureItem);
      }}
    >
      <div className={style.titleAndDifficulty}>
        <div className={style.title}>{adventureItem.title}</div>
        <div className={style.difficulty}>
          <img src={adventureItem.difficulty}></img>
        </div>
      </div>
      <div className={style.makerAndParticipants}>
        <div className={style.maker}>
          <div className={style.makerProfileContainer}>
            <img className={style.makerProfile} src={adventureItem.photoUrl} />
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
                src={"/images/lv" + adventureItem.advetureMakerTier + ".png"}
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
