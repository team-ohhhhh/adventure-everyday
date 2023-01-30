import React from "react";
import SelectAdvItem from "./SelectAdvItem";

const SelectAdvList = (props) => {
  const advList = props.advList;

  const onSelect = (id) => {
    const newAdvList = advList.map((advItem) => {
      if (advItem.id !== id) {
        return { ...advItem, selected: false };
      } else {
        props.setArticle((article) => ({
          ...article,
          isAdv: true,
          advId: id,
        }));
        return { ...advItem, selected: true };
      }
    });
    props.setAdvList(newAdvList);
  };

  return (
    <>
      <h1>탐험</h1>
      <div>
        {advList.map((advItem) => (
          <SelectAdvItem
            advItem={advItem}
            key={advItem.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
};

export default SelectAdvList;
