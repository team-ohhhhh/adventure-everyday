import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const ArticleMap = ({ lat, lng }) => {
  return (
    <div>
      <Map center={{ lat, lng }} style={{ width: "100%", height: "360px" }}>
        <MapMarker
          position={{ lat, lng }}
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
      </Map>
    </div>
  );
};

// ArticleMap.defaultProps = {
//   lat: 37.50128745884959,
//   lng: 127.03956225524968,
// };

export default ArticleMap;
