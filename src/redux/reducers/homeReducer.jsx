//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  objPhongFirst: {},
  objThongTin: {},
  arrToaNhaH: [],
  arrTangH: [],
  arrPhongH: [],
  arrMayTinhH: [],
};

const homeReducer = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setObjPhongFirstAction: (state, action) => {
      // state.objPhongFirst = action.payload;
      let { objPhongFirst, arrTangH, arrPhongH, mayTinhs, objThongTin } = action.payload;
      state.objPhongFirst = objPhongFirst;
      state.objThongTin = objThongTin;
      state.arrTangH = arrTangH;
      state.arrPhongH = arrPhongH;
      state.arrMayTinhH = mayTinhs;

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
    let result = await http.get("/PhongMay/2");
    let objPhongFirst = result.data;
    let { maPhong,tenPhong,moTa, tang, mayTinhs } = objPhongFirst;

    //
    let objThongTin = {
      phong: { maPhong,tenPhong,moTa},
      tang,
      mayTinh: {},
      arrPhanMem:[],
      giaoVien:{},
      nhanVien:{},
      monHoc:{}
    }
    // 
    let resultArrTang = await http.get(
      `/TangTheoToaNha/${tang.toaNha.maToaNha}`
    );
    let arrTangH = resultArrTang.data;

    // 
    console.log("Chua co api lay list Phong theo maTang");
    let resultArrPhong = await http.get("/DSPhongMay");

    let arrPhongH = resultArrPhong.data.filter((item) => {
      return item.tang.maTang === tang.maTang;
    });

    dispatch(
      setObjPhongFirstAction({
        objPhongFirst,
        arrTangH,
        arrPhongH,
        mayTinhs,
        objThongTin
      })
    );
    // dispatch(setArrTangHomeAction(resultTang.data));
  } catch (error) {}
};
/**
 * Lấy toàn bộ tòa nhà - api
 */
export const getAllToaNhaHomeApi = async (dispatch) => {
  try {
    let result = await http.get("/DSToaNha");
    dispatch(setArrToaNhaHomeAction(result.data));
  } catch (error) {}
};
