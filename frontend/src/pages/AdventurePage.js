import { useNavigate } from "react-router-dom";
import HorizontalScroll from "../components/HorizontalScroll";
import style from "./AdventurePage.module.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdventureBannerMore from "../components/Adventure/AdventureBannerMore";
import AdventureBanner from "../components/Adventure/AdventureBanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMessage, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
function AdventurePage() {
  const navigate = useNavigate();

  // 탐험 탭에 들어오면 내 위치 정보 받아와서 내 주변 탐험 리스트 뿌려주기

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  const [nearList, setnearList] = useState([]); // 내 주변 탐험
  const [updateList, setUpdateList] = useState([]); // 업데이트 탐험
  const [popularList, setPopularList] = useState([]); //


  // 내 주변 탐험 조회
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
            setnearList(response.data.result);
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

  // 신규 탐험 조회
  function getNewAdventure() {
    axios({
      url: URL + `/adventures?order=update`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      setUpdateList(response.data.result);
      console.log(response);
    });
  }

  // 별점 높은 순으로 탐험 조회
  function getPopularAdventure() {
    axios({
      url: URL + `/adventures?order=avgReviewGradeDesc`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      setPopularList(response.data.result);
      console.log(response);
    });
  }

  // 더보기용 컴포넌트 전환
  const [isMore, setIsMore] = useState(false)
  const [whichMore, setWhichMore] = useState(1)

  useMemo(() => {
    getCurrentLocation();
    getNewAdventure();
    getPopularAdventure();
  }, []);


  return (
    <div className="pageContainer">
      {!isMore 
      ? <div className={style.adPageContainer}>
        <div className={style.recommendPageHeader}>
          <div className={style.pageTitle}>탐험</div>
          <div className={style.searchAndCreate}>
            {/* 검색 컴포넌트 자리 onClick달아서 모달열기 */}
            <BiSearchAlt2
              className={style.searchIcon}
              onClick={() => {
                navigate("/search/adventure");
              }}
            />
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
              <span onClick={() => {setIsMore(true); setWhichMore(1)}}>더보기</span>
            </div>
          </div>
          <div className={style.scrollContainer}>
            <HorizontalScroll
              contentType={"adventure"}
              adventureList={nearList.slice(0,5)}
              isAdTab={true}
            />
          </div>
        </section>
        <div className={style.line}>&nbsp;</div>
        {/* 두번째 추천 기준 */}
        <section className={style.section}>
          <div className={style.recommendListInfo}>
            <div className={style.adventureTitle}>
              <div className={style.recommendTitle}>최근에 만들어진 탐험</div>
              <div className={style.recommendInfo}>
                따끈따끈한 신규 탐험들이에요
              </div>
            </div>
            <div className={style.more}>
              <span onClick={() => {setIsMore(true); setWhichMore(2)}}>더보기</span>
            </div>
          </div>
          <div className={style.scrollContainer}>
            <HorizontalScroll
              contentType={"adventure"}
              adventureList={updateList.slice(0,5)}
              isAdTab={true}
            />
          </div>
        </section>
        <div className={style.line}>&nbsp;</div>
        {/* 세번째 추천 기준 */}
        <section className={style.section}>
          <div className={style.recommendListInfo}>
            <div className={style.adventureTitle}>
              <div className={style.recommendTitle}>인기 많은 탐험</div>
              <div className={style.recommendInfo}>
                별점이 높은 탐험들만 모았어요
              </div>
            </div>
            <div className={style.more}>
              <span onClick={() => {setIsMore(true); setWhichMore(3)}}>더보기</span>
            </div>
          </div>
          <div className={style.scrollContainer}>
            <HorizontalScroll
              contentType={"adventure"}
              adventureList={popularList.slice(0,5)}
              isAdTab={true}
            />
          </div>
        </section>
      </div>
      : whichMore === 1 
      ? <div>
        <div className={style.title}>
          <div>
          <span className={style.titleFont}>내 주변의 탐험  </span>
          <span><FontAwesomeIcon icon={faXmark} style={{fontSize:"1.5rem",float:"right" }} onClick={()=>{setIsMore(false)}}/></span>
          </div>
          <div className={style.titleInfo}>
          지금 바로 시작할 수 있어요
          </div>
          </div>
          <div>
            {nearList.map((articleListItem) => {
              return (
                <AdventureBannerMore
                    key={articleListItem.postId}
                    adventureItem={articleListItem}
                    isAdTab={true}
                    setIsMore={setIsMore}/>
                )
                })
            }
          </div>
        </div>
      : whichMore === 2
      ? <div>
        <div className={style.title}>
        <div>
          <span className={style.titleFont}>최근에 만들어진 탐험  </span>
          <span><FontAwesomeIcon icon={faXmark} style={{fontSize:"1.5rem",float:"right" }} onClick={()=>{setIsMore(false)}}/></span>
          </div>
          <div className={style.titleInfo}>
            별점이 높은 탐험들만 모았어요
          </div>
          </div>
          <div>
            {updateList.map((articleListItem) => {
              return (
                <AdventureBannerMore
                    key={articleListItem.postId}
                    adventureItem={articleListItem}
                    isAdTab={true}
                    setIsMore={setIsMore}/>
              )
            })
            }
          </div>
      </div>
      : <div>
        <div className={style.title}>
        <div>
          <span className={style.titleFont}>인기 많은 탐험 </span>
          <span><FontAwesomeIcon icon={faXmark} style={{fontSize:"1.5rem",float:"right" }} onClick={()=>{setIsMore(false)}}/></span>
          </div>
          <div className={style.titleInfo}>
            따끈따끈한 신규 탐험들이에요
          </div></div>
      <div>{popularList.map((articleListItem) => {
        return (
          <AdventureBannerMore
              key={articleListItem.postId}
              adventureItem={articleListItem}
              isAdTab={true}
              setIsMore={setIsMore}/>
        )
      })
      }</div></div>
       
    }
    </div>
  );
}

export default AdventurePage;
