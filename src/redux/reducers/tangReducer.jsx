//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrTang:[],
  arrTangByLichTruc:[],//arrTang dung ở form LichTruc
};

const tangReducer = createSlice({
  name: "tangReducer",
  initialState,
  reducers: {
    setArrTangAction: (state, action) => {
      state.arrTang = action.payload;
    },
    setArrTangByLichTruc: (state, action) => {
      state.arrTangByLichTruc = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrTangAction,
  setArrTangByLichTruc,
 } = tangReducer.actions;
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

//
export const getAllTangbyIdToaNha = (idToaNha) => {
  
  return async(dispatch) => {
    try {
      console.log('can api tang theo ma toa nha owr day');
      const result = await http.get("/DSTang");

      // dispatch(setArrTangByLichTruc(result.data));
      // 
      
      // 
      const arrTang = result.data.filter(item => {
        return item.toaNha.maToaNha == idToaNha;
      })

      dispatch(setArrTangByLichTruc([...arrTang]));
      
    } catch (error) {
      console.log("🚀 ~ file: tangReducer.jsx:44 ~ returnasync ~ error:", error)
      
    }
  }
}