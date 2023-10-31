//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrTang:[],
  arrTangByLichTruc:[],//arrTangByLichTruc
};

const tangReducer = createSlice({
  name: "tangReducer",
  initialState,
  reducers: {
    setArrTangAction: (state, action) => {
      state.arrTang = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrTangAction } = tangReducer.actions;
export default tangReducer.reducer;

// Call Api ========================================


export const getAllTangApi = async (dispatch) => {
  try {
    const result = await http.get("/DSTang");

    dispatch(setArrTangAction(result.data));
    
  } catch (error) {
    console.log("🚀 ~ file: tangReducer.jsx:30 ~ getAllTangApi ~ error:", error)
    
  }
} 
