import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import MediaCard from "./MediaCard";

const Trending = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  canScrollLeft,
  canScrollRight,
  scrollContent,
  containerRef,
}) => {
  return (
    <div className="ml-4 mb-8">
      <h1 className="text-heading-l text-white">Trending</h1>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar py-2 space-x-4 transition-all ease-in-out duration-300"
        >
          {mediaList.map((media) => (
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
                  onCardClick={() => handleCardClick(media._id, media.type)}
                  isWatchlisted={media.isWatchlisted}
                  onWatchlistClick={() =>
                    handleWatchListClick(media._id, media.type)
                  }
                />
              </div>
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default Trending;
