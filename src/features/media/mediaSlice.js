import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMedia = createAsyncThunk("media/fetchMedia", async () => {
  // Read access token from local storage
  const access_token = localStorage.getItem("access_token");

  // Fetch movies and tv shows
  const moviesRes = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
  const tvShowsRes = await axios.get(
    `${process.env.REACT_APP_API_URL}/tvshows`
  );

  const watchlistRes = access_token
    ? await axios.get(`${process.env.REACT_APP_API_URL}/watchlist/details`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    : { data: [] };
  const trendingRes = await axios.get(
    `${process.env.REACT_APP_API_URL}/trending`
  );

  // Extract the data from the response
  const movies = moviesRes.data;
  const tvShows = tvShowsRes.data;
  const watchlist = watchlistRes.data;
  const trending = trendingRes.data;

  // Return the movies and tv shows
  return { movies, tvShows, watchlist, trending };
});

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    movies: [],
    tvShows: [],
    watchlist: [],
    trending: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.movies;
        state.tvShows = action.payload.tvShows;
        state.watchlist = action.payload.watchlist;
        state.trending = action.payload.trending;
      })
      .addCase(fetchMedia.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default mediaSlice.reducer;
