import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile.jsx";
import "../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [invalidFormData, setInvalidFormData] = useState({
    username: false,
    password: false,
    confirmPassword: false,
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
      password: formData.password.length < 8 || formData.password.length > 12,
      confirmPassword:
        !formData.confirmPassword ||
        formData.password !== formData.confirmPassword,
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
        <h1>Register</h1>

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
          <p className={invalidFormData.password ? "invalid" : ""}>
            Password must be 8–12 characters long
          </p>
        </div>

        <div
          className={`input-field--auth ${
            invalidFormData.confirmPassword ? "invalid" : ""
          }`}
        >
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={changeHandler}
            placeholder=" "
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
        </div>

        <div className="bottom-panel--auth">
          <button type="submit" className="send-btn" onClick={clickHandler}>
            Sign Up
          </button>

          <p className="info">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
