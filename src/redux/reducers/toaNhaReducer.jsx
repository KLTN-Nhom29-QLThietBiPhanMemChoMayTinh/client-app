//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrToaNha: [],
  arrToaNhaSearch: [],
  detailToaNha: {},
  valueSearch: "",
};

const toaNhaReducer = createSlice({
  name: "toaNhaReducer",
  initialState,
  reducers: {
    setArrToaNhaAction: (state, action) => {
      state.arrToaNha = action.payload;
      state.arrToaNhaSearch = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrToaNhaAction } = toaNhaReducer.actions;
export default toaNhaReducer.reducer;


// Call APi ======================================

export const getAllToaNhaApi = async (dispatch) => {

   try {
    const result = await http.get("/DSToaNha");

    dispatch(setArrToaNhaAction(result.data));
   } catch (error) {
    console.log("🚀 ~ file: toaNhaReducer.jsx:34 ~ getAllToaNhaApi ~ error:", error)
    
   }
}
