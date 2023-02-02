import React, { useEffect, useMemo, useRef } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

// import styles from "./UserPostMap.module.css";

const { kakao } = window;

const UserPostMap = ({ posts }) => {
  const mapRef = useRef();

  // 지도 클러스터 스타일
  const clusterStyle = {
    width: "50px",
    height: "50px",
    background: "#00BBE4",
    borderRadius: "25px",
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "50px",
  };

  // 지도 임시 중앙값 (바로 변경되기 때문에 의미 없음)
  const temp = { lat: 37.50128745884959, lng: 127.03956225524968 };

  // 게시글 변화 시 지도 영역 변경
  // 1. 게시글 영역 계산
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    posts.forEach((post) => {
      bounds.extend(new kakao.maps.LatLng(post.lat, post.lng));
    });
    return bounds;
  }, [posts]);
  // 2. 지도에 계산된 영역 반영
  useEffect(() => {
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
  }, [bounds]);

  // 클러스터 클릭 시 지도 확대 및 중심 이동
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    const level = map.getLevel() - 1;
    map.setLevel(level, { anchor: cluster.getCenter() }); // 지도 확대
    map.panTo(cluster.getCenter()); // 중심 이동
  };

  const onIdle = (target) => {
    const sw = target.getBounds().getSouthWest();
    const ne = target.getBounds().getNorthEast();
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    console.log(bounds);
  };

  return (
    <div>
      <Map
        ref={mapRef}
        center={temp}
        isPanto={true}
        style={{ width: "100%", height: "600px" }}
        onIdle={onIdle}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={4}
          styles={[clusterStyle]}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
        >
          {posts &&
            posts.map((post) => (
              <MapMarker
                key={post.postId}
                position={{ lat: post.lat, lng: post.lng }}
                image={{
                  src: "/images/advMarker5.png", // 포스트 사진으로 대체
                  size: {
                    width: 30,
                  },
                  options: {
                    offset: {
                      x: 12,
                      y: 45,
                    },
                  },
                }}
              ></MapMarker>
            ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
};

export default UserPostMap;
