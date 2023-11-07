//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrPhongMay:[],

};

const phongMayReducer = createSlice({
  name: "phongMayReducer",
  initialState,
  reducers: {
    setArrPhongMayAction: (state, action) => {
      state.arrPhongMay = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrPhongMayAction } = phongMayReducer.actions;
export default phongMayReducer.reducer;


// CAll APi++++++++++++++++++++++++++++++++++++++

export const getAllPhongMayApi = async(dispatch) => {
  try {
    let result = await http.get('/DSPhongMay');

    dispatch(setArrPhongMayAction(result.data));
  } catch (error) {
    console.log("🚀 ~ file: phongMayReducer.jsx:30 ~ getAllPhongMayApi ~ error:", error)
    
  }
}