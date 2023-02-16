import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const ArticleMap = ({ lat, lng }) => {
  return (
    <div>
      <Map
        center={{ lat, lng }}
        style={{ width: "100%", height: "250px" }}
        level={4}
      >
        <MapMarker
          position={{ lat, lng }}
          image={{
            src: "/images/advMarker5false.png",
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
      </Map>
    </div>
  );
};

export default ArticleMap;
