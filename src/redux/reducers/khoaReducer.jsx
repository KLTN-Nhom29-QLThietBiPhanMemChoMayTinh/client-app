//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import Database from "../../util/database/Database";

// function
const dataSearch = (arrData, valSearch) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    return (
      (item.maKhoa + "").toLowerCase().includes(search) ||
      item.tenKhoa.toLowerCase().includes(search) ||
      (item.soGiaoVien + "").toLowerCase().includes(search)
    );
  });

  return [...arrUpdate];
};

const initialState = {
  arrKhoa: [],
  arrKhoaSearch: [],
  detailKhoa: {},
  valueSearch: "",
};

const khoaReducer = createSlice({
  name: "khoaReducer",
  initialState,
  reducers: {
    setArrKhoaAction: (state, action) => {
      state.arrKhoa = action.payload;
      state.arrKhoaSearch = action.payload;
    },
    setValueSearchKhoa: (state, action) => {
      state.valueSearch = action.payload;

      let { arrKhoa } = state;
      state.arrKhoaSearch = dataSearch(arrKhoa, action.payload);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrKhoaAction, setValueSearchKhoa } = khoaReducer.actions;
export default khoaReducer.reducer;

// -------------- Call Api -------------------

export const getAllKhoaApi = async (dispatch) => {
  try {
    let result = await http.get("/DSKhoa");
    let resultGV = await http.get("/DSGiaoVien");

    let arrData = result.data.map((item) => {
      let soGiaoVien = 0;
      resultGV.data.forEach((e) => {
        if (e.khoa.maKhoa == item.maKhoa) {
          soGiaoVien++;
        }
      });
      return { ...item, soGiaoVien };
    });

    dispatch(setArrKhoaAction(arrData));
    // dispatch(setArrKhoaAction(Database.dataKhoa));
  } catch (error) {
    console.log(
      "🚀 ~ file: khoaReducer.jsx:37 ~ getAllKhoaApi ~ error:",
      error
    );
  }
};
