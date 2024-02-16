import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Trending from "./MediaLibrary/Trending";
import MediaContainer from "./MediaLibrary/MediaContainer";
import useScroll from "../hooks/useScroll";
import { selectMedia, selectTrending } from "../features/media/selectors";
import { toggleWatchlistItem } from "../features/user/userSlice";
import NavBar from "./NavBar";
import { fetchMedia } from "../features/media/mediaSlice";

const Home = () => {
  // Ref for the trending media container to enable custom scrolling behavior
  const trendingContainerRef = useRef(null);

  // Custom hook to provide scrolling functionality based on the container's overflow status
  const { canScrollLeft, canScrollRight, scrollContent } =
    useScroll(trendingContainerRef);

  // Access the media list from the Redux store
  const mediaList = useSelector(selectMedia);

  // Access the trending list from the Redux store
  const trendingList = useSelector(selectTrending);

  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve the access token from local storage to check user authentication
  const access_token = localStorage.getItem("access_token");

  // Handler for navigating to the media detail page when a media card is clicked
  const handleCardClick = (id, type) => {
    navigate(`/media/${id}`);
  };

  // Handler for adding or removing an item from the watchlist
  const handleWatchListClick = async (id, type) => {
    if (!access_token) {
      navigate("/login");
      return;
    }
    await dispatch(toggleWatchlistItem({ id, type }));
    dispatch(fetchMedia());
  };

  // Render the Home component with the Trending and MediaContainer components
  return (
    <div className="p-4 pl-32 pt-8">
      <NavBar />
      <Trending
        mediaList={trendingList}
        handleCardClick={handleCardClick}
        handleWatchListClick={handleWatchListClick}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        scrollContent={scrollContent}
        containerRef={trendingContainerRef}
      />
      <MediaContainer
        mediaList={mediaList}
        handleCardClick={handleCardClick}
        handleWatchListClick={handleWatchListClick}
        title={"Recommended for you"}
      />
    </div>
  );
};

export default Home;
