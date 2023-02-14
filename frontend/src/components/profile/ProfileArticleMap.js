import { Map, MapMarker } from "react-kakao-maps-sdk";
import HorizontalScroll from "../HorizontalScroll";

const ProfileArticleMap = function ({ articleList, userHeight }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "50%" }}>
      <Map
        center={{ lat: 37.5016117, lng: 127.0397674 }}
        //TODO: 여기 높이 고민하기 CSS 이슈
        style={{ width: "100vw", height: userHeight }}
        level={4}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            zIndex: "100",
            width: "100%",
            marginBottom: "10vh",
          }}
        >
          <HorizontalScroll articleList={articleList} contentType={"article"} />
        </div>

        {articleList.map((article) => {
          return (
            <MapMarker
              key={article.postId}
              position={{ lat: article.lat, lng: article.lng }}
              image={{
                src: "/images/articlePin.png",

                size: {
                  width: 50,
                  height: 50,
                },
                options: {
                  offset: {
                    x: 12,
                    y: 20,
                  },
                },
              }}
            />
          );
        })}
      </Map>
    </div>
  );
};

export default ProfileArticleMap;
