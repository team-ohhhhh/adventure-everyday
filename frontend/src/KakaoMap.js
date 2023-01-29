import { MapMarker, Map } from "react-kakao-maps-sdk";
import React, { useState } from "react";
import HorizontalScroll from "./components/HorizontalScroll";
import BottomSheet from "./components/BottomSheet";


const KakaoMap = () => {
   
    return (
        <div>
            이게 왜 안되지
            {/* <HorizontalScroll contentType={'article'}/> */}
            <BottomSheet contentType={'article'}/>
        </div>
    );
};

export default KakaoMap;