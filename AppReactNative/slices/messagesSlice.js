import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      message: "pierwsza wiadomość",
      location: {
        latitude: 51.2465,
        longitude: 22.568,
      },
      expiry: "2012/12/9",
    },
  ],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      console.log("messageSlice");
      state.messages = [...state.messages, action.payload];
    },
  },
});

export const { addMessage } = messageSlice.actions;

export const selectMessages = (state) => state.messages;

export default messageSlice.reducer;
