import { useNavigate } from "react-router-dom";
import HorizontalScroll from "../components/HorizontalScroll";
import style from "./AdventurePage.module.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function AdventurePage() {
  const navigate = useNavigate();

  // 탐험 탭에 들어오면 내 위치 정보 받아와서 내 주변 탐험 리스트 뿌려주기

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  const [nearList, SetnearList] = useState([]);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords.latitude); // 위도
          // console.log(position.coords.longitude); // 경도
          axios({
            url:
              URL +
              `/adventures?order=near&lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            method: "get",
          }).then((response) => {
            console.log(response.data.result);
            SetnearList(response.data.result);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      console.log("geolocation 사용불가");
    }
  }

  useMemo(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="pageContainer">
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
      <section className={style.section}>
        <div className={style.recommendListInfo}>
          <div className={style.adventureTitle}>
            <div className={style.recommendTitle}>내 주변의 탐험</div>
            <div className={style.recommendInfo}>
              지금 바로 시작할 수 있어요
            </div>
          </div>
          <div className={style.more}>
            <span>더보기</span>
          </div>
        </div>
        <div className={style.scrollContainer}>
          <HorizontalScroll
            contentType={"adventure"}
            nearList={nearList}
            isAdTab={true}
          />
        </div>
      </section>
      {/* 두번째 추천 기준 */}
      <section className={style.section}>
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
      </section>
      {/* 세번째 추천 기준 */}
      <section className={style.section}>
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
      </section>
    </div>
  );
}

export default AdventurePage;
