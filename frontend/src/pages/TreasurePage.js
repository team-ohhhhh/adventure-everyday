import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Hashicon } from "@emeraldpay/hashicon-react";

import style from "./TreasurePage.module.css";
import { AiOutlineClose } from "react-icons/ai";

function TreasurePage() {
  let { userId, nickname } = useParams();

  const URL = useSelector((state) => state.url);
  const TOKEN = useSelector((state) => state.token);

  const navigate = useNavigate();
  const [treasureList, setTreasureList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios({
      url: URL + `/adventures/treasures/users/${userId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => {
        setTreasureList(res.data.result.treasures);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="pageContainer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        margin: "5vw",
      }}
    >
      <div className={style.close}>
        <AiOutlineClose onClick={() => navigate(-1)} size={35} />
      </div>
      <h1 className={style.header}>{nickname}의 보물함</h1>
      {treasureList.length !== 0 ? (
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateRows: "1fr ",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {treasureList.map((treasure) => (
            <div
              key={treasure.adventureId}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#F6F9F8",
                margin: "0.5rem",
                borderRadius: "999px",
                padding: "2rem 0.5rem",
              }}
              onClick={() => {
                navigate(`/adventure/detail/${treasure.adventureId}}`);
              }}
            >
              <Hashicon
                value={
                  treasure.adventureId + treasure.feat + treasure.adventureTitle
                }
                size={60}
              />
              <div style={{ marginTop: "1rem" }}>{treasure.feat}</div>
              <div
                style={{
                  marginTop: "0.3rem",
                  color: "grey",
                  fontSize: "0.8rem",
                }}
              >
                {treasure.adventureTitle}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "large", marginTop: "5vh" }}>
          앗! 아직 보물이 없어요
        </div>
      )}
    </div>
  );
}

export default TreasurePage;
