import React, { useRef, useState, useEffect } from "react";
import MediaCard from "./MediaCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axios from "axios";

const Home = () => {
  // Container ref to check overflow status
  const trendingContainerRef = useRef(null);

  // State to store the media list
  const [mediaList, setMediaList] = useState([]);

  // State to check if the container can be scrolled left or right
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Get the access token and user cookies
  const [cookies, setCookie] = useCookies(["access_token", "user"]);

  // State to store the user object
  const [user, setUser] = useState(cookies.user || {});

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Function to check the overflow status of the container
  const checkOverflowStatus = () => {
    // Get the container element
    const container = trendingContainerRef.current;
    // Check if the container exists
    if (container) {
      // Set the state based on the scroll position
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  };

  // Function to scroll the container content
  const scrollContent = (direction) => {
    // Get the container element
    const container = trendingContainerRef.current;

    // Set the scroll amount
    const amount = 500;

    // Calculate the new scroll position based on the direction
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - amount
        : container.scrollLeft + amount;

    // Scroll the container content
    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  // Function to handle the click event
  const handleClick = () => {};

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

  // Use effect to check the overflow status on mount
  useEffect(() => {
    const container = trendingContainerRef.current;
    if (container) {
      checkOverflowStatus();
      const handleScroll = () => {
        checkOverflowStatus();
      };
      container.addEventListener("scroll", handleScroll);

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
      <div className="ml-4">
        <h1 className="text-heading-l text-white">Trending</h1>
        <div className="relative">
          <div
            ref={trendingContainerRef}
            className="flex overflow-x-auto no-scrollbar py-2 space-x-4 transition-all ease-in-out duration-300"
          >
            {mediaList.slice(0, 10).map((media) => (
              <div key={media._id} className="min-w-[250px] flex-shrink-0">
                <div className="mr-8">
                  <MediaCard
                    bannerUrl={media.bannerUrl}
                    title={media.title}
                    releaseDate={
                      media.type === "Movie"
                        ? media.releaseDate
                        : media.firstAirDate
                    }
                    mediaType={media.type}
                    isTrending={true}
                    onCardClick={() => {
                      handleClick(media._id);
                    }}
                    isWatchlisted={media.isWatchlisted}
                    onWatchlistClick={() =>
                      handleWatchListClick(media._id, media.type)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md ${
              !canScrollLeft && "hidden"
            }`}
            onClick={() => scrollContent("left")}
          >
            <FaAngleLeft className="text-white" />
          </button>
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md ${
              !canScrollRight && "hidden"
            }`}
            onClick={() => scrollContent("right")}
          >
            <FaAngleRight className="text-white" />
          </button>
        </div>
        <h1 className="mt-8 text-heading-l text-white">Recommended for you</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mediaList.map((media) => (
            <MediaCard
              key={media._id}
              bannerUrl={media.bannerUrl}
              title={media.title}
              releaseDate={
                media.type === "Movie" ? media.releaseDate : media.firstAirDate
              }
              mediaType={media.type}
              onCardClick={() => {
                handleClick(media._id);
              }}
              isWatchlisted={media.isWatchlisted}
              onWatchlistClick={() =>
                handleWatchListClick(media._id, media.type)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
