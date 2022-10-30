import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/locationSlice";
import messagesSlice from "./slices/messagesSlice";
import navSlice from "./slices/navSlice";

export const store = configureStore({
  reducer: {
    nav: navSlice,
    location: locationSlice,
    messages: messagesSlice,
  },
});
