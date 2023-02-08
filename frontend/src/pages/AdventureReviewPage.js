import styles from "./AdventureReviewPage.module.css";
import ReviewCreate from "../components/Adventure/review/ReviewCreate";
import ReviewComplete from "../components/Adventure/review/ReviewComplete";
import { Route, Routes } from "react-router-dom";

function AdventureReviewPage() {
  return (
    <div className="pageContainer">
      <Routes>
        <Route path="" element={<ReviewCreate />} />
        <Route path="complete" element={<ReviewComplete />} />
      </Routes>
    </div>
  );
}

export default AdventureReviewPage;
