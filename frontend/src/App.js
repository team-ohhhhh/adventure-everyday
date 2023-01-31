import React from "react";
import "./App.css";
import KakaoMap from "./KakaoMap";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route, Link } from "react-router-dom";
import AdventurePage from "./pages/AdventurePage";
import AdventureDetailPage from "./pages/AdventureDetailPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<KakaoMap />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/adventure" element={<AdventurePage />} />
        <Route path="/adventure/detail/:id" element={<AdventureDetailPage />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
