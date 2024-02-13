import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ActionButton from "./ActionButton";

const Login = () => {
  // State to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to mamage focus on the input fields
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // State to manage the error message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Placeholder function to handle the Login
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  // Navigate to Sign Up Page
  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-3xl bg-box-bg p-8 max-w-md w-full shadow-xl">
        <h1 className="text-heading-l text-white mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address Input Field*/}
          <InputField
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input Field*/}
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ActionButton text="Login to your account" />
        </form>

        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-400 mr-2">Don't have an account?</p>
          <button
            onClick={handleSignupClick}
            className="text-red-bg text-body-m underline hover:text-red-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
