import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/Register.css";
import { userApi } from "../services/api";


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

  clearErrors();

  try {
    const { name, mobileNo, password } = data;

    await userApi.post("/register", {
      name,
      mobileNo,
      password,
    });

    alert("Registration completed");
    navigate("/login");

  } catch (error) {
    alert("Something went wrong");
  }
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
          {...register("mobileNo", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter valid 10-digit mobile number",
            },
            validate:async (value)=>{
              try{
              const response=await userApi.get(`/check-mobileNo?mobileNo=${value}`);
              const exists=response.data;
              return exists? "Mobile Number already exists": true;
              }catch(error)
              {
                return "Somthin went Wrong";
              }
            },
          })}
        />
        {errors.mobileNo && <p className="error">{errors.mobileNo.message}</p>}

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