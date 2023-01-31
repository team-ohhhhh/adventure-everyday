import React, { useState } from "react";
import style from "./NavBar.module.css"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [feedTab, setFeedTab] = useState('black')
  const [mapTab, setMapTab] = useState('black')
  const [adventureTab, setAdventureTab] = useState('black')
  const [profileTab, setProfileTab] = useState('black')

  const navigate = useNavigate()

  const setAllBlack = function() {
    setFeedTab('black')
    setMapTab('black')
    setAdventureTab('black')
    setProfileTab('black')
  }

  return (
    <nav className={style.wrapper}>
      <div className={style.tab} style={{color:`${feedTab}`}} onClick={() => { navigate('/feed'); setAllBlack(); setFeedTab('#1C0B69');  }}>피드</div> 
      <div className={style.tab} style={{color:`${mapTab}`}} onClick={() => { navigate('/'); setAllBlack(); setMapTab('#1C0B69');  }}>지도</div>
      <div className={style.writeButtonContainer}><div className={style.writeButton} onClick={() => { navigate('/write'); setAllBlack(); }}><img src="writeButton.png"/></div></div>
      <div className={style.tab} style={{color:`${adventureTab}`}} onClick={() => { navigate('/adventure'); setAllBlack(); setAdventureTab('#1C0B69');  }}>탐험</div>
      <div className={style.tab} style={{color:`${profileTab}`}} onClick={() => { navigate('/profile'); setAllBlack(); setProfileTab('#1C0B69');  }}>프로필</div>
    </nav>
  );
};

export default NavBar;