//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrToaNha: [],
  arrToaNhaSearch: [],
  arrToaNhaLichTruc:[],
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
    serArrToaNhaLichTrucAction: (state, action) => {
      state.arrToaNhaLichTruc = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrToaNhaAction, serArrToaNhaLichTrucAction, } = toaNhaReducer.actions;
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
//
/**
 * ds toa nha co tang chua co nguoi giams sat
 * @param {*} dispatch 
 */
export const getAllToaNhaByLichTruc = async(dispatch) => {
  try {
    console.log("can 1 controller - ds toa nha co tang chua co nguoi giams sat");
    const result = await http.get("/DSToaNha");

    dispatch(serArrToaNhaLichTrucAction(result.data));
   } catch (error) {
    console.log("🚀 ~ file: toaNhaReducer.jsx:34 ~ getAllToaNhaApi ~ error:", error)
    
   }
}
