import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MediaContainer from "./MediaLibrary/MediaContainer";
import { selectMovies } from "../features/media/selectors";
import { toggleWatchlistItem } from "../features/user/userSlice";
import NavBar from "./NavBar";

const Movies = () => {
  // Access the movies list from the Redux store
  const moviesList = useSelector(selectMovies);

  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve the access token from local storage to check user authentication
  const access_token = localStorage.getItem("access_token");

  // Handler for navigating to the media detail page when a media card is clicked
  const handleCardClick = (id) => {
    navigate(`/media/${id}`);
  };

  // Handler for adding or removing an item from the watchlist
  const handleWatchListClick = (id, type) => {
    if (!access_token) {
      navigate("/login");
      return;
    }
    dispatch(toggleWatchlistItem({ id, type }));
  };

  // Render the Movies component with the Trending and MediaContainer components
  return (
    <div className="p-4 pl-32 pt-8">
      <NavBar />
      <MediaContainer
        mediaList={moviesList}
        handleCardClick={handleCardClick}
        handleWatchListClick={handleWatchListClick}
        title={"Movies"}
      />
    </div>
  );
};

export default Movies;
