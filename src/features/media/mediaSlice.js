import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMedia = createAsyncThunk("media/fetchMedia", async () => {
  // Fetch movies and tv shows
  const moviesRes = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
  const tvShowsRes = await axios.get(
    `${process.env.REACT_APP_API_URL}/tvshows`
  );

  // Extract the data from the response
  const movies = moviesRes.data;
  const tvShows = tvShowsRes.data;

  // Add a type property to each movie and tv show
  movies.forEach((movie) => (movie.type = "Movie"));
  tvShows.forEach((tvShow) => (tvShow.type = "TV Show"));

  // Return the movies and tv shows
  return { movies, tvShows };
});

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    movies: [],
    tvShows: [],
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
      })
      .addCase(fetchMedia.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default mediaSlice.reducer;
