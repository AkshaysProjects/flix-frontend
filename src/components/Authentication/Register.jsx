import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ActionButton from "./ActionButton";

const Register = () => {
  // State to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to mamage focus on the input fields
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  // State to manage the error message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Placeholder function to handle the Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing Up with:", email, password, confirmPassword);
  };

  // Navigate to Login Page
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-3xl bg-box-bg p-8 max-w-md w-full shadow-xl">
        <h1 className="text-heading-l text-white mb-8">Login</h1>

        <form onSubmit={handleSignUp} className="space-y-5">
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
          {/* Confirm Password Input Field*/}
          <InputField
            id="confirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <ActionButton text="Create an account" />
        </form>

        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-400 mr-2">Already have an account?</p>
          <button
            onClick={handleLoginClick}
            className="text-red-bg text-body-m underline hover:text-red-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
