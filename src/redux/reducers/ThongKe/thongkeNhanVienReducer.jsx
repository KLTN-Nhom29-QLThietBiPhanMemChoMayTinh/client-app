//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";
import { formatDate_MM_YYYY } from "../../../util/formatString";

const initialState = {
  arr_tk_TgianTruc: [],
  valueSelTgianTruc: "-1",
  valueSelCaTruc: -1, //1 : 6h-14h ---- 2: 14h-22h
  valueSearch: '',
};

const thongkeNhanVienReducer = createSlice({
  name: "thongkeNhanVienReducer",
  initialState,
  reducers: {
    set_tk__NV_Action: (state, action) => {
      state.valueSearch = action.payload;
    },
    set_tk_valueSelTgianTruc_NV_Action: (state, action) => {
      state.valueSelTgianTruc = action.payload;
    },
    set_tk_valueSelCaTruc_NV_Action: (state, action) => {
      state.valueSelCaTruc = action.payload;
    },
    set_tk_valueSearch_NV_Action: (state, action) => {
      state.valueSearch = action.payload;
    },
    set_tk_arr_tk_TgianTruc_NV_Action: (state, action) => {
      state.arr_tk_TgianTruc = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { set_tk_arr_tk_TgianTruc_NV_Action,
  //
  set_tk_valueSelTgianTruc_NV_Action,
  set_tk_valueSelCaTruc_NV_Action,
  set_tk_valueSearch_NV_Action,
 } =
  thongkeNhanVienReducer.actions;
export default thongkeNhanVienReducer.reducer;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const getData_TKNhanVienApi = async (dispatch) => {
  try {
    let result_LichTruc = await http.get("/DSLichTruc");
    let arr_LichTruc = result_LichTruc.data;

    let arr_tk_TgianTruc = arr_LichTruc.map((item) => {
      let date = new Date(item.ngayTruc);
      let tgian = formatDate_MM_YYYY(date);
      return tgian;
    });
    arr_tk_TgianTruc = arr_tk_TgianTruc.filter(
      (item, index) => arr_tk_TgianTruc.indexOf(item) === index
    );

    //
    dispatch(set_tk_arr_tk_TgianTruc_NV_Action(arr_tk_TgianTruc));
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkeNhanVienReducer.jsx:31 ~ constgetData_TKNhanVienApi=async ~ error:",
      error
    );
  }
};
