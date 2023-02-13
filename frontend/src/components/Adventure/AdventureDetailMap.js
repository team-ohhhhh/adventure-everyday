/* global kakao*/
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapMarker, Map, useMap } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import styles from "./AdventureDetailMap.module.css";
function AdventureDetailMap(props) {
  const mapRef = useRef();

  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);

  console.log(props.subAdventurePlaces);

  const bounds = useMemo(() => {
    // bounds에 북동쪽 좌표 정보와 남서쪽 좌표정보 저장
    const bounds = new kakao.maps.LatLngBounds();

    // 마커를 돌며 bounds 범위 정해주기
    if (props.subAdventurePlaces) {
      props.subAdventurePlaces.forEach((point) => {
        bounds.extend(
          new kakao.maps.LatLng(
            point.subCoordinate.lat,
            point.subCoordinate.lng
          )
        );
      });
    }

    return bounds;
  }, [props.subAdventurePlaces]);

  const handleBounds = (map) => {
    console.log(bounds);
    if (map && !bounds.isEmpty()) {
      map.setBounds(bounds);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    handleBounds(map);
  });

  useEffect(() => {
    setTimeout(() => {
      handleBounds(mapRef.current);
    }, 0);
  }, []);

  // 체크포인트(맵 마커를 눌렀을 때 받아오는 정보)
  function getCheckPointInfo(place) {
    axios({
      url:
        URL +
        `/adventures/adventure-places/${place.adventurePlaceId}?order=createTimeDesc`,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      method: "get",
    }).then((response) => {
      console.log("체크포인트 정보 받아오기");
      console.log(response.data.result);
      props.setCheckPointInfo((prev) => ({
        ...prev,
        // TODO: adventurePlaceId 오류의 경우 여기 바꾼 변수명 체크해보기
        adventurePlaceId: response.data.result.adventurePlaceId,
        postId: response.data.result.postId,
        title: response.data.result.adventurePlacePostTitle,
        w3w: response.data.result.adventurePlacePostW3w,
        createTime: response.data.result.createTime,
        photoUrl: response.data.result.adventurePlacePostPhotoUrl,
        adventurePlaceTitle: response.data.result.adventurePlaceTitle,
        adventurePlaceContent: response.data.result.adventurePlaceContent,
        subPostList: response.data.result.subPostList,
      }));
    });
  }

  return (
    <div className={styles.mapWrapper}>
      <Map // 지도를 표시할 Container
        center={{
          // 지도의 중심좌표

          lat: props.subAdventurePlaces
            ? props.subAdventurePlaces[0].subCoordinate.lat
            : 37.503587,
          lng: props.subAdventurePlaces
            ? props.subAdventurePlaces[0].subCoordinate.lng
            : 127.039018,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "12rem",
        }}
        level={3} // 지도의 확대 레벨
        onCreate={handleBounds}
        ref={mapRef}
      >
        {props.subAdventurePlaces &&
          props.subAdventurePlaces.map((place, index) => {
            return (
              <MapMarker
                key={place.adventurePlaceId + index}
                position={{
                  lat: place.subCoordinate.lat,
                  lng: place.subCoordinate.lng,
                }} // 마커를 표시할 위치
                onClick={() => {
                  getCheckPointInfo(place);
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
