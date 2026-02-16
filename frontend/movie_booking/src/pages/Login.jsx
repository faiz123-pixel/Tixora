import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [captcha, setCaptcha] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    resetField,
  } = useForm();

  // 🔐 Generate captcha
  const generateCaptcha = () => {
    const code = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(code.toString());
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // ✅ Submit handler
  const onSubmit = (data) => {
    if (data.captcha !== captcha) {
      setError("captcha", {
        type: "manual",
        message: "Captcha does not match",
      });
      generateCaptcha();
      resetField("captcha");
      return;
    }

    clearErrors();
    navigate("/admin"); // redirect to home
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>

        {/* 📱 Mobile number */}
        <input
          type="tel"
          placeholder="Mobile Number"
          maxLength="10"
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit mobile number",
            },
          })}
        />
        {errors.mobile && (
          <p className="error">{errors.mobile.message}</p>
        )}

        {/* 🔢 Captcha */}
        <div className="captcha-row">
          <div className="captcha-box">{captcha}</div>
          <button
            type="button"
            className="refresh-btn"
            onClick={generateCaptcha}
          >
            🔄
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          {...register("captcha", {
            required: "Captcha is required",
          })}
        />
        {errors.captcha && (
          <p className="error">{errors.captcha.message}</p>
        )}

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="register-link">
          Not registered? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
