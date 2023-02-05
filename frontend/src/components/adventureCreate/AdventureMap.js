import React, { useEffect, useMemo, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const { kakao } = window;

const AdventureMap = ({ checkPoints }) => {
  const mapRef = useRef();
  const temp = { lat: 37.50128745884959, lng: 127.03956225524968 };

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    checkPoints.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [checkPoints]);

  useEffect(() => {
    console.log("setBounds");
    const map = mapRef.current;
    if (map) map.setBounds(bounds);
  });

  return (
    <div>
      <Map
        center={temp}
        style={{ width: "100%", height: "300px" }}
        ref={mapRef}
      >
        {checkPoints &&
          checkPoints.map((point) => (
            <MapMarker
              key={point.postId}
              position={{ lat: point.lat, lng: point.lng }}
              image={{
                src: "/images/advMarker5.png",
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
      </Map>
    </div>
  );
};

export default AdventureMap;
