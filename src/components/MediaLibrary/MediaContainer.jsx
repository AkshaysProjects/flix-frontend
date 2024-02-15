import React from "react";
import MediaCard from "./MediaCard";

const Recommended = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  title,
}) => {
  return (
    <div className="ml-4">
      <h1 className="mt-8 text-heading-l text-white">{title}</h1>
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
            onCardClick={() => handleCardClick(media._id)}
            isWatchlisted={media.isWatchlisted}
            onWatchlistClick={() => handleWatchListClick(media._id, media.type)}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
