//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";

const initialState = {
  valueTxtSearch: "",
  valueSelect: "",
  arrThietBi: [
    {
      id: 1,
      idCode: "TBi001",
      name: "chuột HP",
      status: 1,
      ngaySuDung: "Sun Aug 22 2021 00:00:00 GMT+0700 (GMT+07:00)",
      tuoiTho: 36,
    },
  ],
  arrThietBiSearch: [],
  detailValue: {},
};

const thietBiReducer = createSlice({
  name: "thietBiReducer",
  initialState,
  reducers: {
    setArrThietBiAction:(state, action) => {
        state.arrThietBi = action.payload
        state.arrThietBiSearch = action.payload
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {setArrThietBiAction, } = thietBiReducer.actions;
export default thietBiReducer.reducer;


// -------------- Call Api -----------------

export const getAllThietBiApi = async (dispatch) => {
    try {
        // let result = await http.get('/thietbi...');
        // const action = setArrThietBiAction(result.data.content);

        const action = setArrThietBiAction(Database.dataThietBi);
        dispatch(action);
    } catch (error) {
        console.log("🚀 ~ file: thietBiReducer.jsx:38 ~ getAllThietBi ~ error:", error)
        
    }
}


