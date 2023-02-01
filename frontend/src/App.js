import React from "react";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route, Link } from "react-router-dom";
import AdventurePage from "./pages/AdventurePage";
import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
import AdventureCreatePage from "./pages/AdventureCreatePage";
import ArticleCreatePage from "./pages/ArticleCreatePage";

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/write" element={<ArticleCreatePage />} />
          <Route path="/adventure" element={<AdventurePage />} />
          <Route path="/adventure/create" element={<AdventureCreatePage />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  );
}

export default App;
