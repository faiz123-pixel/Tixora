import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/Register.css";

function Register() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    resetField,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

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
    // Captcha validation
    if (data.captcha !== captcha) {
      setError("captcha", {
        type: "manual",
        message: "Captcha does not match",
      });
      generateCaptcha();
      resetField("captcha");
      return;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    clearErrors();
    navigate("/login");
  };

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit(onSubmit)}>
        <h3>Register</h3>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}

        {/* Mobile */}
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
        {errors.mobile && <p className="error">{errors.mobile.message}</p>}

        {/* Password */}
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

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        {/* Captcha */}
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

        <button type="submit" className="register-btn">
          Register
        </button>

        <p className="login-link">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;