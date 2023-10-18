//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  // TH theo search
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    return (
      item.idCode.toLowerCase().includes(search) ||
      item.userName.toLowerCase().includes(search) ||
      item.mota.idCode.toLowerCase().includes(search) ||
      item.mota.name.toLowerCase().includes(search)
    );
  });

  //TH theo Select
  if (valSelect !== "all") {
    arrUpdate = arrUpdate.filter((item) => {
      return item.quyenId.includes(valSelect);
    });
  }

  return [...arrUpdate];
};

const initialState = {
  arrTaiKhoan: [],
  arrTaiKhoanSearch: [],
  arrQuyen: [],
  detailTaiKhoan: {},
  valueSearch: "",
  valueSelect: "",
};

const taiKhoanReducer = createSlice({
  name: "taiKhoanReducer",
  initialState,
  reducers: {
    serArrQuyenAction: (state, action) => {
      state.arrQuyen = action.payload;
    },
    setArrTaiKhoanAction: (state, action) => {
      state.arrTaiKhoan = action.payload;
      state.arrTaiKhoanSearch = action.payload;
    },
    setValueSearchTaiKhoan: (state, action) => {
      state.valueSearch = action.payload;

      let { arrTaiKhoan, valueSelect } = state;
      state.arrTaiKhoanSearch = dataSearch(
        arrTaiKhoan,
        action.payload,
        valueSelect
      );
    },
    setValueSelectTaiKhoan: (state, action) => {
      state.valueSelect = action.payload;

      let { arrTaiKhoan, valueSearch } = state;

      state.arrTaiKhoanSearch = dataSearch(
        arrTaiKhoan,
        valueSearch,
        action.payload
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTaiKhoanAction,
  setValueSearchTaiKhoan,
  serArrQuyenAction,
  setValueSelectTaiKhoan,
} = taiKhoanReducer.actions;
export default taiKhoanReducer.reducer;

// -------------- Call API ---------------

export const getAllTaiKhoanApi = async (dispatch) => {
  try {
    // const result = await http.get("/TaiKhoan...");
    // dispatch(setArrTaiKhoanAction(result.data.content));
    dispatch(setArrTaiKhoanAction(Database.dataTaiKhoan));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};

/**
 * CAll data quyền sử dụng
 */
export const getAllQuyenSDApi = async (dispatch) => {
  try {
    // const result = await http.get("/Quyen...");
    // dispatch(serArrQuyenAction(result.data.content));
    dispatch(serArrQuyenAction(Database.dataQuyen));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};
