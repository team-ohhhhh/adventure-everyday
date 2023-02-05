import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step2Content = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("hi");
  }, []);

  return (
    <div>
      <h1>write content</h1>

      <button onClick={() => navigate(-1)}>이전</button>
      <button onClick={() => navigate("/adventure/create/3")}>다음</button>
    </div>
  );
};

export default Step2Content;
