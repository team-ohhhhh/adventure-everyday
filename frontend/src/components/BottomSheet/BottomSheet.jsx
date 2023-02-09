import React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
// import "./BottomSheet.css";
import SmallArticleItem from '../SmallArticleItem';
import BigArticleItem from '../BigArticleItem';
import AdventureBanner from './../Adventure/AdventureBanner';
import { useSelector } from "react-redux"
import axios from "axios"

// props로 리스트와 contentType을 받을 것
const BottomSheetContainer = (props) => {
  const [open, setOpen] = useState(true);
  const focusRef = useRef();
  const contentType = "article"
  
 
  

  
  // props.center 로 받아온 좌표로 axios
  let URL = useSelector((state) => state.url)
  let TOKEN = useSelector((state) => state.token)

  useMemo(() => {
    axios({
      url: URL + '/posts',
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      params: {
        lng: props.center.lng,
        lat: props.center.lat,
        area: 1 //TODO: 여기는 안테나의 경우에는 동적할당 생각하기
      }
    })
    .then((res) => {
      console.log(res.data.result)
      props.setArticleList(res.data.result)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [props.center])

  const getAntennaList = function() {
    axios({
      url: URL + '/users/antennae',
      method: 'get',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    .then((res) => {
      props.setAntennae(res.data.result)
    })
    .catch((err) => console.log(err))
  }

  
  const makeAntenna = function() {
    axios({
      url : URL + '/users/antennae',
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        area: 1, //TODO: 나중에 변수로 안테나 범위 주기
        lng: props.center.lng,
        lat: props.center.lat,
      }
    })
    .then((res) => {
      getAntennaList()
    })
    .then((res) => {
      //TODO: 안테나 심으면 gif로 효과주고 바텀시트 닫기
      props.setState((prev) => (
        {
        ...prev,
        isCircle : false
      }))
    })
    .catch((err) => {console.log(err)})
  }

  const deleteAntenna = function() {
    axios({
      url : URL + `/users/antennae/${props.isAntenna}`,
      method : 'delete',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    })
    .then((res) => {getAntennaList()})
    .then((res) => {
      props.setState((prev) => ({
        ...prev,
        isAntenna: false
      }))
    })
    .catch((err) => {console.log(err)})
  }


  
 
  useEffect(() => {
    // Setting focus is to aid keyboard and screen reader nav when activating this iframe
    focusRef.current.focus();
  }, []);

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
          <div>{props.isAntenna ? <button onClick={() => {deleteAntenna()}}>안테나 뽑기</button> : <button onClick={() => {makeAntenna()}}>안테나 심기</button>}</div>
        }
        // 첫번쨰가 1차 높이, 두번째가 최대 높이
        snapPoints={({ maxHeight }) => [maxHeight / 4, maxHeight]}
      >
        <div className="forScrollBar">
          {/* dummy => list로 교체 */}
          {props.articleList.map((data) => {
            if (contentType === 'article') {
                return(
                <BigArticleItem data={data}/>
              )}
            else if (contentType === 'adventure') {
              return(
                <AdventureBanner AdventureListItem={data}/>
              )}
            })    
          }
        </div>
      </BottomSheet>
    </p>
  );
};

export default BottomSheetContainer;

