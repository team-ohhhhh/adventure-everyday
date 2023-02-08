import React, { useEffect, useMemo, useRef, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import UserPostHorizontalScroll from "./UserPostHorizontalScroll";

import styles from "./UserPostMap.module.css";

const { kakao } = window;

const UserPostMap = ({ myPosts, selectPost, userHeight }) => {
  // 카카오맵 객체
  const mapRef = useRef();
  // 마커 객체
  const markerRef = useRef({});
  // 게시글 객체
  // const postRef = useRef();
  // z-index 설정용 변수
  const zRef = useRef(1);

  // 지도 범위 내에 존재하는 게시글 목록
  const [onMapPosts, setOnMapPosts] = useState([]);
  // 하단 게시글 목록 출력 여부
  const [show, setShow] = useState(false);
  // 하단에서 보여줄 게시글 목록
  const [showPosts, setShowPosts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postDetail, setPostDetail] = useState();

  // 지도 임시 중앙값 (바로 변경되기 때문에 의미 없음)
  const temp = { lat: 37.50128745884959, lng: 127.03956225524968 };

  // 게시글 변화 시 지도 영역 변경
  // 1. 게시글 영역 계산
  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    myPosts.forEach((post) => {
      bounds.extend(new kakao.maps.LatLng(post.lat, post.lng));
    });
    return bounds;
  }, [myPosts]);
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
    const newOnMapPosts = myPosts.filter((post) => {
      const postLatLng = new kakao.maps.LatLng(post.lat, post.lng);
      return bounds.contain(postLatLng);
    });
    setOnMapPosts(newOnMapPosts);
  };

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

  // 클러스터 클릭 시
  const onClusterclick = (cluster) => {
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
    map.panTo(marker.getPosition());
    const firstPost = onMapPosts.filter((post) => post.postId === postId);
    const restPosts = onMapPosts.filter((post) => post.postId !== postId);
    const newOnMapPosts = [...firstPost, ...restPosts];
    setShowPosts(newOnMapPosts);
    setShow(true);
    // postRef.current.scrollTo(0, 0);
  };

  // 게시글 클릭 시
  const onPostClick = (post) => {
    const map = mapRef.current;
    const level = map.getLevel() - 1;
    const marker = markerRef.current[post.postId];
    const position = marker.getPosition();
    map.setLevel(level, { anchor: position });
    map.panTo(position);
    marker.setZIndex(zRef.current++);
  };

  // 지도 클릭 시
  const onMapClick = (target, mouseEvent) => {
    setShow(false);
  };

  // 게시글 선택 시
  const onPostSelect = (post) => {
    // console.log("select post", post.postId);
    setShow(false);
    openModal();
    setPostDetail(post);
  };

  const openModal = () => {
    setShowModal(true);
    // document.body.style.overflow = "hidden";
    const map = mapRef.current;
    map.setDraggable(false);
    map.setZoomable(false);
  };
  const closeModal = () => {
    setShowModal(false);
    // document.body.style.overflow = "unset";
    const map = mapRef.current;
    map.setDraggable(true);
    map.setZoomable(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <Map
        ref={mapRef}
        center={temp}
        isPanto={true}
        style={{ width: "100%", height: userHeight }}
        onIdle={onIdle}
        onClick={onMapClick}
      >
        <MarkerClusterer
          averageCenter={true}
          minLevel={4}
          disableClickZoom={true}
          onClusterclick={onClusterclick}
          onClustered={onClustered}
        >
          {myPosts &&
            myPosts.map((post) => (
              <MapMarker
                key={post.postId}
                ref={(el) => (markerRef.current[post.postId] = el)}
                position={{ lat: post.lat, lng: post.lng }}
                clickable={true}
                onClick={(marker) => {
                  onMarkerClick(marker, post.postId);
                }}
                onMouseOver={() => {
                  mapRef.current.setCursor("move");
                }}
                image={{
                  src: post.photoUrl
                    ? post.photoUrl
                    : "/images/noImage_square.png",
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
        <div
          className={styles.postWrap}
          //  ref={postRef}
        >
          <UserPostHorizontalScroll
            posts={showPosts}
            onPostClick={onPostClick}
            onPostSelect={onPostSelect}
          />
        </div>
      )}

      {showModal && (
        <div className={styles.modalWrap}>
          <div>{postDetail.w3w}</div>
          <img
            className={styles.postImage}
            src={
              postDetail.postUrl ? postDetail.postUrl : "/images/noImage.png"
            }
            alt={postDetail.title}
          />
          <div>{postDetail.createdTime}</div>
          <div>{postDetail.title}</div>
          <div>{postDetail.content}</div>
          <button onClick={closeModal}>취소</button>
          <button onClick={() => selectPost(postDetail)}>선택</button>
        </div>
      )}
    </div>
  );
};

export default UserPostMap;
