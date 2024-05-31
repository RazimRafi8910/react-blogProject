import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const theme = useSelector(state => state.themeReducer.theme);

  return (
    <>
      <div className="App" data-theme={theme}>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  );
}

export default App;


{/*     <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/new" element={<NewPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post/details" element={<PostDetailsPage/>} />
          </Routes>
        </Router> */}