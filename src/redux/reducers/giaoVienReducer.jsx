//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import Database from "../../util/database/Database";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    if (valSelect == -1) {
      return (
        item.maGiaoVien.toLowerCase().includes(search) ||
        formatNameByHocVi({ hocVi: item.hocVi, name: item.hoTen })
          .toLowerCase()
          .includes(search) ||
        item.soDienThoai.toLowerCase().includes(search) ||
        item.hocVi.toLowerCase().includes(search) ||
        item.taiKhoan.tenDangNhap.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    } else {
      return (
        (item.maGiaoVien.toLowerCase().includes(search) ||
        formatNameByHocVi({ hocVi: item.hocVi, name: item.hoTen })
          .toLowerCase()
          .includes(search) ||
        item.soDienThoai.toLowerCase().includes(search) ||
        item.hocVi.toLowerCase().includes(search) ||
        item.taiKhoan.tenDangNhap.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)) && item.khoa.maKhoa == valSelect
      );
    }
  });

  return [...arrUpdate];
};

const initialState = {
  arrGiaoVien: [],
  arrGiaoVienSearch: [],
  detailGiaoVien: {},
  valueSearch: "",
  valueSelect: "-1",
};

const giaoVienReducer = createSlice({
  name: "giaoVienReducer",
  initialState,
  reducers: {
    setArrGiaoVienAction: (state, action) => {
      state.arrGiaoVien = action.payload;
      state.arrGiaoVienSearch = action.payload;
    },
    setValueSearchGiaoVien: (state, action) => {
      state.valueSearch = action.payload;

      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        action.payload,
        valueSelect
      );
    },
    setValueSelectGiaoVien: (state, action) => {
      state.valueSelect = action.payload;

      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien, 
        valueSearch,
        action.payload
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrGiaoVienAction, setValueSelectGiaoVien, setValueSearchGiaoVien } =
  giaoVienReducer.actions;
export default giaoVienReducer.reducer;

// -------------- Call API ---------------

export const getAllGiaoVienApi = async (dispatch) => {
  try {
    const result = await http.get("/DSGiaoVien");
    dispatch(setArrGiaoVienAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: giaoVienReducer.jsx:38 ~ getAllGiaoVienApi ~ error:",
      error
    );
  }
};
