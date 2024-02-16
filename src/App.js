import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Media from "./components/Media";
import { useEffect } from "react";
import { fetchUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { fetchMedia } from "./features/media/mediaSlice";

function App() {
  // Get the access token cookie
  const access_token = localStorage.getItem("access_token");

  // Instantiate the dispatch hook
  const dispatch = useDispatch();

  // fetchUser async thunk from redux
  useEffect(() => {
    dispatch(fetchUser(access_token));
    dispatch(fetchMedia());
  }, [access_token, dispatch]);

  return (
    <>
      <Routes>
        {" "}
        <Route path="/" element=<Home /> />
        <Route path="/login" element=<Login /> />
        <Route path="/register" element=<Register /> />
        <Route path="/media/:id" element=<Media /> />
      </Routes>
    </>
  );
}

export default App;
