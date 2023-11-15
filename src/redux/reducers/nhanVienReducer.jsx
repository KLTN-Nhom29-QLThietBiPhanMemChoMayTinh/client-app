//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = [];
  if (valSelect != -1) {
    arrUpdate = arrData.filter((item) => {
      return (
        (item.maNV.toLowerCase().includes(search) ||
          item.tenNV.toLowerCase().includes(search) ||
          item.sDT.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)) &&
        item.chucVu.maCV == valSelect
      );
    });
  } else {
    arrUpdate = arrData.filter((item) => {
      return (
        item.maNV.toLowerCase().includes(search) ||
        item.tenNV.toLowerCase().includes(search) ||
        item.sDT.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    });
  }

  return [...arrUpdate];
};

const initialState = {
  arrNhanVien: [],
  arrNhanVienSearch: [],
  detailNhanVien: {},
  valueSearch: "",
  valueSelect: "-1",
};

const nhanVienReducer = createSlice({
  name: "nhanVienReducer",
  initialState,
  reducers: {
    setArrNhanVienAction: (state, action) => {
      state.arrNhanVien = action.payload;
      state.arrNhanVienSearch = action.payload;
    },
    setValueSearchNhanVien: (state, action) => {
      state.valueSearch = action.payload;

      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        action.payload,
        valueSelect
      );
    },
    setValueSelectNhanVienAction: (state, action) => {
      state.valueSelect = action.payload;

      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        valueSearch,
        action.payload
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrNhanVienAction,
  setValueSelectNhanVienAction,
  setValueSearchNhanVien,
} = nhanVienReducer.actions;
export default nhanVienReducer.reducer;

// -------------- Call API ---------------

export const getAllNhanVienApi = async (dispatch) => {
  try {
    const result = await http.get("/DSNhanVien");
    dispatch(setArrNhanVienAction(result.data));
    // dispatch(setArrNhanVienAction(Database.dataNhanVien));
  } catch (error) {
    console.log(
      "🚀 ~ file: nhanVienReducer.jsx:38 ~ getAllNhanVienApi ~ error:",
      error
    );
  }
};
