import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../Actions/services";

export const getSpots = createAsyncThunk("spots", async (user, thunkAPI) => {
  try {
    console.log(user);
    const data = await userService.getSpotsAction(user.jwt);
    console.log(data);
    if (data) {
      localStorage.setItem("spots", JSON.stringify(data.data.data));
    }
    return { spots: data };
  } catch (error) {
    localStorage.removeItem("spots");
    return thunkAPI.rejectWithValue();
  }
});

export const addActiveUser = createAsyncThunk(
  "spots/addActiveUser",
  async ({ id, token, payload }, thunkAPI) => {
    console.log(id, token, payload);
    try {
      console.log(id, token, payload);
      const data = await userService.addActiveUserAction(id, token, payload);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error.response.data.error);
      let message;
      if (error.response.data.error.status) {
        message = "You have provided incorrect data";
      }
      console.log(message);
      // thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

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
