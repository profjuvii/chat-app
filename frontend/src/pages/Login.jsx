import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile.jsx";
import "../styles/auth.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [invalidFormData, setInvalidFormData] = useState({
    username: false,
    password: false,
  });

  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInvalidFormData((prev) => ({ ...prev, [name]: false }));
  };

  const clickHandler = () => {
    const dataValidation = {
      username: !formData.username.trim(),
      password: !formData.password,
    };
    if (Object.values(dataValidation).some(Boolean)) {
      return setInvalidFormData(dataValidation);
    }
    const path = isMobile ? "/messages" : "/chat";
    navigate(path);
  };

  return (
    <div className="page--auth">
      <div className="form--auth">
        <h1>Login</h1>

        <div
          className={`input-field--auth ${
            invalidFormData.username ? "invalid" : ""
          }`}
        >
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={changeHandler}
            placeholder=" "
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        <div
          className={`input-field--auth ${
            invalidFormData.password ? "invalid" : ""
          }`}
        >
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder=" "
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="bottom-panel--auth">
          <button type="submit" className="send-btn" onClick={clickHandler}>
            Sign In
          </button>

          <p className="info">
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
