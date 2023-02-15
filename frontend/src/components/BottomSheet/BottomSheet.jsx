import React from "react";
import { useEffect, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
// import "./BottomSheet.css";
import SmallArticleItem from "../SmallArticleItem";
import BigArticleItem from "../BigArticleItem";
import AdventureBanner from "./../Adventure/AdventureBanner";
import { useSelector } from "react-redux";
import axios from "axios";

// props로 리스트와 contentType을 받을 것
const BottomSheetContainer = (props) => {
  const [open, setOpen] = useState(true);
  const focusRef = useRef();
  const contentType = "article";

  // props.center 로 받아온 좌표로 axios
  let URL = useSelector((state) => state.url);
  let TOKEN = useSelector((state) => state.token);

  // 카카오 맵키를 위함
  const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

  useEffect(() => {
    axios({
      url: URL + "/posts",
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      params: {
        lng: props.center.lng,
        lat: props.center.lat,
        area: 1, //TODO: 여기는 안테나의 경우에는 동적할당 생각하기
      },
    })
      .then((res) => {
        console.log(res.data.result);
        props.setArticleList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.center]);

  const getAntennaList = function () {
    axios({
      url: URL + "/users/antennae",
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        props.setAntennae(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const makeAntenna = function () {
    axios({
      url: URL + "/users/antennae",
      method: "post",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      data: {
        area: 1, //TODO: 나중에 변수로 안테나 범위 주기
        lng: props.center.lng,
        lat: props.center.lat,
      },
    })
      .then((res) => {
        getAntennaList();
      })
      .then((res) => {
        //TODO: 안테나 심으면 gif로 효과주고 바텀시트 닫기
        props.setState((prev) => ({
          ...prev,
          isCircle: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAntenna = function () {
    axios({
      url: URL + `/users/antennae/${props.isAntenna}`,
      method: "delete",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        getAntennaList();
      })
      .then((res) => {
        props.setState((prev) => ({
          ...prev,
          isAntenna: false,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // w3w 변수 와 도로명 주소
  const [W3W, setW3W] = useState('')
  const [address, setAddress] = useState('')

  

  useEffect(() => {
    // Setting focus is to aid keyboard and screen reader nav when activating this iframe
    focusRef.current.focus();

    // w3w
    axios({
      url : "https://api.what3words.com/v3/convert-to-3wa",
      method : "get",
      params : {
        key : process.env.REACT_APP_W3W_KEY,
        coordinates : `${props.center.lat},${props.center.lng}`,
        language : "ko",
        format : "json"
      }
    })
    .then((res) => {
      setW3W(res.data.words)
    })
    .catch((err) => console.log(err));

    // 카카오맵 
    axios
      .get("https://dapi.kakao.com/v2/local/geo/coord2address.json", {
        params: {
          x: String(props.center.lng),
          y: String(props.center.lat),
          input_coord: "WGS84",
        },
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res)
        setAddress(res.data.documents[0].address.address_name)
      })
      .catch((err) => console.log(err))
  }, [props.center]);

  const headerRef = useRef()
  const myHeight = function() {
    console.log(headerRef.current.clientHeight)
    return 70.8 + 43 + headerRef.current.clientHeight
  }

  return (
    <p ref={focusRef}>
      {/* <button onClick={() => setOpen(open => !open)} ref={focusRef}>
        {open ? "Close" : "Open"}
      </button> */}
      <button>요기</button>
      <BottomSheet
        
        open={open}
        // 사라지게 하는 부분
        // onDismiss={() => setOpen(false)}
        blocking={false}
        header={
          <div ref={headerRef} style={{display:"flex", flexDirection:"column", alignItems:"start",width:"100%" ,marginTop:"4%", }}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"95%", margin:"auto"}}>
              <div style={{display:"flex", flexDirection:"column", alignItems:"start" }}>
                <div style={{fontWeight:"600" }}>{W3W}</div>
                <div style={{fontSize:"small", marginTop:"7%"}}>{address}</div>
              </div>
              <div  style={{alignItems:"flex-start"}}>
                {props.isAntenna ? (
                  <button
                  style={{background: "white", borderRadius: "8px", color:"#1C0B69", borderColor: "#1C0B69", height:"2rem", width:"7rem"}}
                    onClick={() => {
                      deleteAntenna();
                    }}
                  >
                    안테나 뽑기
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      makeAntenna();
                    }}
                    style={{background: "#1C0B69", borderRadius: "8px", color:"white", height:"2rem", width:"7rem"}}
                  >
                    안테나 설치  
                  </button>
                )}
              </div>
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:"95%", marginLeft:"auto",marginRight:"auto"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"start" }}>
              <div style={{marginTop:"15%", marginBottom:"15%"}}> {props.articleList.length}개의 글 </div>
              </div>
            </div>
          </div>
        }
        // 첫번쨰가 1차 높이, 두번째가 최대 높이  
        snapPoints={({ maxHeight }) => [myHeight(), maxHeight]}
      >
        <div className="forScrollBar" style={{marginTop:"1.2rem", marginBottom: "5rem"}}>
          {/* dummy => list로 교체 */}
          {props.articleList.length != 0 ? props.articleList.reverse().map((data) => {
            if (contentType === "article") {
              return <SmallArticleItem data={data} />;
            } else if (contentType === "adventure") {
              return <AdventureBanner AdventureListItem={data} />;
            }
          })
          : <div style={{width:"auto", textAlign:"center", marginTop:"2vh"}}>글이 없어요...</div>
        }
        </div>
      </BottomSheet>
    </p>
  );
};

export default BottomSheetContainer;
