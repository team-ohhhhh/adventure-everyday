/* global kakao*/
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapMarker, Map, useMap } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
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
  let subAdventurePlaces = props.subAdventurePlaces;
  console.log("subAdventurePlaces");
  console.log(subAdventurePlaces);

  console.log("ad detail map");

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  const [positions, setPositions] = useState(props.pos);
  console.log("positions");
  console.log(positions);

  // let positions = props.pos;

  const bounds = useMemo(() => {
    // bounds에 북동쪽 좌표 정보와 남서쪽 좌표정보 저장
    const bounds = new kakao.maps.LatLngBounds();
    // positions = props.pos;
    console.log("props의 pos 받아옴");
    console.log(props.pos);

    console.log("bounds 범위 정해줌");
    // 마커를 돌며 bounds 범위 정해주기
    positions.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  });

  const SetMapPos = () => {
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
    function SetMapPos() {
      const map = mapRef.current;
      if (map) {
        map.setBounds(bounds);
        console.log("정해진 bounds로 맵 세팅");
      }
    }
    SetMapPos();
    console.log("setMapPost");
  }, [bounds]);

  return (
    <div className={styles.mapWrapper}>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표

          lat: 37.503587,
          lng: 127.039018,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "12rem",
        }}
        level={3} // 지도의 확대 레벨
      >
        {subAdventurePlaces &&
          subAdventurePlaces.map((place, index) => {
            console.log("marker info");
            console.log(place);
            return (
              <MapMarker
                key={index}
                position={{
                  lat: place.subCoordinate.lat,
                  lng: place.subCoordinate.lng,
                }} // 마커를 표시할 위치
                onClick={() => {
                  function ReadCheckPointInfo() {
                    axios({
                      url:
                        URL +
                        `/adventures/adventure-places/${place.adventurePlaceId}`,
                      headers: {
                        Authorization: `Bearer ${TOKEN}`,
                      },
                      method: "get",
                    }).then((response) => {
                      console.log("checkpoint axios 성공");
                      console.log(response.data.result);

                      props.setCheckPointInfo((prev) => ({
                        ...prev,
                        postId: response.data.result.adventurePlaceId,
                        title: response.data.result.adventurePlacePostTitle,
                        w3w: response.data.result.adventurePlacePostW3w,
                        createTime: response.data.result.createTime,
                        photoUrl:
                          response.data.result.adventurePlacePostPhotoUrl,
                        adventurePlaceTitle:
                          response.data.result.adventurePlaceTitle,
                        adventurePlaceContent:
                          response.data.result.adventurePlaceContent,
                        subPostList: response.data.result.subPostList,
                      }));
                    });
                  }
                  ReadCheckPointInfo();
                  console.log(place.adventurePlaceId);
                }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
                title={"먀"} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              />
            );
          })}
      </Map>
    </div>
  );
}
export default AdventureDetailMap;
