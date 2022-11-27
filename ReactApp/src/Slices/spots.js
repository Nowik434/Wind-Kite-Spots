import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Actions/services";
// import { setMessage } from "./message";
// const user = JSON.parse(localStorage.getItem("user"));

export const getSpots = createAsyncThunk("spots", async (user, thunkAPI) => {
  try {
    console.log(user);
    const data = await userService.getSpotsAction(user.jwt);
    console.log(data);
    return { spots: data };
  } catch (error) {
    //   const message =
    //     (error.response &&
    //       error.response.data &&
    //       error.response.data.message) ||
    //     error.message ||
    //     error.toString();
    //     console.log(message)
    //   thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const initialState = [];

const getSpotsSlice = createSlice({
  name: "spots",
  initialState,
  extraReducers: {
    [getSpots.fulfilled]: (state, action) => {
      return (state = [...action.payload.spots.data.data]);
    },
    [getSpots.rejected]: (state, action) => {
      return (state = []);
    },
  },
});
const { reducer } = getSpotsSlice;
export default reducer;
