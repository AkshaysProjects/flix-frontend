import React from "react";
import MediaCard from "./MediaCard";

const ScrollContainer = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  containerRef,
}) => {
  return (
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
                media.type === "Movie" ? media.releaseDate : media.firstAirDate
              }
              mediaType={media.type}
              isTrending={true}
              onCardClick={() => handleCardClick(media._id)}
              isWatchlisted={media.isWatchlisted}
              onWatchlistClick={() =>
                handleWatchListClick(media._id, media.type)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScrollContainer;
