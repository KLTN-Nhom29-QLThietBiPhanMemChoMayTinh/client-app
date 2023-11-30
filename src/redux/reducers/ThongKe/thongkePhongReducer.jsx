//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueSelectToaNha: -1,
  valueSelectTang: -1,
};

const thongkePhongReducer = createSlice({
  name: "thongkePhongReducer",
  initialState,
  reducers: {
    set_tk_valueSelectToaNha_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
      
    },
    set_tk_valueSelectTang_Action: (state, action) => {
      state.valueSelectTang = action.payload;
      
    },
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  set_tk_valueSelectToaNha_Action,
  set_tk_valueSelectTang_Action,
 } = thongkePhongReducer.actions;
export default thongkePhongReducer.reducer;
