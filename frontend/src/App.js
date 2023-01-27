import React from "react";
import "./App.css";
import KakaoMap from "./KakaoMap";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import MapMain from "./pages/MapMain";
import { Routes, Route, Link } from "react-router-dom";
import ArticleCreatePage from "./pages/ArticleCreatePage";

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
        <Route path="/map" element={<MapMain />} />
        <Route path="/create/" element={<ArticleCreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
