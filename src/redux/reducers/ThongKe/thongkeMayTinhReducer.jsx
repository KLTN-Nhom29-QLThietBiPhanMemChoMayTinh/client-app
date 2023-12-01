//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const thongkeMayTinhReducer = createSlice({
  name: "thongkeMayTinhReducer",
  initialState,
  reducers: {
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { changeNumber } = thongkeMayTinhReducer.actions;
export default thongkeMayTinhReducer.reducer;
