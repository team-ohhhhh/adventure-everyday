import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdventureBanner from "../components/Adventure/AdventureBanner";
import SimpleUserBanner from "./../components/profile/SimpleUserBanner";
import style from "./SearchPage.module.css";

function SearchComponent(props) {
  let TOKEN = useSelector((state) => state.token);
  let URL = useSelector((state) => state.url);
  const searchType = props.searchType;

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // 1자 이상 입력하지 않으면 오류뜸
    if (searchType === "users" && search.length >= 1) {
      axios({
        url: URL + "/users/search",
        method: "get",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          nickname: search,
        },
      })
        .then((res) => {
          setResult(res.data.result);
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } // 탐험 검색 TODO: 검색어 길이 제한 생기면 추가
    else if (searchType === "adventures" && search.length > 0) {
      axios({
        url: URL + "/adventures/search",
        method: "get",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          keyword: search,
        },
      })
        .then((res) => {
          setResult(res.data.result);
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <div className="pageContainer">
      <input
        className={style.searchBar}
        type="text"
        value={search}
        onChange={onChange}
        placeholder={`${
          searchType === "users" ? "유저를" : "모험을"
        } 검색해보세요.`}
      />
      <div className={style.result}>
        {result.length > 0 && <div>{result.length}건의 결과</div>}
        {searchType === "users"
          ? result.map((user) => {
              return (
                <div style={{ width: "90vw" }}>
                  <SimpleUserBanner data={user} />
                </div>
              );
            })
          : result.map((adventure) => {
              return (
                <div style={{ width: "90vw", marginTop: "1rem" }}>
                  <AdventureBanner adventureItem={adventure} isSearch={true} />
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SearchComponent;
