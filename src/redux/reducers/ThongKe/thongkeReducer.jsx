//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const thongkeReducer = createSlice({
  name: "thongkeReducer",
  initialState,
  reducers: {
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { changeNumber } = thongkeReducer.actions;
export default thongkeReducer.reducer;
