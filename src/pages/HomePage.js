import React from "react";
import Login from "../components/HomePage/Login";
import Register from "../components/HomePage/Register";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-content">
      <Login />
      <div className="or-box">
        <h3>OR</h3>
      </div>
      <Register />
    </div>
  );
}

export default HomePage;
