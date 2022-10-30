import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {
    latitude: 51.2465,
    longitude: 22.568,
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      console.log(state.location);
      state.location = action.payload;
    },
  },
});

export const { setCurrentLocation } = locationSlice.actions;

export const selectCurrentLocation = (state) => state.location.location;

export default locationSlice.reducer;
