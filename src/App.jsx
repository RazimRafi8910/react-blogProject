import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { ThemeProvider } from "./context/themeContext";
import Post from "./pages/Post";
import { UserProvider } from "./context/userContext";



function App() {
  const [theme, setTheme] = useState("");
  const [userDetails, setUserDetails] = useState({});
  
  useEffect(() => {
    const deviceTheme = window.localStorage.getItem('theme') || 'light';
    setTheme(deviceTheme);
  }, []);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    window.localStorage.setItem('theme',theme === "light" ? "dark" : "light");
  };

  const changeUserDetails = (user) => {
    setUserDetails(user);
  }

  return (
    <>
      <ThemeProvider value={{ theme, changeTheme }}>
        <UserProvider value={{userDetails,changeUserDetails}}>
          
      <div className="App" data-theme={theme}>
        <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<Post/>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage/>}/>
          </Routes>
        </Router>
          </div>
          
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
