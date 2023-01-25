import React from "react";
import "./App.css";
import KakaoMap from "./KakaoMap";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route, Link } from "react-router-dom";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import ArticlePhoto from "./pages/ArticlePhoto";
import ArticleText from "./pages/ArticleText";

function App() {
  return (
    <div className="App">
      <div>
        <Link to="/">home</Link>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <Link to="/create">create</Link>
      </div>
      <Routes>
        <Route path="/" element={<KakaoMap />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/create/" element={<ArticleCreatePage />} />
        <Route path="/create/photo" element={<ArticlePhoto />} />
        <Route path="/create/text" element={<ArticleText />} />
      </Routes>
    </div>
  );
}

export default App;
