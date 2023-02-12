import style from "./AdventureBanner.module.css";
import { Route, Routes, useNavigate } from "react-router";
import AdventureDetailPage from "../../pages/AdventurePage";
import AdventureProgressBar from "./AdventureProgressBar";
import ParticipantsCircle from "./ParticipantsCircle";

function AdventureBanner({
  adventureItem,
  isAdTab,
  isMine,
  isSearch,
  isCreated,
}) {
  const navigate = useNavigate();
  return (
    // TODO: onClick 이벤트로 해당 모험으로 네비게이트 달아주기(모험 id 값을 파라미터로)
    // 그래디언트의 끝과 끝 점의 색상을 모두 반투명하게 하고 이미지 파일 위에 그래디언트가 오버랩 되는 방식..?
    <div style={{ width: "fit-content" }}>
      {adventureItem && (
        <div
          className={style.banner}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              adventureItem.adventurePhotoUrl
                ? adventureItem.adventurePhotoUrl
                : "/images/emptyBanner2.png"
            })`,
            width: isAdTab ? "338px" : "100%",
          }}
          onClick={() => {
            navigate(`/adventure/detail/${adventureItem.adventureId}`);
          }}
        >
          <div className={style.titleAndDifficulty}>
            <div className={style.title}>{adventureItem.adventureTitle}</div>
            <div className={style.difficulty}>
              <img
                src={`images/diff_${adventureItem.adventureDifficulty}.png`}
                alt={`difficulty_${adventureItem.adventureDifficulty}`}
              ></img>
            </div>
          </div>
          {/* 여기가 탐험 진행도 자리 */}
          {!isAdTab &&
            !isMine &&
            !isSearch &&
            !isCreated && ( // 탐험 탭 페이지에선 진행바 나오면 안돼서 처리 + 내가 만든 탐험에서도 안나오도록
              <AdventureProgressBar clearRate={adventureItem.clearRate} />
            )}
          <div className={style.makerAndParticipants}>
            <div className={style.maker}>
              <div className={style.makerProfileContainer}>
                <img
                  className={style.makerProfile}
                  src={
                    adventureItem.userPhotoUrl
                      ? adventureItem.userPhotoUrl
                      : "/defaultProfile.jpg"
                  }
                  alt={"maker_profile"}
                />
              </div>
              <div className={style.makerNameAndTierContainer}>
                <span>탐험가</span>
                <div className={style.makerNameAndTier}>
                  <span className={style.makerName}>
                    {adventureItem.userNickname}
                  </span>
                  <img
                    className={style.userLevel}
                    src={"/images/lv" + adventureItem.userLevel + ".png"}
                    alt={`userlevel_${adventureItem.userLevel}`}
                  />
                </div>
              </div>
            </div>
            <div className={style.participants}>
              <ParticipantsCircle photoList={adventureItem.userPhotoUrlList} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdventureBanner;
