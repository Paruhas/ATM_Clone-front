import axios from "../../configs/axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useHistory } from "react-router-dom";
import { setToken } from "../../services/localStorageService";
import Swal from "sweetalert2";

const isNumber = /^[0-9]*$/;

function Login() {
  const [inputLogin, setInputLogin] = useState({ username: "", password: "" });

  const { setIsAuthenticated } = useContext(AuthContext);
  const { isError, setIsError, clearError } = useContext(ErrorContext);

  const history = useHistory();

  const handlerInputLoginChange = (event) => {
    const { name, value } = event.target;

    setInputLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const { username, password } = inputLogin;

      if (!username || !username.trim()) {
        throw new Error("username is required");
      }
      if (!password || !password.trim()) {
        throw new Error("password is required");
      }

      const loginRes = await axios.post("/login", {
        username: username,
        password: password,
      });

      clearError();

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
      });

      setToken(loginRes.data.token);
      setIsAuthenticated(true);
      history.push("/user");
    } catch (error) {
      console.log(error);
      if (error.response?.data.message) {
        setIsError({ Login: error.response?.data.message });
      } else {
        setIsError({ Login: error.message });
      }
    }
  };

  const [togglePassword, setTogglePassword] = useState({
    password: "password",
  });

  const handlerTogglePassword = (e) => {
    e.preventDefault();
    togglePassword.password === "password"
      ? setTogglePassword((prev) => ({ ...prev, password: "text" }))
      : setTogglePassword((prev) => ({ ...prev, password: "password" }));
  };

  return (
    <div className="login-box">
      <form>
        <h1>LOGIN</h1>
        <p>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handlerInputLoginChange}
          />
        </p>
        <p>
          <input
            type={togglePassword.password}
            placeholder="password"
            name="password"
            onChange={handlerInputLoginChange}
          />
          <span
            className="toggle-password"
            onClick={handlerTogglePassword}
            style={
              togglePassword.password === "text"
                ? { backgroundColor: "red" }
                : {}
            }
          >
            SHOW
          </span>
        </p>
        {isError?.Login ? (
          <p className="error-msg">{isError.Login}</p>
        ) : (
          <p className="error-msg" style={{ opacity: 0 }}>
            .
          </p>
        )}
        <p>
          <button onClick={handlerSubmitLogin}>LOGIN</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
