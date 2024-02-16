import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err.response.status);
        localStorage.removeItem("access_token");
      });
    return data.user;
  } else {
    return {};
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    status: "idle",
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      localStorage.removeItem("access_token");
    },
    toggleWatchlistItem: (state, action) => {
      const { id, type } = action.payload;
      const watchlist = state.data.watchlist;
      const itemIndex = watchlist.findIndex((item) => item._id === id);

      if (itemIndex === -1) {
        const watchlistSaveState = [...watchlist];
        watchlist.push({ _id: id, type });
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/watchlist/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .catch(() => {
            state.data.watchlist = watchlistSaveState;
          });
      } else {
        const watchlistSaveState = [...watchlist];
        watchlist.splice(itemIndex, 1);
        axios
          .delete(`${process.env.REACT_APP_API_URL}/watchlist/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .catch(() => {
            state.data.watchlist = watchlistSaveState;
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
export const { clearUser, toggleWatchlistItem } = userSlice.actions;
