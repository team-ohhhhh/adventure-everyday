import React from "react";

const CheckPointList = ({
  article,
  setArticle,
  checkPointList,
  styles,
  isAdvSelected,
  setIsAdvSelected,
  setPostType,
}) => {
  const onSelect = (point) => {
    setIsAdvSelected(true);
    setArticle((article) => ({
      ...article,
      isCheckPoint: true,
      adventureId: point.adventureId,
      adventureTitle: point.adventureTitle,
      adventurePlaceId: point.adventurePlaceId,
      adventurePlaceTitle: point.adventurePlaceTitle,
    }));
    setPostType(2);
  };

  const onNotSelect = () => {
    setIsAdvSelected(true);
    setArticle((article) => ({
      ...article,
      isCheckPoint: false,
      adventureId: null,
      adventureTitle: null,
      adventurePlaceId: null,
      adventurePlaceTitle: null,
    }));
    setPostType(1);
  };

  const checkSelect = (adventureId, adventurePlaceId) => {
    if (!article.isCheckPoint) {
      return false;
    } else if (
      !(
        article.adventureId === adventureId &&
        article.adventurePlaceId === adventurePlaceId
      )
    ) {
      return false;
    }
    return true;
  };

  const checkNotSelect = () => {
    if (isAdvSelected && !article.isCheckPoint) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {checkPointList.map((point) => (
        <div key={`${point.adventureId}-${point.adventurePlaceId}`}>
          <div
            className={`${styles.textContainer} ${styles.option} ${
              checkSelect(point.adventureId, point.adventurePlaceId)
                ? styles.selected
                : ""
            }`}
            onClick={() => {
              onSelect(point);
            }}
          >
            {point.adventureTitle} - {point.adventurePlaceTitle}
          </div>
        </div>
      ))}
      <div
        className={`${styles.textContainer} ${styles.option}  ${
          checkNotSelect() ? styles.selected : ""
        }`}
        onClick={onNotSelect}
      >
        선택 안 함
      </div>
    </div>
  );
};

export default CheckPointList;
