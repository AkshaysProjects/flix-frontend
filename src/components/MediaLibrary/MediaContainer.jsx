import React from "react";
import MediaCard from "./MediaCard";

const MediaContainer = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  title,
}) => {
  return (
    <div className="ml-4">
      <h1 className="text-heading-l text-white">{title}</h1>
      <div
        className="grid grid-flow-row auto-rows-max gap-8"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {mediaList.map((media) => (
          <MediaCard
            key={media._id}
            bannerUrl={media.bannerUrl}
            title={media.title}
            releaseDate={
              media.type === "Movie" ? media.releaseDate : media.firstAirDate
            }
            mediaType={media.type}
            onCardClick={() => handleCardClick(media._id, media.type)}
            isWatchlisted={media.isWatchlisted}
            onWatchlistClick={() => handleWatchListClick(media._id, media.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaContainer;
