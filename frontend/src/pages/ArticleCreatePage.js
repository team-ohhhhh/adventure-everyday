import React, { useState } from "react";
import Step1Location from "../components/articleCreate/Step1Location";
import Step2Content from "../components/articleCreate/Step2Content";
import Step3Done from "../components/articleCreate/Step3Done";

const ArticleCreatePage = () => {
  // 게시글 작성 단계
  // 1 : 장소 선택, 2 : 내용 입력, 3 : 완료
  const [step, setStep] = useState(1);

  const [article, setArticle] = useState({
    type: "text",
    image: null,
    lat: 37.50128745884959,
    lng: 127.03956225524968,
    isAdv: false,
    advId: null,
  });

  switch (step) {
    case 1:
      return (
        <>
          <Step1Location
            article={article}
            setArticle={setArticle}
            setStep={setStep}
          />
        </>
      );
    case 2:
      return (
        <>
          <Step2Content setStep={setStep} />
        </>
      );
    case 3:
      return (
        <>
          <Step3Done setStep={setStep} />
        </>
      );
    default:
      return <></>;
  }
};

export default ArticleCreatePage;
