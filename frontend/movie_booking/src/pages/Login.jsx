import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/Login.css";
import { loginApi } from "../services/api";
import { LoginContext } from "../context/LoginContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [captcha, setCaptcha] = useState("");
  const { login } = useContext(LoginContext);
  const from = location.state?.from || "/";
  const checkoutData = location.state?.checkoutData;

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
  const onSubmit = async (data) => {
    if (data.captcha !== captcha) {
      setError("captcha", {
        type: "manual",
        message: "Captcha does not match",
      });
      generateCaptcha();
      resetField("captcha");
      return;
    }

    try {
      const res = await loginApi.post("", data);

      login(res.data.userDto, res.data.token);

      alert("Login Successful");

      // 🔐 Admin redirect
      if (
        res.data.userDto.role.userRole === "ROLE_ADMIN" ||
        res.data.userDto.role.userRole === "ROLE_SUPER_ADMIN"
      ) {
        navigate("/admin");
        return;
      }

      // 🎟️ If user came from checkout
      if (from === "/checkout" && checkoutData) {
        navigate("/checkout", { state: checkoutData });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      alert("Invalid mobile number or password");
    }

    clearErrors();
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
          {...register("mobileNo", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit mobile number",
            },
          })}
        />
        {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}

        {/* 🔑 Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

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
        {errors.captcha && <p className="error">{errors.captcha.message}</p>}

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
