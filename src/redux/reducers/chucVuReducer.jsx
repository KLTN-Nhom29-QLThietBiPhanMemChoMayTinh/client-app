//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrChucVu:[],
  arrChucVuSearch:[],
};

const chucVuReducer = createSlice({
  name: "chucVuReducer",
  initialState,
  reducers: {
    setArrChucVuAction: (state, action) => {
      state.arrChucVu = action.payload;
      state.arrChucVuSearch = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrChucVuAction } = chucVuReducer.actions;
export default chucVuReducer.reducer;


// Call Api ====================================
/**
 * get all Chuc vu
 */
export const getAllChucVuApi = async (dispatch) => {
  try {
    let result = await http.get('/DSChucVu');

    dispatch(setArrChucVuAction(result.data));
  } catch (error) {
    console.log("🚀 ~ file: chucVuReducer.jsx:33 ~ getAllChucVuApi ~ error:", error)
    
  }
} 

