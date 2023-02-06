import React from "react";

import CheckPointItem from "./CheckPointItem";

const CheckPointList = ({ setArticle, checkPointList, setCheckPointList }) => {
  const onSelect = (isSelected, id) => {
    const newCheckPointList = checkPointList.map((advItem) => {
      if (isSelected && id === advItem.id) {
        setArticle((article) => ({
          ...article,
          isCheckPoint: false,
          adventureId: null,
          adventurePlaceId: null,
        }));
        return { ...advItem, isSelected: false };
      } else if (isSelected && id !== advItem.id) {
        return { ...advItem };
      } else if (!isSelected && id === advItem.id) {
        setArticle((article) => ({
          ...article,
          isCheckPoint: true,
          adventureId: id,
          adventurePlaceId: id,
        }));
        return { ...advItem, isSelected: true };
      } else {
        return { ...advItem, isSelected: false };
      }
    });
    setCheckPointList(newCheckPointList);
  };

  return (
    <>
      <h1>탐험</h1>
      <div>
        {checkPointList.map((checkpoint) => (
          <CheckPointItem
            key={checkpoint.id}
            checkpoint={checkpoint}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
};

export default CheckPointList;
