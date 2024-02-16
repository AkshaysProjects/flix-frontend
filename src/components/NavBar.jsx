import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaFilm, FaTv, FaBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../features/user/userSlice";

const NavBar = () => {
  // State and refs
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const profileBoxRef = useRef(null);

  // Instantiate the dispatch function
  const dispatch = useDispatch();

  // Check if user is logged in
  const access_token = localStorage.getItem("access_token");

  // Handlers
  const handleProfileClick = () => {
    setShowProfileOptions((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  // Calculate profile box position
  useEffect(() => {
    if (profileRef.current && profileBoxRef.current) {
      const profileRect = profileRef.current.getBoundingClientRect();
      const boxRect = profileBoxRef.current.getBoundingClientRect();
      const top = profileRect.top - boxRect.height;
      const left = profileRect.right - boxRect.width / 2;
      setBoxPosition({ top, left });
    }
  }, [showProfileOptions]);

  // Base CSS classes
  const navItemBaseClass =
    "flex items-center justify-center text-white p-3 rounded w-full";
  const profileBoxBaseClass = "bg-box-bg rounded-xl shadow-2xl p-4 absolute";
  const buttonBaseClass =
    "bg-red-bg text-white m-2 py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-red-500";

  return (
    <nav className="relative">
      <div className="flex flex-col bg-box-bg p-3 fixed inset-y-0 left-0 m-8 rounded-xl w-20 z-50">
        <div className="flex flex-col items-center mb-10">
          <NavLink to="/" className="mb-10 p-2">
            <img src={Logo} alt="Logo" className="w-full" />
          </NavLink>
          {[
            {
              icon: <FaHome className="w-6 h-6" />,
              to: "/",
              label: "Dashboard",
            },
            {
              icon: <FaFilm className="w-6 h-6" />,
              to: "/movies",
              label: "Movies",
            },
            {
              icon: <FaTv className="w-6 h-6" />,
              to: "/tvshows",
              label: "TV Shows",
            },
            {
              icon: <FaBookmark className="w-6 h-6" />,
              to: "/watchlist",
              label: "Watchlist",
            },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={`${navItemBaseClass} hover:text-red-500 mb-2`}
            >
              {item.icon}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto">
          <button
            className={navItemBaseClass}
            onClick={handleProfileClick}
            ref={profileRef}
          >
            <CgProfile className="w-6 h-6 hover:text-red-500" />
          </button>
        </div>
      </div>
      {showProfileOptions && (
        <div
          ref={profileBoxRef}
          className={`${profileBoxBaseClass}`}
          style={{ ...boxPosition, zIndex: 100 }}
        >
          {access_token ? (
            <div className="text-white text-center">
              <p>{user.data.email}</p>
              <button className={buttonBaseClass} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                className={buttonBaseClass}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className={buttonBaseClass}
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
