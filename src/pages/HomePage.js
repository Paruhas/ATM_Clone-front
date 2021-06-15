import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-content">
      <div className="login-box">
        <form>
          <h1>LOGIN</h1>
          <p>
            <input type="text" placeholder="username" />
          </p>
          <p>
            <input type="password" placeholder="password" />
          </p>
          <p>
            <button>LOGIN</button>
          </p>
        </form>
      </div>
      <div className="or-box">
        <h3>OR</h3>
      </div>
      <div className="register-box">
        <form>
          <h1>REGISTER</h1>
          <p>
            <input type="text" placeholder="username" />
          </p>
          <p>
            <input type="password" placeholder="password" />
          </p>
          <p>
            <input type="password" placeholder="confirm password" />
          </p>
          <p>
            <button>REGISTER</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
