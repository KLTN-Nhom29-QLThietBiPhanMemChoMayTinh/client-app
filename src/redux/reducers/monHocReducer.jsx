//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import Database from "../../util/database/Database";
import { insert } from "formik";
import { history } from "../..";

// function
const funcSearch = ({ arrMonHoc, valueTxtSearch, valueSelect }) => {
  return searchData(arrMonHoc, valueTxtSearch, valueSelect);
};
/**
 *
 * @param {list data gốc} arrData
 * @param {text search dang co} valSearch
 * @param {value select dang chon} valSelect
 * @returns
 */
const searchData = (arrData, valSearch, valSelect) => {
  let textSearch = valSearch.trim().toLowerCase();

  // search - text
  let arrUpdate = arrData.filter((item) => {
    let ngayBD = new Date(item.ngayBatDau);
    let ngayKT = new Date(item.ngayBatDau);
    ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

    return (
      (item.maMon + "").toLowerCase().includes(textSearch) ||
      item.tenMon.toLowerCase().includes(textSearch) ||
      // item.ngayBatDau.toLowerCase().includes(textSearch)  ||
      (item.soBuoi + "").toLowerCase().includes(textSearch) ||
      formatStringDate(ngayBD).toLowerCase().includes(textSearch) ||
      formatStringDate(ngayKT).toLowerCase().includes(textSearch)
    );
  });

  // search -- select
  let day = new Date();

  if (valSelect == 1) {
    // Kết thúc
    arrUpdate = arrUpdate.filter((item) => {
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

      return ngayKT < day;
    });
  } else if (valSelect == 2) {
    // Chờ mở lớp
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);

      return ngayBD > day;
    });
  } else if (valSelect == 3) {
    // Đang học
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

      return ngayBD < day && ngayKT > day;
    });
  }

  return [...arrUpdate];
};

const initialState = {
  arrMonHoc: [],
  arrMonHocSearch: [],
  detailMonHoc: {},
  valueTxtSearch: "",
  valueSelect: -1,
};

const monHocReducer = createSlice({
  name: "monHocReducer",
  initialState,
  reducers: {
    setValueTxtSearchAction: (state, action) => {
      state.valueTxtSearch = action.payload;

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    setValueSelectAction: (state, action) => {
      state.valueSelect = action.payload;

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    setArrMonHocAction: (state, action) => {
      state.arrMonHoc = action.payload;
      //
      state.arrMonHocSearch = funcSearch(state);
    },
    insertMonHocAction: (state, action) => {
      let item = action.payload;
      state.arrMonHoc.push(item);

      //
      state.arrMonHocSearch = funcSearch(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrMonHocAction,
  setValueSelectAction,
  setValueTxtSearchAction,
  insertMonHocAction,
} = monHocReducer.actions;
export default monHocReducer.reducer;

// -------------- Call Api -----------------

/**
 * addd 1 mon hoc
 * @param {Object} monHoc
 * @returns
 */
export const insertMonHocApi = (monHoc) => {
  let { tenMon, ngayBatDau, soBuoi, phanMems } = monHoc;
  let objMonHoc = {
    tenMon,
    ngayBatDau,
    soBuoi,
  };
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuMonHoc", objMonHoc);
      console.log(
        "🚀 ~ file: monHocReducer.jsx:131 ~ returnasync ~ result:",
        result
      );
      let objDataNew = result.data;

      phanMems.forEach(async (item) => {
        let objMonHocPhanMem = {
          phanMem: item,
          monHoc: objDataNew,
        };
        let result2 = await http.post("/LuuMonHocPhanMem", objMonHocPhanMem);
        console.log(
          "🚀 ~ file: monHocReducer.jsx:139 ~ returnasync ~ result2:",
          result2
        );
      });

      dispatch(insertMonHocAction(objDataNew));
      history.push("/quan-ly/mon");
    } catch (error) {
      console.log(
        "🚀 ~ file: monHocReducer.jsx:123 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * get all ds mon hoc
 * @param {*} dispatch
 */
export const getAllMonHoc = async (dispatch) => {
  // call Api
  try {
    let result = await http.get("/DSMonHoc");
    const action = setArrMonHocAction(result.data);
    // const action = setArrMonHocAction(Database.dataMonHoc);

    dispatch(action);
  } catch (error) {
    console.log(
      "🚀 ~ file: monHocReducer.jsx:37 ~ getAllMonHoc ~ error:",
      error
    );
  }
};
