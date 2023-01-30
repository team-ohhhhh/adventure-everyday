import React from "react";
import SelectAdvItem from "./SelectAdvItem";

const SelectAdvList = ({ advList, setAdvList, setArticle }) => {
  // 선택된 옵션 다시 누른 경우
  // 누른 옵션 -> 셀렉티드 폴스, 모험 등록 취소
  // 나머지 옵션 -> 그대로
  // 선택 안 된 옵션 누른 경우
  // 누른 옵션 -> 셀렉티드 트루, 모험 등록
  // 나머지 옵션 -> 셀렉티드 폴스
  const onSelect = (isSelected, id) => {
    const newAdvList = advList.map((advItem) => {
      if (isSelected && id === advItem.id) {
        setArticle((article) => ({
          ...article,
          isAdv: false,
          advId: null,
        }));
        return { ...advItem, isSelected: false };
      } else if (isSelected && id !== advItem.id) {
        return { ...advItem };
      } else if (!isSelected && id === advItem.id) {
        setArticle((article) => ({
          ...article,
          isAdv: true,
          advId: id,
        }));
        return { ...advItem, isSelected: true };
      } else {
        return { ...advItem, isSelected: false };
      }
    });
    setAdvList(newAdvList);
  };

  return (
    <>
      <h1>탐험</h1>
      <div>
        {advList.map((advItem) => (
          <SelectAdvItem
            key={advItem.id}
            advItem={advItem}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
};

export default SelectAdvList;
