import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Step1CheckPoint from "../components/adventureCreate/Step1CheckPoint";
import Step2Content from "../components/adventureCreate/Step2Content";
import Step3Badge from "../components/adventureCreate/Step3Badge";
import Step4Done from "../components/adventureCreate/Step4Done";

const AdventureCreatePage = () => {
  const [checkPoints, setCheckPoints] = useState([]);

  return (
    <div className="pageContainer" style={{ padding: "30px" }}>
      <h1>탐험 생성</h1>
      <Routes>
        <Route
          path=""
          element={
            <Step1CheckPoint
              checkPoints={checkPoints}
              setCheckPoints={setCheckPoints}
            />
          }
        />
        <Route path="2" element={<Step2Content />} />
        <Route path="3" element={<Step3Badge />} />
        <Route path="4" element={<Step4Done />} />
      </Routes>
    </div>
  );
};

export default AdventureCreatePage;
