import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../features/user/userSlice";
import mediaReducer from "../../features/media/mediaSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    media: mediaReducer,
  },
});
