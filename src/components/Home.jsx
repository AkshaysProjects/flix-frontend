import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Trending from "./MediaLibrary/Trending";
import MediaContainer from "./MediaLibrary/MediaContainer";
import useScroll from "../hooks/useScroll";
import { selectMedia, selectTrending } from "../features/media/selectors";
import { toggleWatchlistItem } from "../features/user/userSlice";
import NavBar from "./NavBar";
import { fetchMedia } from "../features/media/mediaSlice";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to store the search results
  const [searchResults, setSearchResults] = useState([]);

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

  // Fetch the search results based on the search term
  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        const movieRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/search?query=${searchTerm}`
        );
        const tvShowRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/tvshows/search?query=${searchTerm}`
        );
        setSearchResults([...movieRes.data, ...tvShowRes.data]); // Adjust based on actual API response structure
      } else {
        setSearchResults([]);
      }
    };
    fetchResults();
  }, [searchTerm]);

  // Render the Home component with the Trending and MediaContainer components
  return (
    <>
      <NavBar />
      <div className="p-4 md:pl-10 lg:pl-32 pt-8">
        <div className="max-w-lg flex items-center align-middle p-4 mb-4">
          <FaSearch className="relative mr-2" />{" "}
          <input
            id="search"
            type="search"
            placeholder="Search for movies or TV Shows"
            className="w-[16rem] lg:w-[20rem] bg-dark-bg text-body-m placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg text-white outline-none border-b-dark-bg border-b-2 focus:border-b-light-blue transition duration-300 caret-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {!searchTerm && (
          <Trending
            mediaList={trendingList}
            handleCardClick={handleCardClick}
            handleWatchListClick={handleWatchListClick}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            scrollContent={scrollContent}
            containerRef={trendingContainerRef}
          />
        )}
        <MediaContainer
          mediaList={searchTerm ? searchResults : mediaList}
          handleCardClick={handleCardClick}
          handleWatchListClick={handleWatchListClick}
          title={
            searchTerm
              ? `Found ${searchResults.length} results for '${searchTerm}'`
              : "Recommended for you"
          }
        />
      </div>
    </>
  );
};

export default Home;
