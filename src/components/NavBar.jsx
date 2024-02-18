import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaFilm, FaTv, FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/user/userSlice";

const NavBar = () => {
  // State and refs
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const profileRef = useRef(null);

  // Redux state and dispatch
  const { pathname } = useLocation();
  const location = pathname.split("/")[1];
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  // Logout function
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  // Effect for calculating popup position
  useEffect(() => {
    const calculatePopupPosition = () => {
      if (profileRef.current && showProfileOptions) {
        const profileRect = profileRef.current.getBoundingClientRect();
        const navbarRect =
          profileRef.current.parentElement.getBoundingClientRect();
        const popupPos =
          profileRect.bottom > profileRect.left
            ? {
                top: navbarRect.bottom - 144,
                left: navbarRect.right - 24,
              }
            : {
                top: navbarRect.bottom + 8,
                left: navbarRect.right - 260,
              };
        setPopupPosition(popupPos);
      }
    };

    calculatePopupPosition();
    window.addEventListener("resize", calculatePopupPosition);

    return () => {
      window.removeEventListener("resize", calculatePopupPosition);
    };
  }, [showProfileOptions]);

  return (
    <nav className="flex justify-between items-center p-4 bg-box-bg lg:w-20 lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:m-8 lg:rounded-xl">
      {/* Logo */}
      <NavLink to="/" className="lg:p-2">
        <img src={Logo} alt="Logo" className="w-10 lg:w-full" />
      </NavLink>

      {/* Navigation links */}
      <div className="flex lg:flex-col lg:items-center lg:justify-center lg:flex-grow lg:mt-4 lg:mb-4">
        <NavLink
          to="/"
          className={`text-white p-3 hover:text-red-500 ${
            !location ? "text-red-500" : "opacity-75"
          }`}
        >
          <FaHome className="w-6 h-6" />
        </NavLink>
        <NavLink
          to="/movies"
          className={`text-white p-3 hover:text-red-500 ${
            location === "movies" ? "text-red-500" : "opacity-75"
          }`}
        >
          <FaFilm className="w-6 h-6" />
        </NavLink>
        <NavLink
          to="/tvshows"
          className={`text-white p-3 hover:text-red-500 ${
            location === "tvshows" ? "text-red-500" : "opacity-75"
          }`}
        >
          <FaTv className="w-6 h-6" />
        </NavLink>
        <NavLink
          to="/watchlist"
          className={`text-white p-3 hover:text-red-500 ${
            location === "watchlist" ? "text-red-500" : "opacity-75"
          }`}
        >
          <FaBookmark className="w-6 h-6" />
        </NavLink>
      </div>

      {/* Profile icon */}
      <div ref={profileRef}>
        <CgProfile
          className="w-6 h-6 lg:mt-auto lg:mb-4 hover:text-red-500 cursor-pointer"
          onClick={() => setShowProfileOptions(!showProfileOptions)}
        />
      </div>

      {/* Profile options popup */}
      {showProfileOptions && (
        <div
          className="bg-box-bg rounded-xl shadow-2xl p-4 absolute"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 100,
          }}
        >
          {access_token ? (
            <div className="text-white text-center">
              <p>{user.data.email}</p>
              <button
                className="bg-red-bg text-white m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-red-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="text-white text-center">
              <button
                className="bg-red-bg text-white m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-red-500"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-red-bg text-white m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-red-500"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
