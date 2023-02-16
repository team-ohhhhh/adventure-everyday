import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Map, MapMarker, MarkerClusterer, Circle } from "react-kakao-maps-sdk";
import axios from "axios";
import styles from "./MapPage.module.css";
import Antenna from "../components/mapPage/antenna/Antenna";
import BottomSheetContainer from "./../components/BottomSheet/BottomSheet";
import SmallArticleItem from "./../components/SmallArticleItem";

// import { ReactComponent as MarkerTest } from "./../components/mapPage/marker_Test.svg";

const { kakao } = window;

function MainMap() {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state);

  const mapRef = useRef();

  const [antennae, setAntennae] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 37.5016117,
      lng: 127.0397674,
    },

    click: {
      lat: 37.5016117,
      lng: 127.0397674,
    },

    errMsg: null,
    level: 6,
    isPanto: false, // 부드럽게 움직이는
    isCur: false, // 현재 위치인지
    isAround: false, // 주변 검색 상황인지
    isAroundClicked: false, // UFO가 눌렸는지
    isCircle: false, // 원이 생겼는지(자기 주위, 해당 좌표, 안테나)
    isAntenna: false,
  });

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  // 마운트 시
  useEffect(() => {
    // 최상단으로 이동
    window.scrollTo(0, 0);

    // 스크롤 방지
    // document.body.style.overflow = "hidden";

    // 지도 렌더링 이전에 안테나 좌표 가져와두기
    axios({
      url: URL + "/users/antennae",
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setAntennae(res.data.result);
      })
      .catch((err) => console.log(err));

    // 현재 위치로 지도 이동
    moveCurPos();
    setState((prev) => ({
      ...prev,
      isCur: false,
    }));

    return () => {
      // 언마운트 시 스크롤 방지 해제
      // document.body.style.overflow = "unset";
    };
  }, []);

  // 게시글 리스트 저장 => axios는 바텀시트에서 됨
  // lat이나 lng 값이 변화했을 때 작동할 함수 -> axios 후에 setArticleList
  const [articleList, setArticleList] = useState([]);

  // 게시글 마커 인포윈도우 제어용 변수
  const [isOpen, setIsOpen] = useState(false);
  // 클러스터 마커 인포윈도우 저장용 변수
  const [clusterInfowindow, setClusterInfowindow] = useState();

  // 지도 높이 반응형으로 계산
  const userHeight = useMemo(() => {
    const viewHeight = document.documentElement.clientHeight;
    const navHeight = 71; // navbar 박스 높이
    return viewHeight - navHeight;
  }, []);

  // 클러스터 생성된 시점에 클러스터 마커 이미지 생성
  const onClustered = (target, clusters) => {
    clusters.forEach((cluster) => {
      const markers = cluster._markers;
      const images = markers
        .filter((marker) => {
          return marker.T.Yj !== "/images/noImage_square.png";
        })
        .slice(0, 3)
        .map((marker) => marker.T.Yj);

      while (images.length < markers.length && images.length < 3) {
        images.push("/images/noImage_square.png");
      }

      const content = `
        <div style = "cursor: pointer; position: relative;">
          <img src=${
            images[0]
          } alt="" style="width: 50px; height: 50px; position: absolute; margin-top: 14px; z-index: 3;"/>
          <img src=${
            images[1]
          } alt="" style="width: 50px; height: 50px; position: absolute; margin-left: 7px; margin-top: 7px; z-index: 2;"/>
          ${
            images.length > 2
              ? `<img src=${images[2]} alt="" style="width: 50px; height: 50px; position: absolute; margin-left: 14px; z-index: 1;"/>`
              : ``
          }
          <div
            style = "width: 30px; height: 30px; background: rgba(0, 0, 0, 0.7); border-radius: 999px; color: rgb(255, 255, 255); text-align: center; font-weight: 500; line-height: 30px; position: absolute; margin-left: 30px; ${
              markers.length === 2 ? `margin-top: 42px;` : `margin-top: 42px;`
            } z-index: 4;">
            ${markers.length}
          </div>
        </div>`;

      const dom = document.createElement("div");
      dom.innerHTML = content;

      dom.addEventListener("click", () => {
        onClusterclick(cluster);
      });

      cluster.getClusterMarker().setContent(dom);
      // console.log(cluster.getClusterMarker().getContent());
    });
  };

  const onCreate = (target) => {
    const clusters = target._clusters.filter(
      (cluster) => cluster._markers.length > 1
    );
    onClustered(null, clusters);
  };

  // 클러스터 클릭 시 해당 게시글 리스트 출력
  const onClusterclick = (cluster) => {
    // 열려 있던 infowindow off
    setIsOpen(0);
    if (clusterInfowindow) clusterInfowindow.close();

    // 클러스터에 해당하는 게시글 필터링
    const bounds = cluster.getBounds();
    const clusterArticles = articleList.filter((article) => {
      const articleLatLng = new kakao.maps.LatLng(article.lat, article.lng);
      return bounds.contain(articleLatLng);
    });

    // DOM 형태로 인포윈도우 컨텐츠 생성
    const content = document.createElement("div");
    content.setAttribute(
      "style",
      "width: 180px; height: 65px; padding: 0.2rem 0.5rem; overflow: auto;"
    );

    clusterArticles.forEach((clusterArticle, idx) => {
      const article = document.createElement("div");

      article.setAttribute(
        "style",
        `display: flex; justify-content: space-between; ${
          idx === 0 ? "" : "border-top: 0.5px solid gray;"
        } padding: 0.3rem 0;`
      );
      const title = document.createElement("div");
      title.setAttribute("style", "line-height: 1.4rem;");
      title.textContent = `${clusterArticle.title}`;
      const more = document.createElement("div");
      more.setAttribute(
        "style",
        "width: 1rem; height: 1rem; padding: 0.2rem; line-height: 1rem; color: gray;"
      );
      more.textContent = ">";
      more.onclick = () => {
        navigate("/article/" + clusterArticle.postId);
      };
      article.appendChild(title);
      article.appendChild(more);
      content.appendChild(article);
    });

    // 인포윈도우 생성
    const map = mapRef.current;
    const infowindow = new kakao.maps.InfoWindow({
      position: cluster.getCenter(),
      content: content,
    });
    infowindow.open(map);

    // 다른 인포윈도우 클릭 시 닫을 수 있도록 인포윈도우 객체 저장
    setClusterInfowindow(infowindow);
  };

  // 모험모드 탭
  const [isAdventureMode, setIsAdventureMode] = useState(false);
  const [whichCheckpoint, setWhichCheckpoint] = useState(null);
  const [adventureList, setAdventureList] = useState([]);

  const getAdventureList = function () {
    axios({
      url: URL + "/adventures/adventure-in-progress/users/checkpoint",
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setAdventureList(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAdventureMode) {
      getAdventureList();
    }
  }, [isAdventureMode]);

  // 안테나 버튼 토글
  const [isOn, setIsOn] = useState(false);
  function toggle() {
    setIsOn((prev) => !prev);
  }

  // 카카오 키워드 검색용
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [result, setResult] = useState([]);
  const [keyWord, setKeyWord] = useState();
  const [resultWindow, setResultWindow] = useState(false);

  const onChange = function (e) {
    setKeyWord(e.target.value);
  };

  useEffect(() => {
    if (!keyWord) return;
    // 현재 위치를 받아와서 현재 위치를 기준으로 검색 시도
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        setState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude, // 위도
            lng: position.coords.longitude, // 경도
          },
        }));
      });
    }
    const ps = new kakao.maps.services.Places();
    const location = new kakao.maps.LatLng(state.center.lat, state.center.lng);
    setResultWindow(true);
    ps.keywordSearch(
      keyWord,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          // const bounds = new kakao.maps.LatLngBounds()
          console.log(data);
          setResult(data);
          // for (var i = 0; i < data.length; i++) {
          //   // @ts-ignore
          //   markers.push({
          //     position: {
          //       lat: data[i].y,
          //       lng: data[i].x,
          //     },
          //     content: data[i].place_name,
          //   })
          // @ts-ignore
          // bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }
        // setMarkers(markers)

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds)
        // }
      },
      { location, sort: kakao.maps.services.SortBy.DISTANCE }
    ); // 옵션은 이런형태로 넣어줄것!
  }, [keyWord]);

  return (
    <div className="pageContainer">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: userHeight,
          backgroundColor: "#eeefff",
        }}
      >
        {/* 모험모드용 버튼 */}
        <div
          // TODO: 위치 하드코딩함...
          style={{
            position: "absolute",
            left: "81%",
            top: "35%",
            zIndex: "2",
          }}
        >
          {isAdventureMode ? (
            <button
              style={{
                background: "white",
                borderRadius: "8px",
                color: "#1C0B69",
                borderColor: "#1C0B69",
              }}
              onClick={() => {
                setIsAdventureMode(false);
                console.log(isAdventureMode);
              }}
            >
              지도 모드
            </button>
          ) : (
            <button
              style={{
                background: "#1C0B69",
                borderRadius: "8px",
                color: "white",
              }}
              onClick={() => {
                setIsAdventureMode(true);
                console.log(isAdventureMode);
              }}
            >
              탐험 모드
            </button>
          )}
        </div>

        {/* 카카오맵 검색용 검색창 */}
        <div
          className="kakao"
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            zIndex: "3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onClick={() => {
            setResultWindow(false);
          }}
        >
          <input
            onChange={(e) => onChange(e)}
            placeholder="카카오맵 키워드 검색"
            style={{
              color: "#1C0B69",
              width: "80vw",
              height: "10vw",
              borderRadius: "8px",
              marginTop: "20px",
              border: "none",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              paddingLeft: "2vw",
            }}
            value={keyWord}
          ></input>
          {result.length > 0 &&
            resultWindow &&
            result.slice(0, 5).map((place) => {
              // 5개만 보여주기
              return (
                <div
                  key={place.id}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      center: {
                        lat: place.y,
                        lng: place.x,
                      },
                      click: {
                        lat: place.y,
                        lng: place.x,
                      },
                      isAroundClicked: true,
                      isAround: true,
                      isCircle: true,
                    }));
                    setResultWindow(false);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    width: "80vw",
                    height: "fit-content",
                    borderRadius: "8px",
                    marginTop: "1vh",
                    border: "none",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    backgroundColor: "white",
                    // padding: "1vw"
                  }}
                >
                  <div className={styles.comments_container}>
                    <div className={styles.comment}>
                      <div className={styles.comment_content}>
                        <div className={styles.profile}>
                          {place.place_name}
                          <span
                            style={{
                              marginLeft: "2vw",
                              fontSize: "small",
                              color: "purple",
                            }}
                          >
                            {place.category_group_name}
                          </span>
                        </div>
                        <div className={styles.line}></div>
                        <div className={styles.text}>{place.address_name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <Map // 지도를 표시할 Container
          ref={mapRef}
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={state.level} // 지도의 확대 레벨
          onClick={(_t, mouseEvent) => {
            // 카카오 검색 결과 목록 끄기
            setResultWindow(false);
            setKeyWord("");
            // 인포윈도우 off
            setIsOpen(0);
            if (clusterInfowindow) clusterInfowindow.close();

            if (!state.isAroundClicked) {
              // UFO 이미지가 떠 있지 않다면
              // 지도 클릭시 그 곳에 ufo 이미지 뜸
              setState((prev) => ({
                ...prev,
                isCur: false,
                click: {
                  // 마우스 클릭하면 center에 저장
                  lat: mouseEvent.latLng.getLat(),
                  lng: mouseEvent.latLng.getLng(),
                },
                isAround: true,
                isCircle: false,
                isAntenna: false,
              }));
            } else {
              // UFO 이미지가 떠 있다면
              // 지도 클릭 시 ufo 이미지 제거
              setState((prev) => ({
                ...prev,
                isAround: false,
                isAroundClicked: false,
                isCircle: false,
              }));
            }
            // 안테나 버튼 토글용
            if (isOn) {
              toggle();
            }
          }}
        >
          {/* 안테나 리스트를 순회하면서 안테나 아이콘 표시 */}
          {!isAdventureMode &&
            antennae &&
            antennae.map((antenna) => {
              return (
                <MapMarker
                  key={antenna.antennaId}
                  onClick={() => {
                    // console.log(antenna.antennaId);
                    setState((prev) => ({
                      ...prev,
                      center: {
                        lat: antenna.lat,
                        lng: antenna.lng,
                      },
                      isAround: false,
                      isCircle: true,
                      isAntenna: antenna.antennaId,
                    }));
                  }}
                  image={{
                    src: "/images/antennaIcon.png",

                    size: {
                      width: 50,
                      height: 50,
                    },
                    options: {
                      offset: {
                        x: 20,
                        y: 20,
                      },
                    },
                  }}
                  position={{ lat: antenna.lat, lng: antenna.lng }}
                ></MapMarker>
              );
            })}

          {/* 안테나에 원그려주기 */}

          {!isAdventureMode &&
            state.isCircle &&
            antennae.map((antenna) => {
              return (
                antenna.antennaId === state.isAntenna && (
                  <Circle
                    center={{
                      lat: antenna.lat,
                      lng: antenna.lng,
                    }}
                    radius={1000}
                    strokeWeight={5} // 선의 두께입니다
                    strokeColor={"#00529E"} // 선의 색깔입니다
                    strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"dash"} // 선의 스타일 입니다
                    fillColor={"#00529E"} // 채우기 색깔입니다
                    fillOpacity={0.7} // 채우기 불투명도 입니다
                    onClick={() => {
                      kakao.maps.event.preventMap();
                      // 원 클릭 시 인포윈도우 off
                      setIsOpen(0);
                      if (clusterInfowindow) clusterInfowindow.close();
                    }}
                  />
                )
              );
            })}

          {/* isCur(현재 위치 버튼을 눌러서 isCur가 true일 때 원과 현재마커 보여주기) */}
          {!isAdventureMode && state.isCur && (
            <>
              <Circle
                center={state.center}
                radius={1000}
                strokeWeight={5} // 선의 두께입니다
                strokeColor={"#190A55"} // 선의 색깔입니다
                strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"dash"} // 선의 스타일 입니다
                fillColor={"#190A55"} // 채우기 색깔입니다
                fillOpacity={0.7} // 채우기 불투명도 입니다
                onClick={() => {
                  kakao.maps.event.preventMap();
                  // 원 클릭 시 인포윈도우 off
                  setIsOpen(0);
                  if (clusterInfowindow) clusterInfowindow.close();
                }}
                zIndex={1}
              />
              <MapMarker
                image={{
                  src: "/images/curMarker2.png",

                  size: {
                    width: 20,
                    height: 20,
                  },
                  options: {
                    offset: {
                      x: 5,
                      y: 10,
                    },
                  },
                }}
                position={state.center}
              ></MapMarker>
            </>
          )}

          {!isAdventureMode && (
            <Antenna
              antennae={antennae}
              setState={setState}
              isOn={isOn}
              toggle={toggle}
            ></Antenna>
          )}

          {/* isCur가 켜져있지 않을 때만 버튼이 보임 */}
          {!isAdventureMode && !state.isCur && (
            <button
              onClick={() => {
                moveCurPos();
                setState((prev) => ({
                  ...prev,
                  isCircle: true,
                  // 만약 지금 위치가 안테나 위치면 어떻게 하지...
                  isAntenna: false,
                }));
                // 현재 위치로 지도 시점 이동
                const map = mapRef.current;
                moveCurPos("buttonClicked");
                const moveLatLng = new kakao.maps.LatLng(
                  state.center.lat,
                  state.center.lng
                );
                map.panTo(moveLatLng);
              }}
              style={{
                /*버튼 위치*/
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translate(-50%, 500%)",
                zIndex: "1",

                /*버튼 디자인 */
                justifyItems: "center",
                alignItems: "center",

                width: "124px",
                height: "41px",

                background: "#1C0B69",
                borderRadius: "21px",
                color: "#ffffff",
                fontWeight: "bold",
              }}
            >
              내 주변 확인하기
            </button>
          )}

          {/*isAround가 켜지면 UFO 이미지 생성*/}
          {!isAdventureMode && state.isAround && (
            <>
              <MapMarker
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    isAroundClicked: true,
                    isCircle: true,
                    center: state.click,
                    isPanto: true,
                  }));
                }}
                image={{
                  src: "/images/spaceshipIcon.png",
                  size: {
                    // width: 30,
                    height: 30,
                  },
                  style: {
                    filter: "drop-shadow(5px 5px 5px #000)",
                    fill: "red",
                  },
                  options: {
                    offset: {
                      x: 12,
                      y: 17,
                    },
                  },
                }}
                position={state.click}
              ></MapMarker>
            </>
          )}

          {/*UFO 이미지가 눌리면 파란색 원 등장*/}
          {!isAdventureMode && state.isAround && state.isAroundClicked && (
            <Circle
              center={state.click}
              radius={1000}
              strokeWeight={5} // 선의 두께입니다
              strokeColor={"#00529E"} // 선의 색깔입니다
              strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"dash"} // 선의 스타일 입니다
              fillColor={"#00529E"} // 채우기 색깔입니다
              fillOpacity={0.7} // 채우기 불투명도 입니다
              onClick={() => {
                kakao.maps.event.preventMap();
                // 원 클릭 시 인포윈도우 off
                setIsOpen(0);
                if (clusterInfowindow) clusterInfowindow.close();
              }}
            />
          )}

          <p>{state.errMsg}</p>

          {/* 주변 검색 상황일때 바텀시트 등장 */}
          {!isAdventureMode && state.isCircle && (
            <BottomSheetContainer
              antennae={antennae}
              center={state.center}
              isAntenna={state.isAntenna}
              setAntennae={setAntennae}
              setState={setState}
              articleList={articleList}
              setArticleList={setArticleList}
            />
          )}

          {/* 맵에 게시글 핀 찍기 */}
          {!isAdventureMode && state.isCircle && (
            <MarkerClusterer
              averageCenter={true}
              disableClickZoom={true}
              minLevel={0}
              onClusterclick={onClusterclick}
              onClustered={onClustered}
              onCreate={onCreate} // onClustered 훅이 최초 생성 시엔 동작하지 않아서 onCreate 함수도 함께 사용
            >
              {articleList.map((article) => (
                <MapMarker
                  image={{
                    src: article.photoUrl
                      ? article.photoUrl
                      : "/images/emptyBanner4.png",
                    size: {
                      width: 50,
                      height: 50,
                    },
                    options: {
                      offset: {
                        x: 35,
                        y: 35,
                      },
                    },
                  }}
                  // clickable={true}
                  onClick={() => {
                    if (clusterInfowindow) clusterInfowindow.close();
                    setIsOpen(article.postId);
                  }}
                  position={{ lat: article.lat, lng: article.lng }}
                >
                  {isOpen === article.postId && (
                    <div
                      style={{
                        width: "170px",
                        padding: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            lineHeight: "1.4rem",
                          }}
                        >
                          {article.title}
                        </div>
                        <div
                          onClick={() => navigate("/article/" + isOpen)}
                          style={{
                            width: "1rem",
                            height: "1rem",
                            padding: "0.2rem",
                            lineHeight: "1rem",
                            color: "gray",
                          }}
                        >
                          >{/* 오타 아님! */}
                        </div>
                      </div>
                    </div>
                  )}
                </MapMarker>
              ))}
            </MarkerClusterer>
          )}

          {/* 어드벤처 모드 */}

          {isAdventureMode &&
            adventureList.map((adventure, idx) => {
              return adventure.adventurePlaceList.map((checkpoint) => {
                return (
                  <MapMarker
                    key={checkpoint.adventurePlaceId}
                    position={{
                      lat: checkpoint.lat,
                      lng: checkpoint.lng,
                    }}
                    image={{
                      src: `/images/advMarker${idx + 1}${
                        checkpoint.isClear
                      }.png`,
                      size: {
                        // width: 30,
                        height: 50,
                      },
                      options: {
                        offset: {
                          x: 25,
                          y: 25,
                        },
                      },
                    }}
                    onClick={() => {
                      setWhichCheckpoint(checkpoint.adventurePlaceId);
                    }}
                  >
                    {whichCheckpoint === checkpoint.adventurePlaceId && (
                      <div
                        onClick={() => {
                          navigate(
                            `/adventure/detail/${adventure.adventureId}`
                          );
                        }}
                      >
                        <div>탐험 이름 : {adventure.adventureTitle}</div>
                        <div>체크포인트 이름 : {checkpoint.title}</div>
                      </div>
                    )}
                  </MapMarker>
                );
              });
            })}
          {isAdventureMode &&
            adventureList.map((adventure, idx) => {
              return adventure.adventurePlaceList.map((checkpoint) => {
                return (
                  whichCheckpoint === checkpoint.adventurePlaceId && (
                    <Circle
                      center={{
                        lat: checkpoint.lat,
                        lng: checkpoint.lng,
                      }}
                      radius={25}
                      strokeColor={"#00529E"} // 선의 색깔입니다
                      strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                      strokeStyle={"dash"} // 선의 스타일 입니다
                      fillColor={"#00529E"} // 채우기 색깔입니다
                      fillOpacity={0.7} // 채우기 불투명도 입니다
                    />
                  )
                );
              });
            })}

          {/* 키워드 검색용 */}
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: "#000" }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
    </div>
  );

  // 게시글 눌렀으면 해당 게시글 위치로, 아니라면 현재 위치로 이동시키는 함수
  function moveCurPos(where) {
    // 현재위치 버튼을 누른 상황이 아니고 && 게시글에서 location값을 불러온 상황이라면
    if (
      where !== "buttonClicked" &&
      location.state &&
      location.state.lat &&
      location.state.lng
    ) {
      setState((prev) => ({
        ...prev,
        center: {
          lat: location.state.lat, // 위도
          lng: location.state.lng, // 경도
        },
        level: 1,
        // TODO: 원을 띄우고 싶은데 잘 안됨...
        isAroundClicked: true,
        isAround: true,
        isCircle: true,
      }));
    } else if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            level: 6,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
          }));
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: false,
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "위치 정보를 사용할 수 없어요..",
      }));
    }

    // 원과 중심좌표 표시, 주변검색 UFO 이미지가 켜져있다면 없애기
    setState((prev) => ({
      ...prev,
      isCur: true,
      isAround: false,
    }));

    // console.log(state.center);
  }
}

export default MainMap;
