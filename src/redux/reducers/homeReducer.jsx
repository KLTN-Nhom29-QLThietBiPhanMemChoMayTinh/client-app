//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  objPhongFirst: {},
  arrToaNhaH: [],
  arrTangH: [],
};

const homeReducer = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setObjPhongFirstAction: (state, action) => {
      // state.objPhongFirst = action.payload;
      let { objPhongFirst, arrTangH } = action.payload;
      state.objPhongFirst = objPhongFirst;
      state.arrTangH = arrTangH;
    },
    setArrToaNhaHomeAction: (state, action) => {
      state.arrToaNhaH = action.payload;
    },
    setArrTangHomeAction: (state, action) => {
      state.arrTangH = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setObjPhongFirstAction,
  setArrToaNhaHomeAction,
  setArrTangHomeAction,
} = homeReducer.actions;
export default homeReducer.reducer;

/**
 * Tìm phong đầu tiên trong Data
 *  */
export const getPhongByFirst = async (dispatch) => {
  try {
    let result = await http.get("/PhongMay/5");
    let objPhongFirst = result.data;
    let { tang, mayTinhs } = objPhongFirst;

    let resultArrTang = await http.get(
      `/TangTheoToaNha/${tang.toaNha.maToaNha}`
    );
    let arrTangH = resultArrTang.data;

    dispatch(
      setObjPhongFirstAction({
        objPhongFirst,
        arrTangH,
      })
    );
    // dispatch(setArrTangHomeAction(resultTang.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: homeReducer.jsx:31 ~ getPhongByFirst ~ error:",
      error
    );
  }
};
/**
 * Lấy toàn bộ tòa nhà - api
 */
export const getAllToaNhaHomeApi = async (dispatch) => {
  try {
    let result = await http.get("/DSToaNha");
    dispatch(setArrToaNhaHomeAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: homeReducer.jsx:51 ~ getAllToaNhaHomeApi ~ error:",
      error
    );
  }
};
