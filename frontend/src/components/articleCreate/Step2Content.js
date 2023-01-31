import React from "react";

const Step2Content = ({ setStep }) => {
  return (
    <div>
      <h2>step 2</h2>
      <button onClick={() => setStep((step) => step - 1)}>이전</button>
      <button onClick={() => setStep((step) => step + 1)}>완료</button>
    </div>
  );
};

export default Step2Content;
