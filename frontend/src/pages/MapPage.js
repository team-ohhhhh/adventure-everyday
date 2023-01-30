import { useEffect, useState, useCallback } from "react";
import { MapMarker, Map, Circle } from "react-kakao-maps-sdk";
import Antenna from "../components/mapPage/antenna/Antenna";

function MainMap() {
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
    level: 3,
    isPanto: false, // 부드럽게 움직이는
    isCur: false, // 현재 위치인지
    isAround: false, // 주변 검색 상황인지
    isAroundClicked: false, // UFO가 눌렸는지
  });

  // 초기 렌더링 때 현재 위치로 지도 이동
  useEffect(() => {
    moveCurPos();
    setState((prev) => ({
      ...prev,
      isCur: false,
    }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "850px",
          backgroundColor: "#eeefff",
        }}
      >
        <Map // 지도를 표시할 Container
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={state.level} // 지도의 확대 레벨
          onCenterChanged={(map) =>
            setState((prev) => ({
              ...prev,
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
              },
            }))
          }
          onCreate={() => {
            console.log("create");
          }}
          onDragStart={() => {
            setState((prev) => ({
              ...prev,
              isCur: false,
            }));

            console.log("dragStart");
          }}
          onClick={(_t, mouseEvent) => {
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
              }));
            } else {
              // UFO 이미지가 떠 있다면
              // 지도 클릭 시 ufo 이미지 제거
              setState((prev) => ({
                ...prev,
                isAround: false,
                isAroundClicked: false,
              }));
            }
          }}
        >
          {/* isCur(현재 위치 버튼을 눌러서 isCur가 true일 때 원과 현재마커 보여주기) */}
          {state.isCur && (
            <>
              <Circle
                center={state.center}
                radius={100}
                strokeWeight={5} // 선의 두께입니다
                strokeColor={"#190A55"} // 선의 색깔입니다
                strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={"dash"} // 선의 스타일 입니다
                fillColor={"#190A55"} // 채우기 색깔입니다
                fillOpacity={0.7} // 채우기 불투명도 입니다
              />
              <MapMarker
                image={{
                  src: "/images/curMarker.png",

                  size: {
                    width: 30,
                    height: 30,
                  },
                  options: {
                    offset: {
                      x: 12,
                      y: 20,
                    },
                  },
                }}
                position={state.center}
              ></MapMarker>
            </>
          )}

          <Antenna></Antenna>

          {/* isCur가 켜져있지 않을 때만 버튼이 보임 */}
          {!state.isCur && (
            <button
              onClick={moveCurPos}
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
          {state.isAround && (
            <>
              <MapMarker
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    isAroundClicked: true,
                    center: state.click,
                    isPanto: true,
                  }));
                }}
                image={{
                  src: "/images/alien.jpg",

                  size: {
                    width: 30,
                    height: 30,
                  },
                  options: {
                    offset: {
                      x: 12,
                      y: 20,
                    },
                  },
                }}
                position={state.click}
              ></MapMarker>
            </>
          )}

          {/*UFO 이미지가 눌리면 파란색 원 등장*/}
          {state.isAround && state.isAroundClicked && (
            <Circle
              center={state.center}
              radius={100}
              strokeWeight={5} // 선의 두께입니다
              strokeColor={"#00529E"} // 선의 색깔입니다
              strokeOpacity={0} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={"dash"} // 선의 스타일 입니다
              fillColor={"#00529E"} // 채우기 색깔입니다
              fillOpacity={0.7} // 채우기 불투명도 입니다
            />
          )}

          <p>{state.errMsg}</p>
        </Map>
      </div>
    </>
  );

  // 현재 위치로 이동시키는 함수
  function moveCurPos() {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            level: 3,
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
        errMsg: "geolocation을 사용할수 없어요..",
      }));
    }

    // 원과 중심좌표 표시, 주변검색 UFO 이미지가 켜져있다면 없애기
    setState((prev) => ({
      ...prev,
      isCur: true,
      isAround: false,
    }));

    console.log(state.center);
  }
}

export default MainMap;
