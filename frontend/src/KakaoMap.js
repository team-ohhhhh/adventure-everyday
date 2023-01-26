import { MapMarker, Map } from "react-kakao-maps-sdk";
import React, { useState } from "react";

const KakaoMap = () => {
    let [here, setHere] = useState([0,0])
    // function onGeoOkay(position) {
    //     console.log(position.coords);
    //     setHere([position.coords.latitude, position.coords.longitude])
    //   }
      
    //   function onGeoError() {
    //     alert("I can't find you. No weather for you.");
    //   }
      
    // navigator.geolocation.getCurrentPosition(onGeoOkay, onGeoError)
    
     

    return (
        <Map center={{ lat: here[0], lng: here[1] }} style={{ width: "500px", height: "500px" }}>
            <MapMarker position={{ lat: here[0], lng: here[1] }}>
                <div style={{ color: "#000" }}>Hello World!</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;