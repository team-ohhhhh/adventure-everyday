import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import UserPostHorizontalScroll from "./UserPostHorizontalScroll";

import styles from "./UserPostMap.module.css";

const { kakao } = window;

const UserPostMap = ({ posts }) => {
  const mapRef = useRef();

  const [onMapPosts, setOnMapPosts] = useState([]);

  useEffect(() => console.log(onMapPosts), [onMapPosts]);

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

  // 클러스터 생성된 시점에 클러스터 마커 이미지 생성 (보류)
  // const onClustered = (target, clusters) => {
  //   clusters.forEach((cluster) => {
  //     const markers = cluster._markers;
  //     const images = markers
  //       .filter((marker) => {
  //         return marker.T.Yj !== "null";
  //       })
  //       .slice(0, 3)
  //       .map((marker) => marker.T.Yj);

  //     console.log(images);

  //     // if ((images && images.length) <= 3 && markers.length > 3) {
  //     // }

  //     const content = `
  //     <div>
  //       ${images.map(
  //         (image) =>
  //           `<img
  //           src=${image}
  //           alt=""
  //           style="width: 50px; height: 50px;"
  //         />`
  //       )}
  //       <div
  //         style = "cursor: pointer; width: 50px; height: 50px; background: rgb(0, 187, 228); border-radius: 25px; color: rgb(0, 0, 0); text-align: center; font-weight: bold; line-height: 50px;">
  //         ${markers.length}
  //       </div>
  //     </div>`;

  //     // console.log(cluster.getClusterMarker().getContent());
  //     cluster.getClusterMarker().setContent(content);
  //     console.log(cluster.getClusterMarker().getContent());
  //   });
  // };

  // 지도 영역 변화 시 해당 영역에서 작성된 게시글 필터링
  const onIdle = (target) => {
    const sw = target.getBounds().getSouthWest();
    const ne = target.getBounds().getNorthEast();
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    const onMapPosts = posts.filter((post) => {
      const postLatLng = new kakao.maps.LatLng(post.lat, post.lng);
      return bounds.contain(postLatLng);
    });
    setOnMapPosts(onMapPosts);
  };

  const showPosts = () => {
    console.log("click post!");
  };

  return (
    <div style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        center={temp}
        isPanto={true}
        style={{ width: "100%", height: "700px" }}
        onIdle={onIdle}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={4}
          styles={[clusterStyle]}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
          // onClustered={onClustered}
        >
          {posts &&
            posts.map((post) => (
              <MapMarker
                key={post.postId}
                position={{ lat: post.lat, lng: post.lng }}
                clickable={true}
                onClick={showPosts}
                image={{
                  src: post.postUrl ? post.postUrl : "/images/noImage.png",
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
              ></MapMarker>
            ))}
        </MarkerClusterer>
      </Map>

      <div className={styles.postWrap}>
        <UserPostHorizontalScroll posts={onMapPosts} />
      </div>
    </div>
  );
};

export default UserPostMap;
