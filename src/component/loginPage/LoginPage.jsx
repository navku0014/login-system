import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";
import Group from "../../assets/images/Group.png";
import account_circle from "../../assets/images/account_circle.svg";
import mail from "../../assets/images/mail.svg";
import visibility from "../../assets/images/visibility.svg";
import key from "../../assets/images/key.svg";
import { loginUser } from '../../service/LoginServices';
import g from "../../assets/images/G.svg";
import facebookIcon from "../../assets/images/facebookIcon.svg";

export default function LoginPage({ setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "username":
        if (value !== "emilys") {
          error = "UserName must be emilys.";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Enter a valid email address.";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const validateFields = () => {
    validateField("username", username);
    validateField("email", email);
    validateField("password", password);

    return Object.values(errors).every((error) => !error);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      const data = await loginUser(username, password);
      console.log("Login successful", data);
      localStorage.setItem("accessToken", data.refreshToken);
      setUserData(data);
      navigate('/home');
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid login credentials");
    }
  };

  const handleBlur = (field) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    validateField(field, eval(field));
  };

  const renderError = (field) => {
    return (
      errors[field] && touched[field] && (
        <div className="bg-red-700 text-white text-sm px-3 py-2 mt-1 rounded relative after:content-[''] after:absolute after:-top-2 after:left-4 after:w-0 after:h-0 after:border-l-4 after:border-r-4 after:border-b-4 after:border-l-transparent after:border-r-transparent after:border-b-red-700">
          {errors[field]}
        </div>
      )
    );
  };

  return (
    <div className="bg-gray-50 p-10 w-full flex min-h-lvh">
      <div className="w-1/2 md:flex hidden justify-center items-center">
        <img src={Group} alt="Login Illustration" className="login-image" />
      </div>

      <form onSubmit={handleLogin} className="w-1/2 flex-grow border-2 border-gray-200 bg-white p-6 rounded-2xl">
        <h1 className="text-2xl mb-5">
          <span className="font-sans text-black">Welcome to</span>
          <span className="font-bold text-primary bold block">Unstop</span>
        </h1>
        <button className="border border-gray-200 bg-white p-4 text-center rounded-2xl inline-flex justify-center items-center w-full mb-5 shadow-sm">
          <img src={g} alt="google" />Login with Google
        </button>
        <button className="border border-gray-200 bg-white p-4 text-center rounded-2xl inline-flex justify-center items-center w-full mb-5  shadow-sm">
          <img src={facebookIcon} alt="faceBook" />Login with Facebook
        </button>

        <div className="flex items-center mb-3 bg-gray-100 p-3 !rounded-xl">
          <span className="mr-3">
            <img src={account_circle} alt="accountImage" />
          </span>
          <div className="flex-grow text-black">
            <label className="text-xs">UserName</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => handleBlur("username")}
              type="text"
              placeholder="UserName"
              className="border-none p-0 w-full bg-transparent text-lg font-extrabold focus:outline-none border-0"
            />
          </div>
        </div>
        {renderError("username")}

        <div className="flex items-center mb-3 bg-gray-100 p-3 !rounded-xl">
          <span className="mr-3">
            <img src={mail} alt="mail" />
          </span>
          <div className="flex-grow text-black">
            <label className="text-xs">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              type="email"
              placeholder="username@email.com"
              className="border-none p-0 w-full bg-transparent text-lg font-extrabold focus:outline-none border-0"
            />
          </div>
        </div>
        {renderError("email")}

        <div className="flex items-center mb-3 bg-gray-100 p-3 !rounded-xl">
          <span className="mr-3">
            <img src={key} alt="key" />
          </span>
          <div className="flex-grow text-black">
            <label className="text-xs">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              placeholder="password"
              value={password}
              className="border-none p-0 w-full bg-transparent text-lg font-extrabold focus:outline-none border-0"
            />
          </div>
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="ml-3 cursor-pointer"
            style={{ cursor: "pointer" }}
          >
            <img src={visibility} alt="visibility" />
          </span>
        </div>
        {renderError("password")}

        <div className="flex justify-between mb-5 text-sm">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a className="text-primary hover:underline cursor-pointer" style={{ cursor: "pointer" }}>Forgot password</a>
        </div>
        <button className="bg-primary p-4 text-white text-center rounded-2xl block w-full mb-3  shadow-sm">
          Login
        </button>
        <div className="text-center text-sm">
          Don't have an account? <a className="text-primary hover:underline cursor-pointer" style={{ cursor: "pointer" }}>Register</a>
        </div>
      </form>
    </div>
  );
}
