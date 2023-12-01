//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueSearch: "",
  valueSelectToaNha: -1,
  valueSelectTang: -1,
  valueSelectPhongMay: -1,

};

const thongkeMayTinhReducer = createSlice({
  name: "thongkeMayTinhReducer",
  initialState,
  reducers: {
    set_tk_valueSearch_MT_Action: (state, action) => {
      state.valueSearch = action.payload;
    },
    set_tk_valueSelectToaNha_MT_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
    },
    set_tk_valueSelectTang_MT_Action: (state, action) => {
      state.valueSelectTang = action.payload;
    },
    set_tk_valueSelectPhongMay_MT_Action: (state, action) => {
      state.valueSelectPhongMay = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  set_tk_valueSearch_MT_Action,
  set_tk_valueSelectToaNha_MT_Action,
  set_tk_valueSelectTang_MT_Action,
  set_tk_valueSelectPhongMay_MT_Action,
 } = thongkeMayTinhReducer.actions;
export default thongkeMayTinhReducer.reducer;
