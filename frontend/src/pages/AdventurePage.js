import HorizontalScroll from "../components/HorizontalScroll";
import "./AdventurePage.css"
import { BiSearchAlt2 } from "react-icons/bi"


function AdventurePage() {

  return (
    <div>
      <div className="recommendPageHeader">
        <h1>탐험</h1>
        <div className="searchAndCreate">
          {/* 검색 컴포넌트 자리 */}
          <BiSearchAlt2 className="searchIcon" />
          {/* 생성 컴포넌트 자리 */}
          <h3>생성</h3>
        </div>
      </div>
      {/* 첫번째 추천 기준 */}
      <div>
        <div className="recommendListInfo">
          <div className="adventureTitle">
            <div className="recommendTitle">첫번째 기준 제목</div>
            <div className="recommendInfo">첫번째 기준에 대한 설명 자리</div>
          </div>
          <div className="more">
            <span>
              더보기
            </span>
          </div>
        </div>
        <div>
          <HorizontalScroll />
        </div>
      </div>
      {/* 두번째 추천 기준 */}
      <div>
        <div className="recommendListInfo">
          <div className="adventureTitle">
            <div className="recommendTitle">두번째 기준 제목</div>
            <div className="recommendInfo">두번째 기준에 대한 설명 자리</div>
          </div>
          <div className="more">
            <span>
              더보기
            </span>
          </div>
        </div>
        <div>
          <HorizontalScroll />
        </div>
      </div>
      {/* 세번째 추천 기준 */}
      <div>
        <div className="recommendListInfo">
          <div className="adventureTitle">
            <div className="recommendTitle">세번째 기준 제목</div>
            <div className="recommendInfo">세번째 기준에 대한 설명 자리</div>
          </div>
          <div className="more">
            <span>
              더보기
            </span>
          </div>
        </div>
        <div>
          <HorizontalScroll />
        </div>
      </div>
    </div>
  )
}


export default AdventurePage