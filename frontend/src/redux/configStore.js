import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export default store;
//
