import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { useSelector } from "react-redux";
import Post from "./pages/Post";
import PostDetails from "./pages/PostDetails";



function App() {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <div className="App" data-theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post/details" element={<PostDetails/>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
