import { FaFilm, FaTv, FaBookmark, FaRegBookmark } from "react-icons/fa";

const MediaCard = ({
  bannerUrl,
  title,
  releaseDate,
  mediaType,
  isTrending,
  onCardClick,
  isWatchlisted,
  onWatchlistClick,
}) => {
  // Fetch the release year from the release date
  const releaseYear = new Date(releaseDate).getFullYear();

  // Set the media icon based on the media type
  const MediaIcon = mediaType === "Movie" ? FaFilm : FaTv;

  return (
    // Card container
    <div
      className={`mt-4 group relative rounded-lg ${!isTrending ? "mb-8" : ""}`}
      onClick={onCardClick}
    >
      {/* Banner image */}
      <img
        src={bannerUrl}
        alt={title}
        className={`rounded-xl overflow-hidden w-full h-full object-cover group-hover:opacity-80 ${
          isTrending ? "max-h-64 max-w-96" : "max-h-48 max-w-72"
        }`}
      />
      {/* Card content */}
      <div
        className={`absolute ${isTrending ? "bottom-0" : ""} left-0 w-full p-3`}
      >
        <div>
          <div
            className={`text-body-m font-light ${
              isTrending ? "text-white" : "text-light-blue"
            } mb-1`}
          >
            {releaseYear} • <MediaIcon className="inline-block mx-1" />{" "}
            {mediaType}
          </div>
          <div className={`heading-xs ${isTrending ? "text-white" : ""}`}>
            {title}
          </div>
        </div>
      </div>
      {/* Watchlist button */}
      <div className="absolute top-0 right-0 w-full p-3">
        <button
          className="bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            onWatchlistClick();
          }}
        >
          {isWatchlisted ? (
            <FaBookmark className="text-white" />
          ) : (
            <FaRegBookmark className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
