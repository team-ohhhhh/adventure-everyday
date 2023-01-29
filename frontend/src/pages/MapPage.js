import { useEffect, useState } from "react";
import { MapMarker, Map, Circle } from "react-kakao-maps-sdk";
import Antenna from "../components/mapPage/antenna/Antenna";

function MapMain() {
  const [state, setState] = useState({
    center: {
      lat: 33.4507044,
      lng: 126.570667,
    },
    errMsg: null,
    level: 3,
    isCur: false,
  });

  // 초기 렌더링 때 현재 위치로 이동
  useEffect(() => {
    moveCurPos();
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
          style={{
            // 지도의 크기
            width: "100%",
            height: "60%",
          }}
          level={state.level} // 지도의 확대 레벨
          onCenterChanged={(map) =>
            setState({
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
              },
            })
          }
          onCreate={() => {
            console.log("create");
          }}
          onDragStart={() => {
            setState({
              ...state,
              isCur: false,
            });
            console.log("dragStart");
          }}
          onClick={() => {
            setState({
              ...state,
              isCur: false,
            });
            console.log("click");
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

          {/* 지도 위 안테나 버튼 + 리스트 */}
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

          <p>{state.errMsg}</p>
          <p>{"지도 레벨은 " + state.level + " 이고"}</p>
          <p>
            {"중심 좌표는 위도 " +
              state.center.lat +
              ", 경도 " +
              state.center.lng +
              " 입니다"}
          </p>
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

    // 원과 중심좌표 표시
    setState({
      ...state,
      isCur: true,
    });

    console.log(state.center);
  }
}

export default MapMain;
