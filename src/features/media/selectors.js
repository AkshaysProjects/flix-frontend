import { createSelector } from "reselect";
import { watchlistSelector } from "../user/selectors";

export const mediaSelector = (state) => ({
  movies: state.media.movies,
  tvShows: state.media.tvShows,
  trending: state.media.trending,
  watchlist: state.media.watchlist,
});

// Memoized selector for media with isWatchlisted property
export const selectMedia = createSelector(
  [mediaSelector, watchlistSelector],
  ({ movies, tvShows }, watchlist) => {
    const watchlistSet = new Set(watchlist.map((item) => item._id));
    const mapWithWatchlist = (media) => ({
      ...media,
      isWatchlisted: watchlistSet.has(media._id),
    });
    return [...movies.map(mapWithWatchlist), ...tvShows.map(mapWithWatchlist)];
  }
);

// Memoized selector for movies with isWatchlisted property
export const selectMovies = createSelector(
  [mediaSelector, watchlistSelector],
  ({ movies }, watchlist) => {
    const watchlistSet = new Set(watchlist.map((item) => item._id));
    return movies.map((movie) => ({
      ...movie,
      isWatchlisted: watchlistSet.has(movie._id),
    }));
  }
);

// Memoized selector for tv shows with isWatchlisted property
export const selectTVShows = createSelector(
  [mediaSelector, watchlistSelector],
  ({ tvShows }, watchlist) => {
    const watchlistSet = new Set(watchlist.map((item) => item._id));
    return tvShows.map((tvShow) => ({
      ...tvShow,
      isWatchlisted: watchlistSet.has(tvShow._id),
    }));
  }
);

// Memoized selector for watchlist media
export const selectWatchlist = createSelector(
  // Select watchlist from mediaSelector and set isWatchlisted to true
  [mediaSelector],
  ({ watchlist }) => watchlist.map((item) => ({ ...item, isWatchlisted: true }))
);

// Memoized selector for trending media
export const selectTrending = createSelector(
  [mediaSelector, watchlistSelector],
  ({ trending }, watchlist) => {
    const watchlistSet = new Set(watchlist.map((item) => item._id));
    return trending.map((media) => ({
      ...media,
      isWatchlisted: watchlistSet.has(media._id),
    }));
  }
);
