import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx";



function App() {
  useEffect(() => {
    // Dynamically update the body class based on the current route
    const currentPath = window.location.pathname;

    if (currentPath === "/login") {
      document.body.className = "login-body";
    } else if (currentPath === "/register") {
      document.body.className = "register-body";
    }  else {
      document.body.className = ""; // Default body class
    }
  }, []);

  return (
    <Router> {/* Wrap the app with Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
