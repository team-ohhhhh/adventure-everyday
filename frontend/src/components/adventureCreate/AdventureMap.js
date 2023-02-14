import React, { useEffect, useMemo, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const { kakao } = window;

const AdventureMap = ({ checkpoints }) => {
  const mapRef = useRef();
  const temp = { lat: 37.50128745884959, lng: 127.03956225524968 };

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    checkpoints.forEach((point) => {
      bounds.extend(
        new kakao.maps.LatLng(point.coordinate.lat, point.coordinate.lng)
      );
    });

    return bounds;
  }, [checkpoints]);

  const handleBounds = (map) => {
    if (map && !bounds.isEmpty()) {
      map.setBounds(bounds);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    handleBounds(map);
  });

  return (
    <div>
      <Map
        center={temp}
        style={{ width: "100%", height: "200px" }}
        onCreate={handleBounds}
        ref={mapRef}
      >
        {checkpoints &&
          checkpoints.map((point) => (
            <MapMarker
              key={point.postId}
              position={{
                lat: point.coordinate.lat,
                lng: point.coordinate.lng,
              }}
              image={{
                src: "/images/advMarker5False.png",
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
