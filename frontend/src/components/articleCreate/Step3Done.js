import React from "react";

const Step3Done = ({ setStep }) => {
  return (
    <>
      <h2>step 3 완료완료</h2>
      <button onClick={() => setStep((step) => step - 1)}>이전</button>
    </>
  );
};

export default Step3Done;
