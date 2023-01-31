import React from "react";
import "./App.css";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route, Link } from "react-router-dom";
import AdventurePage from "./pages/AdventurePage";
import NavBar from "./components/NavBar";
import MapPage from "./pages/MapPage";
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
        <Route path="/" element={<MapPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/adventure" element={<AdventurePage />} />
        <Route path="/write" element={<ArticleCreatePage />} />
      </Routes>
      <NavBar />
    </div>
  );
}

export default App;
