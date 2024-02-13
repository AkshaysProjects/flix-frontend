import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import Logo from "./Logo";

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

  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Login box ref
  const registerBoxRef = useRef(null);

  // Logo top position
  const [logoTop, setLogoTop] = useState("");

  // Helper function to calculate the logo top position
  const calculateLogoTop = () => {
    if (registerBoxRef.current) {
      const registerBoxTop = registerBoxRef.current.getBoundingClientRect().top;
      const middlePosition = registerBoxTop / 2 + window.scrollY;
      if (middlePosition - 13 > 0) setLogoTop(`${middlePosition - 13}px`);
      else setLogoTop("0px");
    }
  };

  // Set the logo top position
  useEffect(() => {
    // Calculate the logo top position on mount
    calculateLogoTop();

    // Recalculate on window resize
    window.addEventListener("resize", calculateLogoTop);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", calculateLogoTop);
  }, []);

  // Placeholder function to handle the Sign Up
  const handleSignUp = (e) => {
    e.preventDefault();

    // Reset the error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check if the email is empty
    if (email === "") {
      setEmailError("Cannot be empty");
    }
    // Validate the email address
    else if (!emailRegex.test(email)) {
      setEmailError("Invalid email");
    }

    // Check if the password is empty
    if (password === "") {
      setPasswordError("Cannot be empty");
    }

    // Check if the confirm password is empty
    if (confirmPassword === "") {
      setConfirmPasswordError("Cannot be empty");
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    // Break the function if there are any errors
    if (emailError || passwordError || confirmPasswordError) return;

    // Placeholder for the sign up functionality
    console.log("Signing Up with:", email, password, confirmPassword);
  };

  // Navigate to Login Page
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Logo logoTop={logoTop} />

      <div
        ref={registerBoxRef}
        className="rounded-3xl bg-box-bg p-8 max-w-md w-full shadow-xl"
      >
        <h1 className="text-heading-l text-white mb-8">Login</h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Email Address Input Field*/}
          <InputField
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            focus={emailFocus}
            onFocusChange={(focus) => {
              setEmailFocus(focus);
              setEmailError("");
            }}
          />
          {/* Password Input Field*/}
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            focus={passwordFocus}
            onFocusChange={(focus) => {
              setPasswordFocus(focus);
              setPasswordError("");
            }}
          />
          {/* Confirm Password Input Field*/}
          <InputField
            id="confirmPassword"
            type="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            focus={confirmPasswordFocus}
            onFocusChange={(focus) => {
              setConfirmPasswordFocus(focus);
              setConfirmPasswordError("");
            }}
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
