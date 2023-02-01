import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Step4Done = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/adventure"); // 추후 모험 상세 페이지로 수정
    }, 3000);
  }, []);

  return <div>DONE</div>;
};

export default Step4Done;
