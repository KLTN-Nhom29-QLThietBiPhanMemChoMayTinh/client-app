//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";

const initialState = {
  arrLichTruc:[],

};

const lichTrucReducer = createSlice({
  name: "lichTrucReducer",
  initialState,
  reducers: {
    setArrLichTrucAction: (state, action) => {
      state.arrLichTruc = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrLichTrucAction } = lichTrucReducer.actions;
export default lichTrucReducer.reducer;


// CALL APi ==================================
export const getAllLichTruc = async (dispatch) => {
  try {
    // let result = await http.get("DSlichTruc");
    // dispatch(setArrLichTrucAction(result.data));

    dispatch(setArrLichTrucAction(Database.datalichTruc));
  } catch (error) {
    console.log("🚀 ~ file: lichTrucReducer.jsx:29 ~ getAllLichTruc ~ error:", error)
    
  }
}