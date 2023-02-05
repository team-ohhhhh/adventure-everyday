import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step3Badge = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Make Badge</h1>

      <button onClick={() => navigate(-1)}>이전</button>
      <button onClick={() => navigate("/adventure/create/4")}>다음</button>
    </div>
  );
};

export default Step3Badge;
