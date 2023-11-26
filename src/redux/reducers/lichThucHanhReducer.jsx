//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrCaThucHanh:[],
  arrCaThucHanhSearch:[],
  valueSearch:'',
  objDetailCaTH: {},
};

const lichThucHanhReducer = createSlice({
  name: "lichThucHanhReducer",
  initialState,
  reducers: {
    setArrCaThucHanhAction: (state, action) => {
      state.arrCaThucHanh = action.payload;
      state.arrCaThucHanhSearch = action.payload;
    },
    setObjDetailCaThucHanh: (state, action) => {
      state.objDetailCaTH = action.payload;
    }
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrCaThucHanhAction,
  setObjDetailCaThucHanh,
 } = lichThucHanhReducer.actions;
export default lichThucHanhReducer.reducer;


// Call api +++++++++++++++++++++++++++++++++++++++++++++++++


export const getAllCaThucHanhApi = async (dispatch) => {
  try {
    let result  = await http.get('/DSCaThucHanh');

    dispatch(setArrCaThucHanhAction(result.data));
  } catch (error) {
    console.log("🚀 ~ file: lichThucHanhReducer.jsx:36 ~ getAllCaThucHanh ~ error:", error)
    
  }
}