import React from "react";
import ScrollContainer from "./ScrollContainer";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
    <div className="ml-4">
      <h1 className="text-heading-l text-white">Trending</h1>
      <ScrollContainer
        mediaList={mediaList.slice(0, 10)}
        handleCardClick={handleCardClick}
        handleWatchListClick={handleWatchListClick}
        containerRef={containerRef}
      />
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
  );
};

export default Trending;
