import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Step1CheckPoint from "../components/adventureCreate/Step1CheckPoint";
import Step2Content from "../components/adventureCreate/Step2Content";
import Step3Badge from "../components/adventureCreate/Step3Badge";
import Step4Done from "../components/adventureCreate/Step4Done";

const AdventureCreatePage = () => {
  const [checkPoints, setCheckPoints] = useState([]);
  const [advCheckPoints, setAdvCheckPoints] = useState([]);
  const [adv, setAdv] = useState({
    category: "맛집",
    featTitle: "",
    featContent: "",
    title: "",
    content: "",
    difficulty: null,
    startDate: null,
    endDate: null,
    photo: null,
  });

  return (
    <div className="pageContainer" style={{ padding: "30px" }}>
      <Routes>
        <Route
          path=""
          element={
            <Step1CheckPoint
              checkPoints={checkPoints}
              setCheckPoints={setCheckPoints}
              advCheckPoints={advCheckPoints}
              setAdvCheckPoints={setAdvCheckPoints}
              adv={adv}
              setAdv={setAdv}
            />
          }
        />
        <Route
          path="2"
          element={
            <Step2Content checkPoints={checkPoints} adv={adv} setAdv={setAdv} />
          }
        />
        <Route
          path="3"
          element={
            <Step3Badge
              adv={adv}
              setAdv={setAdv}
              advCheckPoints={advCheckPoints}
            />
          }
        />
        <Route path="4" element={<Step4Done />} />
      </Routes>
    </div>
  );
};

export default AdventureCreatePage;
