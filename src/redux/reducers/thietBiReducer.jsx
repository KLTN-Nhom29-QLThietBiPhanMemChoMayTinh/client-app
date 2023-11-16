//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import Database from "../../util/database/Database";

//function

const searchData = (arrData, valSearch, valSelect) => {
  let textSearch = valSearch.toLowerCase();

  // search - text
  let arrUpdate = arrData.filter((item) => {
    let ngaySD = new Date(item.ngayCaiDat);
    let ngayKT = new Date(item.ngayCaiDat);
    ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

    return (
      (item.maThietBi + "").toLowerCase().includes(textSearch) ||
      item.tenThietBi.toLowerCase().includes(textSearch) ||
      // item.ngayBatDau.toLowerCase().includes(textSearch)  ||
      (item.tuoiTho + "").toLowerCase().includes(textSearch) ||
      formatStringDate(ngaySD).toLowerCase().includes(textSearch) ||
      formatStringDate(ngayKT).toLowerCase().includes(textSearch)
    );
  });

  // search -- select
  let day = new Date();
  

  if (valSelect == 1) {
    // bi hong
    arrUpdate = arrUpdate.filter((item) => {
      return item.status === false;
    });
  } else if (valSelect == 2) {
    // Đang sử dụng
    arrUpdate = arrUpdate.filter((item) => {
      return item.status === true;
    });
  } else if (valSelect == 3) {
    // het han
    arrUpdate = arrUpdate.filter((item) => {
      let ngaySD = new Date(item.ngayCaiDat);
      let ngayKT = new Date(item.ngayCaiDat);

      ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

      return  day > ngayKT;
    });
  } else if (valSelect == 4) {
    // sap het han
    arrUpdate = arrUpdate.filter((item) => {
        let ngayKT = new Date(item.ngayCaiDat);
      ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);
      let day2 = new Date(ngayKT);
      day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay


      return day2 < day && ngayKT > day;
    });
  }
  return [...arrUpdate];
};

const initialState = {
  valueTxtSearch: "",
  valueSelect: "",
  arrThietBi: [],
  arrThietBiSearch: [],
  detailValue: {},
};

const thietBiReducer = createSlice({
  name: "thietBiReducer",
  initialState,
  reducers: {
    setArrThietBiAction: (state, action) => {
      state.arrThietBi = action.payload;
      state.arrThietBiSearch = action.payload;
    },
    setValueTxtSearchAction: (state, action) => {
      state.valueTxtSearch = action.payload;

      let { valueSelect, arrThietBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        action.payload,
        valueSelect
      );
    },
    setValueSelectActionTBi: (state, action) => {
      state.valueSelect = action.payload;

      let { valueTxtSearch, arrThietBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        action.payload
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrThietBiAction,
  setValueTxtSearchAction,
  setValueSelectActionTBi,
} = thietBiReducer.actions;
export default thietBiReducer.reducer;

// -------------- Call Api -----------------

export const getAllThietBiApi = async (dispatch) => {
  try {
    let result = await http.get('/DSThietBiMay');
    const action = setArrThietBiAction(result.data);

    // const action = setArrThietBiAction(Database.dataThietBi);
    dispatch(action);
  } catch (error) {
    console.log(
      "🚀 ~ file: thietBiReducer.jsx:38 ~ getAllThietBi ~ error:",
      error
    );
  }
};
