import React, { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import Trending from "./MediaLibrary/Trending";
import MediaContainer from "./MediaLibrary/MediaContainer";
import useScroll from "../hooks/useScroll";

const Home = () => {
  // Container ref to check overflow status
  const trendingContainerRef = useRef(null);

  // Custom hook to handle scrolling
  const { canScrollLeft, canScrollRight, scrollContent } =
    useScroll(trendingContainerRef);

  // State to store the media list
  const [mediaList, setMediaList] = useState([]);

  // Get the access token and user cookies
  const [cookies, setCookie] = useCookies(["access_token", "user"]);

  // State to store the user object
  const [user, setUser] = useState(cookies.user || {});

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Function to handle the click event
  const handleCardClick = (id) => {
    navigate(`/media/${id}`);
  };

  // Function to handle the watchlist click event
  const handleWatchListClick = (id, type) => {
    if (!cookies.access_token) navigate("/login");
    else {
      const isAlreadyWatchlisted =
        user.watchlist && user.watchlist.some((item) => item._id === id);

      // update the user state
      let updatedUser;
      if (isAlreadyWatchlisted) {
        // If it's already in the watchlist, remove it
        updatedUser = {
          ...user,
          watchlist: user.watchlist.filter((item) => item._id !== id),
        };
      } else {
        // If it's not in the watchlist, add it
        updatedUser = {
          ...user,
          watchlist: [...user.watchlist, { _id: id, type }],
        };
      }
      setUser(updatedUser);
      setCookie("user", updatedUser);

      // Define the request based on the current state
      const request = isAlreadyWatchlisted
        ? axios.delete(`${process.env.REACT_APP_API_URL}/watchlist/${id}`, {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          })
        : axios.post(
            `${process.env.REACT_APP_API_URL}/watchlist/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.access_token}`,
              },
            }
          );

      // Catch any errors and revert the user state
      request.catch((err) => {
        console.error(err);
        setUser(user); // Revert to the previous user state
        setCookie("user", user); // Revert the cookie to the previous state
      });
    }
  };

  // Use effect to fetch the media list on mount
  useEffect(() => {
    // Define both requests but do not execute them immediately
    const fetchMovies = axios.get(`${process.env.REACT_APP_API_URL}/movies`);
    const fetchTVShows = axios.get(`${process.env.REACT_APP_API_URL}/tvshows`);

    // Use Promise.all to execute both requests concurrently
    Promise.all([fetchMovies, fetchTVShows])
      .then((responses) => {
        // Add 'type' property to each movie
        const movies = responses[0].data.map((movie) => ({
          ...movie,
          type: "Movie", // Add a type property to each movie object
        }));

        // Add 'type' property to each TV show
        const tvShows = responses[1].data.map((tvShow) => ({
          ...tvShow,
          type: "TV Show", // Add a type property to each TV show object
        }));

        // Combine movies and tvShows into a single array and update state
        setMediaList([...movies, ...tvShows]);
      })
      .catch((err) => {
        // Log errors
        console.error(err);
      });
  }, []); // Only run on mount

  // Use effect to update the media list with isWatchlisted property
  useEffect(() => {
    if (user.watchlist && mediaList) {
      // Create a Set for faster lookups
      const watchlistSet = new Set(user.watchlist.map((item) => item._id));

      // Function to update mediaList with isWatchlisted property
      const newMediaList = mediaList.map((media) => ({
        ...media,
        isWatchlisted: watchlistSet.has(media._id),
      }));

      // Compare lengths as a quick check to see if updates might be necessary
      // Note: This assumes the structure and length of mediaList do not change,
      // only the isWatchlisted property might change.
      const listChanged = newMediaList.some(
        (media, mediaIndex) =>
          media.isWatchlisted !== mediaList[mediaIndex].isWatchlisted
      );

      if (listChanged) {
        setMediaList(newMediaList);
      }
    }
  }, [user, mediaList]);

  // Refresh the user state on cookie change
  useEffect(() => {
    setUser(cookies.user || {});
  }, [cookies.user]);

  return (
    <div className="p-4">
      <Trending
        mediaList={mediaList}
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
