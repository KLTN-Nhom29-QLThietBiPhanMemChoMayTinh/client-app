//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  // TH theo search
  let search = valSearch.toLowerCase();
  let arrUpdate = [];
  if (valSelect != -1) {
    arrUpdate = arrData.filter((item) => {
      return (
        (item.maTK.toLowerCase().includes(search) ||
          item.tenDangNhap.toLowerCase().includes(search)) &&
        item.quyen.maQuyen == valSelect
      );
    });
  } else {
    arrUpdate = arrData.filter((item) => {
      return (
        item.maTK.toLowerCase().includes(search) ||
        item.tenDangNhap.toLowerCase().includes(search)
      );
    });
  }

  //TH theo Select
  // if (valSelect !== "all") {
  //   arrUpdate = arrUpdate.filter((item) => {
  //     return item.quyenId.includes(valSelect);
  //   });
  // }

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
    insertTaiKhoanAction: (state, action) => {
      let taiKhoan = action.payload;

      state.arrTaiKhoan.push(taiKhoan);

      // let { arrTaiKhoan, valueSearch, valueSelect } = state;

      // state.arrTaiKhoanSearch = dataSearch(
      //   arrTaiKhoan,
      //   valueSearch,
      //   valueSelect
      // );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTaiKhoanAction,
  setValueSearchTaiKhoan,
  serArrQuyenAction,
  setValueSelectTaiKhoan,
  insertTaiKhoanAction,
} = taiKhoanReducer.actions;
export default taiKhoanReducer.reducer;

// -------------- Call API ---------------
export const insertTaiKhoanApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/them_tai_khoan", taiKhoan);
      dispatch(insertTaiKhoanAction(result.data));
    } catch (error) {
      console.log("🚀 ~ file: taiKhoanReducer.jsx:89 ~ return ~ error:", error);
    }
  };
};
/**
 * get All api
 *
 * @param {*} dispatch
 */
export const getAllTaiKhoanApi = async (dispatch) => {
  try {
    const result = await http.get("/DSTaiKhoan");
    dispatch(setArrTaiKhoanAction(result.data));
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
    const result = await http.get("/DSQuyen");
    dispatch(serArrQuyenAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};

// update taiKhoan

export const updateTaiKhoan = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/tai_khoan", taiKhoan);
      console.log("reducer - updateTaiKhoan() - " + result.status);
    } catch (error) {
      console.log(
        "🚀 ~ file: taiKhoanReducer.jsx:121 ~ return ~ error:",
        error
      );
    }
  };
};
