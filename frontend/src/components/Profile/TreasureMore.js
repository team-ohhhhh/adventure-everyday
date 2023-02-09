import style from './TreasureMore.module.css'
import { Hashicon } from "@emeraldpay/hashicon-react";
import { useSelector } from 'react-redux';
import { useState } from 'react'
import axios from 'axios'




const TreasureMore = function(treasureList, adventureList, toggle, getAdventures) {
  const URL = useSelector((state) => state.url)
  const TOKEN = useSelector((state) => state.token)
  const USER = useSelector((state) => state.user)

  const [checkedItems, setCheckedItems] = useState(new Set(treasureList.filter((item) => item.adventureId)))

  const check = function(id) {
    if (checkedItems.has(id)) {
      setCheckedItems((prev) => prev.delete(id))
    } else {
      setCheckedItems((prev) => prev.add(id))
    }
  }

  const changeTreasure = function() {
    const selectedTreasures = Array.form(checkedItems)
    axios({
      url : URL + `/adventures/${USER.userId}/treasures/representatives`,
      method : 'post',
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      data: {
        selectedTreasures
      }
    })
    .then((res) => {
      getAdventures('createTimeDesc')
      toggle()
    })
    .catch((err) => console.log(err))
  }



  return (
    <div>
      <button onClick={() => {changeTreasure()}}></button>
      {adventureList.map((adventure) => {
        return (
          <div onClick={() => {check(adventure.adventureId)}} className={checkedItems.has(adventure.adventureId) ? style.isChecked : style.isNotChecked}>
            <Hashicon value={'14'} size={80} />
            <div>
              <div>{adventure.feat}</div>
              <div>{adventure.Title}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TreasureMore