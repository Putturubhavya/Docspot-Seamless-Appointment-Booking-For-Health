import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(!!localStorage.getItem("userData"));

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem("userData");
      setUserLoggedIn(!!userData);
    };

    // Update login state when a login event is dispatched
    window.addEventListener("user-login", checkLoginStatus);

    // Optional: sync state across tabs or if localStorage changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("user-login", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {userLoggedIn && (
              <>
                <Route path="/adminhome" element={<AdminHome />} />
                <Route path="/userhome" element={<UserHome />} />
                <Route path="/userhome/userappointments/:doctorId" element={<UserAppointments />} />
              </>
            )}

            {/* Optional fallback to Login if user is not logged in */}
            {!userLoggedIn && (
              <Route path="*" element={<Login />} />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
