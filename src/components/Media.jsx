import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { FaYoutube, FaImdb } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useMedia from "../hooks/useMedia";

const Media = () => {
  const { id } = useParams();

  // Use the custom hook to fetch media data
  const { media, casts, urls, type, error } = useMedia(id); // Removed navigate from useMedia as it's not used within the hook

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" />);
    }

    const remainingStars = totalStars - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<BsStar key={`empty-${i}`} />);
    }

    return stars;
  };

  if (!media) {
    return <div>Loading...</div>; // or loading indicator
  }

  const isMovie = type === "Movie";

  return (
    <div className="flex justify-center items-center h-screen lg:w-3/4 mx-auto overflow-x-auto">
      <div className="p-8 text-white rounded-lg flex max-h-screen">
        <img
          src={media.posterUrl}
          alt={media.title}
          className="w-[30%] h-[60%] object-cover rounded-lg mr-8"
          style={{ maxWidth: "250px", maxHeight: "375px" }}
        />
        <div className="flex flex-col">
          <h1 className="text-heading-l mb-4">{media.title}</h1>
          <div className="flex items-center mb-4">
            {media.rating !== undefined && media.rating !== null && (
              <>
                <span className="text-heading-s font-bold mr-2">
                  {(media.rating / 2).toFixed(1)}
                </span>
                <span className="flex mr-2">
                  {renderStars(media.rating / 2)}
                </span>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-body-s mb-4">
            {isMovie && (
              <>
                <div>
                  <div className="text-body-m font-bold text-gray-400">
                    Length
                  </div>
                  <div className="text-body-m font-bold">
                    {media.runtime} min.
                  </div>
                </div>
                <div>
                  <div className="text-body-m font-bold text-gray-400">
                    Release Year
                  </div>
                  <div className="text-body-m font-bold">
                    {new Date(media.releaseDate).getFullYear()}
                  </div>
                </div>
              </>
            )}
            {!isMovie && (
              <>
                <div>
                  <div className="text-body-m font-bold text-gray-400">
                    First Air Date
                  </div>
                  <div className="text-body-m font-bold">
                    {new Date(media.firstAirDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-body-m font-bold text-gray-400">
                    Last Air Date
                  </div>
                  <div className="text-body-m font-bold">
                    {new Date(media.lastAirDate).toLocaleDateString()}
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="text-body-m font-bold text-gray-400">
                Language
              </div>
              <div className="text-body-m font-bold">{media.language}</div>
            </div>
            <div>
              <div className="text-body-m font-bold text-gray-400">Status</div>
              <div className="text-body-m font-bold">
                {media.status.charAt(0).toUpperCase() + media.status.slice(1)}
              </div>
            </div>
          </div>

          <div className="text-heading-xs font-bold mb-2">Genres</div>
          <div className="flex flex-wrap">
            {media.genres?.map((genre, index) => (
              <div
                key={index}
                className="text-body-m border border-white rounded-lg px-1 py-0 mr-2 mb-4"
                style={{ color: "black", backgroundColor: "white" }}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </div>
            ))}
          </div>

          <div className="text-heading-xs mb-2 font-bold">Synopsis</div>
          <p className="text-body-s mb-4">{media.summary}</p>

          <div className="text-heading-xs font-bold mb-2">Cast</div>
          <div className="flex flex-wrap">
            {casts?.slice(0, 25).map((actor, index) => (
              <div
                key={index}
                className="text-body-s border border-white rounded-md px-1 py-1 mr-2 mb-2"
              >
                {actor}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap mt-8">
            {urls.homepage && (
              <a
                href={urls.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-m flex items-center bg-light-blue rounded-lg px-3 py-2 mr-2 mb-2"
              >
                <FiLink className="mr-1 text-lg" /> Website
              </a>
            )}
            {urls.trailerUrl && (
              <a
                href={urls.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-m flex items-center bg-light-blue rounded-lg px-3 py-2 mr-2 mb-2"
              >
                <FaYoutube className="mr-1 text-lg" /> Trailer
              </a>
            )}
            {urls.imdbUrl && (
              <a
                href={urls.imdbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-m flex items-center bg-light-blue rounded-lg px-3 py-2 mr-2 mb-2"
              >
                <FaImdb className="mr-1 text-lg" /> IMDb
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
