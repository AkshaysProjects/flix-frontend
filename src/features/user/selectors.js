import { createSelector } from "reselect";

// Selector to get user data from state
const userDataSelector = (state) => state.user.data;

// Selector to get user's watchlist from state
export const watchlistSelector = createSelector(
  [userDataSelector],
  (userData) => userData?.watchlist ?? []
);
