import axios from "../../configs/axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorContext } from "../../contexts/ErrorContext";
import { useHistory } from "react-router-dom";
import { setToken } from "../../services/localStorageService";
import Swal from "sweetalert2";

const isNumber = /^[0-9]*$/;

function Register() {
  const [inputRegister, setInputRegister] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const { setIsAuthenticated } = useContext(AuthContext);
  const { isError, setIsError, clearError } = useContext(ErrorContext);

  const history = useHistory();

  const handlerInputRegisterChange = (event) => {
    const { name, value } = event.target;

    setInputRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handlerSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      const { username, password, confirmPassword } = inputRegister;

      if (!username || !username.trim()) {
        throw new Error("username is required");
      }
      if (!password || !password.trim()) {
        throw new Error("password is required");
      }
      if (!confirmPassword || !confirmPassword.trim()) {
        throw new Error("confirmPassword is required");
      }
      if (password !== confirmPassword) {
        throw new Error("password and confirmPassword not match");
      }
      if (!isNumber.test(password)) {
        throw new Error("this password is invalid format; digit only");
      }

      const registerRes = await axios.post("/register", {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      });

      clearError();

      await Swal.fire({
        icon: "success",
        title: "Register Successful",
      });

      setToken(registerRes.data.token);
      setIsAuthenticated(true);
      history.push("/user");
    } catch (error) {
      console.log(error);
      if (error.response?.data.message) {
        setIsError({ Register: error.response?.data.message });
      } else {
        setIsError({ Register: error.message });
      }
    }
  };

  const [togglePassword, setTogglePassword] = useState({
    password: "password",
    confirmPassword: "password",
  });

  const handlerTogglePassword = (e) => {
    e.preventDefault();
    togglePassword.password === "password"
      ? setTogglePassword((prev) => ({ ...prev, password: "text" }))
      : setTogglePassword((prev) => ({ ...prev, password: "password" }));
  };

  const handlerToggleConfirmPassword = (e) => {
    e.preventDefault();
    togglePassword.confirmPassword === "password"
      ? setTogglePassword((prev) => ({ ...prev, confirmPassword: "text" }))
      : setTogglePassword((prev) => ({ ...prev, confirmPassword: "password" }));
  };

  return (
    <div className="register-box">
      <form>
        <h1>REGISTER</h1>
        <p>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handlerInputRegisterChange}
          />
        </p>
        <p>
          <input
            type={togglePassword.password}
            placeholder="password"
            name="password"
            onChange={handlerInputRegisterChange}
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
        <p>
          <input
            type={togglePassword.confirmPassword}
            placeholder="confirm password"
            name="confirmPassword"
            onChange={handlerInputRegisterChange}
          />
          <span
            className="toggle-password"
            onClick={handlerToggleConfirmPassword}
            style={
              togglePassword.confirmPassword === "text"
                ? { backgroundColor: "red" }
                : {}
            }
          >
            SHOW
          </span>
        </p>
        {isError?.Register ? (
          <p className="error-msg">{isError.Register}</p>
        ) : (
          <p className="error-msg" style={{ opacity: 0 }}>
            .
          </p>
        )}
        <p>
          <button onClick={handlerSubmitRegister}>REGISTER</button>
        </p>
      </form>
    </div>
  );
}

export default Register;
