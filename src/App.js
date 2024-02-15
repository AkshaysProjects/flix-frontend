import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [cookie, setCookie, removeCookie] = useCookies([
    "access_token",
    "user",
  ]);

  useEffect(() => {
    // Helper function to fetch the user data
    const fetchUser = async () => {
      try {
        // Fetch the user data
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${cookie.access_token}`,
            },
          }
        );

        // Update the user cookie only if the fetched user is different from the current one
        if (
          JSON.stringify(cookie.user) !== JSON.stringify(response.data.user)
        ) {
          setCookie("user", response.data.user);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          removeCookie("access_token");
        } else {
          console.error("User Fetch Error:", err);
        }
      }
    };

    if (cookie.access_token) {
      fetchUser();
    } else if (!cookie.access_token && cookie.user) {
      removeCookie("user");
    }
  }, [cookie.access_token, cookie.user, removeCookie, setCookie]);

  return (
    <>
      <Routes>
        {" "}
        <Route path="/" element=<Home /> />
        <Route path="/login" element=<Login /> />
        <Route path="/register" element=<Register /> />
      </Routes>
    </>
  );
}

export default App;
