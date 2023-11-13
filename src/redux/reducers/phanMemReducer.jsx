//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrPhanMem:[],
  arrPhanMemSearch:[],
  valueSearch:'',
};

const phanMemReducer = createSlice({
  name: "phanMemReducer",
  initialState,
  reducers: {
    setArrPhanMemAction: (state, action) => {
      state.arrPhanMem = action.payload;
      state.arrPhanMemSearch = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrPhanMemAction } = phanMemReducer.actions;
export default phanMemReducer.reducer;


// Call Api ++++++++++++++++++++++++++++++++++++++
/**
 * get all api Phan mem
 */
export const getAllPhanMemApi = async (dispatch) => {
try {
  const result = await http.get("/DSPhanMem");
  dispatch(setArrPhanMemAction(result.data));
} catch (error) {
  console.log("🚀 ~ file: phanMemReducer.jsx:34 ~ getAllPhanMemApi ~ error:", error)
  
}
} 

