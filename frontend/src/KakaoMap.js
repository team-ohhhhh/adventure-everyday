import { MapMarker, Map } from "react-kakao-maps-sdk";

const KakaoMap = () => {
    return (
        <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "500px", height: "500px" }}>
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>Hello World!</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;