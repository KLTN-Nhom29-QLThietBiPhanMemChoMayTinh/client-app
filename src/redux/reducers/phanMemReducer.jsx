//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import { history } from "../..";

const initialState = {
  arrPhanMem: [],
  arrPhanMemSearch: [],
  valueSearch: "",
  valueSelect: "-1",
};

const phanMemReducer = createSlice({
  name: "phanMemReducer",
  initialState,
  reducers: {
    setArrPhanMemAction: (state, action) => {
      state.arrPhanMem = action.payload;

      state.arrPhanMemSearch = action.payload;
      state.valueSearch = "";
      state.valueSelect = "-1";
    },
    setValueSearchPhanMemAction: (state, action) => {
      state.valueSearch = action.payload;

      //
      let { arrPhanMem, valueSearch, valueSelect } = state;
      state.arrPhanMemSearch = searchData(
        arrPhanMem,
        action.payload,
        valueSelect
      );
    },
    setValueSelectPhanMemAction: (state, action) => {
      state.valueSelect = action.payload;

      //
      let { arrPhanMem, valueSearch, valueSelect } = state;
      state.arrPhanMemSearch = searchData(
        arrPhanMem,
        valueSearch,
        action.payload
      );
    },
    insertPhanMemAction: (state, action) => {
      let item = action.payload;

      state.arrPhanMem.push(item);

      //
      let { arrPhanMem, valueSearch, valueSelect } = state;
      state.arrPhanMemSearch = searchData(arrPhanMem, valueSearch, valueSelect);
    },
    updatePhanMemAction: (state, action) => {
      let itemUpdate = action.payload;
      let rowToChange = state.arrPhanMem.findIndex((item) => {
        return item.maPhanMem == itemUpdate.maPhanMem;
      });
      state.arrPhanMem[rowToChange] = itemUpdate;

      //
      state.arrPhanMemSearch = funcSearch(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrPhanMemAction,
  setValueSelectPhanMemAction,
  setValueSearchPhanMemAction,
  insertPhanMemAction,
  updatePhanMemAction,
} = phanMemReducer.actions;
export default phanMemReducer.reducer;

// ================================================
//
const funcSearch = (objData) => {
  let { arrPhanMem, valueSearch, valueSelect } = objData;

  return searchData(arrPhanMem, valueSearch, valueSelect);
};
//
const searchData = (arrData, valSearch, valSelect) => {
  let textSearch = valSearch.trim().toLowerCase();

  // search - text
  let arrUpdate = arrData.filter((item) => {
    let ngaySD = new Date(item.ngayCaiDat);
    let ngayKT = new Date(item.ngayCaiDat);
    ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

    return (
      (item.maPhanMem + "").toLowerCase().includes(textSearch) ||
      item.tenPhanMem.toLowerCase().includes(textSearch) ||
      item.moTa.toLowerCase().includes(textSearch) ||
      item.phienBan.toLowerCase().includes(textSearch) ||
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
      return item.trangThai === false;
    });
  } else if (valSelect == 2) {
    // Đang sử dụng
    arrUpdate = arrUpdate.filter((item) => {
      return item.trangThai === true;
    });
  } else if (valSelect == 3) {
    // het han
    arrUpdate = arrUpdate.filter((item) => {
      let ngaySD = new Date(item.ngayCaiDat);
      let ngayKT = new Date(item.ngayCaiDat);

      ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

      return day > ngayKT && item.trangThai !== false;
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

// Call Api ++++++++++++++++++++++++++++++++++++++
/**
 * update 1 phan mem
 * @param {object} phanMem
 * @returns
 */
export const updatePhanMemApi = (phanMem) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuPhanMem", phanMem);

      dispatch(updatePhanMemAction(result.data));
      history.push("/quan-ly/phan-mem");
    } catch (error) {
      console.log("🚀 ~ file: phanMemReducer.jsx:140 ~ return ~ error:", error);
    }
  };
};
/**
 * add 1 phan mem
 * @param {object} phanMem
 * @returns
 */
export const insertPhanMemApi = (phanMem) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuPhanMem", phanMem);

      dispatch(insertPhanMemAction(result.data));
      history.push("/quan-ly/phan-mem");
    } catch (error) {
      console.log(
        "🚀 ~ file: phanMemReducer.jsx:120 ~ returnasync ~ error:",
        error
      );
    }
  };
};
/**
 * get all api Phan mem
 */
export const getAllPhanMemApi = async (dispatch) => {
  try {
    const result = await http.get("/DSPhanMem");
    dispatch(setArrPhanMemAction(result.data));
  } catch (error) {}
};
