import { useNavigate } from "react-router-dom";
import HorizontalScroll from "../components/HorizontalScroll";
import style from "./AdventurePage.module.css";
import { BiSearchAlt2 } from "react-icons/bi";

function AdventurePage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.recommendPageHeader}>
        <h1>탐험</h1>
        <div className={style.searchAndCreate}>
          {/* 검색 컴포넌트 자리 onClick달아서 모달열기 */}
          <BiSearchAlt2 className={style.searchIcon} />
          {/* 생성 컴포넌트 자리 */}
          <h3 onClick={() => navigate("/adventure/create")}>생성</h3>
        </div>
      </div>
      {/* 첫번째 추천 기준 */}
      <div>
        <div className={style.recommendListInfo}>
          <div className={style.adventureTitle}>
            <div className={style.recommendTitle}>첫번째 기준 제목</div>
            <div className={style.recommendInfo}>
              첫번째 기준에 대한 설명 자리
            </div>
          </div>
          <div className={style.more}>
            <span>더보기</span>
          </div>
        </div>
        <div>
          <HorizontalScroll contentType={"adventure"} />
        </div>
      </div>
      {/* 두번째 추천 기준 */}
      <div>
        <div className={style.recommendListInfo}>
          <div className={style.adventureTitle}>
            <div className={style.recommendTitle}>두번째 기준 제목</div>
            <div className={style.recommendInfo}>
              두번째 기준에 대한 설명 자리
            </div>
          </div>
          <div className={style.more}>
            <span>더보기</span>
          </div>
        </div>
        <div>
          <HorizontalScroll contentType={"adventure"} />
        </div>
      </div>
      {/* 세번째 추천 기준 */}
      <div>
        <div className={style.recommendListInfo}>
          <div className={style.adventureTitle}>
            <div className={style.recommendTitle}>세번째 기준 제목</div>
            <div className={style.recommendInfo}>
              세번째 기준에 대한 설명 자리
            </div>
          </div>
          <div className={style.more}>
            <span>더보기</span>
          </div>
        </div>
        <div>
          <HorizontalScroll contentType={"adventure"} />
        </div>
      </div>
    </div>
  );
}

export default AdventurePage;
