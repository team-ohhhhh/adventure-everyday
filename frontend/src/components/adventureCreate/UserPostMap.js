import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import UserPostHorizontalScroll from "./UserPostHorizontalScroll";

import styles from "./UserPostMap.module.css";

const { kakao } = window;

const UserPostMap = ({ posts }) => {
  // 카카오맵 객체
  const mapRef = useRef();
  // 마커 객체
  const markerRef = useRef({});
  // z-index 설정용 변수
  const zRef = useRef(1);

  // 지도 범위 내에 존재하는 게시글 목록
  const [onMapPosts, setOnMapPosts] = useState([]);
  // 하단 게시글 목록 출력 여부
  const [show, setShow] = useState(false);
  // 하단에서 보여줄 게시글 목록
  const [showPosts, setShowPosts] = useState(false);

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

  // 지도 영역 변화 시 해당 영역에서 작성된 게시글 필터링하여 onMapPosts에 저장
  const onIdle = (target) => {
    const sw = target.getBounds().getSouthWest();
    const ne = target.getBounds().getNorthEast();
    const bounds = new kakao.maps.LatLngBounds(sw, ne);
    const newOnMapPosts = posts.filter((post) => {
      const postLatLng = new kakao.maps.LatLng(post.lat, post.lng);
      return bounds.contain(postLatLng);
    });
    setOnMapPosts(newOnMapPosts);
  };

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

  // 클러스터 클릭 시
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    const level = map.getLevel() - 1;
    map.setLevel(level, { anchor: cluster.getCenter() }); // 지도 확대
    map.panTo(cluster.getCenter()); // 중심 이동
    setShowPosts(onMapPosts);
    setShow(true);
  };

  // 마커 클릭 시
  const onMarkerClick = (marker, postId) => {
    const map = mapRef.current;
    map.setLevel(4, { anchor: marker.getPosition() }); // 지도 확대
    map.panTo(marker.getPosition());
    const firstPost = onMapPosts.filter((post) => post.postId === postId);
    const restPosts = onMapPosts.filter((post) => post.postId !== postId);
    const newOnMapPosts = [...firstPost, ...restPosts];
    setShowPosts(newOnMapPosts);
    setShow(true);
  };

  // 게시글 클릭 시
  const onPostClick = (post) => {
    const map = mapRef.current;
    const marker = markerRef.current[post.postId];
    const position = marker.getPosition();
    map.setLevel(4, { anchor: position });
    map.panTo(position);
    marker.setZIndex(zRef.current++);

    const infowindow = new kakao.maps.InfoWindow({
      map: map,
      position: position,
      content: "InfoWindow",
      removable: true,
    });
    infowindow.open(map, marker);
  };

  // 지도 클릭 시
  const onMapClick = (target, mouseEvent) => {
    setShow(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        center={temp}
        isPanto={true}
        style={{ width: "100%", height: "700px" }}
        onIdle={onIdle}
        onClick={onMapClick}
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
                ref={(el) => (markerRef.current[post.postId] = el)}
                position={{ lat: post.lat, lng: post.lng }}
                clickable={true}
                onClick={(marker) => {
                  onMarkerClick(marker, post.postId);
                }}
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

      {show && (
        <div className={styles.postWrap}>
          <UserPostHorizontalScroll
            posts={showPosts}
            onPostClick={onPostClick}
          />
        </div>
      )}
    </div>
  );
};

export default UserPostMap;
