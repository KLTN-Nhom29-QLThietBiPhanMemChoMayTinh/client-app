//rxslice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueTxtSearch: "",
  valueSelect: "",
  arrThietBi: [
    {
      id: 1,
      idCode: "TBi001",
      name: "chuột HP",
      status: 1,
      ngaySuDung: new Date(2021,5,9),
      tuoiTho: 36,
    },
  ],
  arrThietBiSearch: [],
  detailValue: {},
};

const thietBiReducer = createSlice({
  name: "thietBiReducer",
  initialState,
  reducers: {},
});
// exp nay de sử dụng theo cách 2
export const {} = thietBiReducer.actions;
export default thietBiReducer.reducer;
