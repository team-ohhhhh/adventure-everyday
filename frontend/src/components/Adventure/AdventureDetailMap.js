/* global kakao*/
import { useEffect, useMemo, useRef, useState } from "react";
import { MapMarker, Map, useMap } from "react-kakao-maps-sdk";
import styles from "./AdventureDetailMap.module.css";
function AdventureDetailMap(props) {
  const MARKER_WIDTH = 33; // 기본, 클릭 마커의 너비
  const MARKER_HEIGHT = 36; // 기본, 클릭 마커의 높이
  const OFFSET_X = 12; // 기본, 클릭 마커의 기준 X좌표
  const OFFSET_Y = MARKER_HEIGHT; // 기본, 클릭 마커의 기준 Y좌표
  const OVER_MARKER_WIDTH = 40; // 오버 마커의 너비
  const OVER_MARKER_HEIGHT = 42; // 오버 마커의 높이
  const OVER_OFFSET_X = 13; // 오버 마커의 기준 X좌표
  const OVER_OFFSET_Y = OVER_MARKER_HEIGHT; // 오버 마커의 기준 Y좌표
  const SPRITE_MARKER_URL =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png"; // 스프라이트 마커 이미지 URL
  const SPRITE_WIDTH = 126; // 스프라이트 이미지 너비
  const SPRITE_HEIGHT = 146; // 스프라이트 이미지 높이
  const SPRITE_GAP = 10; // 스프라이트 이미지에서 마커간 간격

  const mapRef = useRef();

  const positions = [
    { lat: 33.44975, lng: 126.56967 },
    { lat: 33.450579, lng: 126.56956 },
    { lat: 33.4506468, lng: 126.5707 },
  ];

  const bounds = useMemo(() => {
    // bounds에 북동쪽 좌표 정보와 남서쪽 좌표정보 저장
    const bounds = new kakao.maps.LatLngBounds();

    // 마커를 돌며 bounds 범위 정해주기
    positions.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  });

  const SetMapPos = () => {
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
    // console.log(bounds);
    // console.log(bounds.getNorthEast().La, bounds.getNorthEast().Ma);
    // console.log(bounds.getSouthWest().La, bounds.getSouthWest().Ma);
    // console.log("--");
    // console.log(
    //   bounds.getSouthWest().La +
    //     (bounds.getNorthEast().La - bounds.getSouthWest().La) / 2
    // );
    // console.log(
    //   bounds.getSouthWest().Ma +
    //     (bounds.getNorthEast().Ma - bounds.getSouthWest().Ma) / 2
    // );
  };

  useMemo(() => {
    SetMapPos();
    console.log("setMapPost");
  }, [bounds]);

  const EventMarkerContainer = ({ position, index, onClick, isClicked }) => {
    // const map = useMap();

    const [isOver, setIsOver] = useState(false);
    const gapX = MARKER_WIDTH + SPRITE_GAP; // 스프라이트 이미지에서 마커로 사용할 이미지 X좌표 간격 값
    const originY = (MARKER_HEIGHT + SPRITE_GAP) * index; // 스프라이트 이미지에서 기본, 클릭 마커로 사용할 Y좌표 값
    const overOriginY = (OVER_MARKER_HEIGHT + SPRITE_GAP) * index; // 스프라이트 이미지에서 오버 마커로 사용할 Y좌표 값
    const normalOrigin = { x: 0, y: originY }; // 스프라이트 이미지에서 기본 마커로 사용할 영역의 좌상단 좌표
    const clickOrigin = { x: gapX, y: originY }; // 스프라이트 이미지에서 마우스오버 마커로 사용할 영역의 좌상단 좌표
    const overOrigin = { x: gapX * 2, y: overOriginY }; // 스프라이트 이미지에서 클릭 마커로 사용할 영역의 좌상단 좌표

    let spriteOrigin = isOver ? overOrigin : normalOrigin;

    if (isClicked) {
      spriteOrigin = clickOrigin;
    }

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        onClick={onClick}
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
        image={{
          src: SPRITE_MARKER_URL,
          size: {
            width: MARKER_WIDTH,
            height: MARKER_HEIGHT,
          },
          options: {
            offset: {
              x: OFFSET_X,
              y: OFFSET_Y,
            },
            spriteSize: {
              width: SPRITE_WIDTH,
              height: SPRITE_HEIGHT,
            },
            spriteOrigin: spriteOrigin,
          },
        }}
      ></MapMarker>
    );
  };

  const [selectedMarker, setSeleteMarker] = useState();

  return (
    <div className={styles.mapWrapper}>
      <Map // 지도를 표시할 Container
        onCreate={console.log("create")}
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "12rem",
        }}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
      >
        {positions.map((position, index) => (
          <EventMarkerContainer
            index={index}
            key={`EventMarkerContainer-${position.lat}-${position.lng}`}
            position={position}
            onClick={() => {
              setSeleteMarker(index);
              console.log(position);
            }}
            isClicked={selectedMarker === index}
          />
        ))}
      </Map>
    </div>
  );
}
export default AdventureDetailMap;
