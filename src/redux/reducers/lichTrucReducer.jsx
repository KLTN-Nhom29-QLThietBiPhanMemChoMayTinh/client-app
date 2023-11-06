//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";
import { history } from "../..";
import { formatDate_MM_YYYY } from "../../util/formatString";

const dataSearch = (arrData, valSearch) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    let strCaTruc = `${item.thoiGianBatDau}h - ${item.thoiGianKetThuc}h`;

    return (
      (item.maLich + "").toLowerCase().includes(search) ||
      formatDate_MM_YYYY(item.tgian).toLowerCase().includes(search) ||
      strCaTruc.toLowerCase().includes(search) ||
      `${item.thoiGianBatDau}h`.toLowerCase().includes(search) ||
      `${item.thoiGianKetThuc}h`.toLowerCase().includes(search) ||
      (item.soNgayNghi + "").toLowerCase().includes(search) ||
      item.nhanVien.tenNV.toLowerCase().includes(search) ||
      item.nhanVien.sDT.toLowerCase().includes(search) ||
      item.tang.tenTang.toLowerCase().includes(search) ||
      item.tang.toaNha.tenToaNha.toLowerCase().includes(search)
    );
  });
  return [...arrUpdate];
};

const initialState = {
  arrLichTruc: [],
  arrLichTrucSearch: [],
};

const lichTrucReducer = createSlice({
  name: "lichTrucReducer",
  initialState,
  reducers: {
    setArrLichTrucAction: (state, action) => {
      state.arrLichTruc = action.payload;
      state.arrLichTrucSearch = action.payload;
    },
    setArrLichTrucSearchAction: (state, action) => {
      state.arrLichTrucSearch = dataSearch(state.arrLichTruc, action.payload);
    },
    insertLichTrucAction: (state, action) => {
      let item = action.payload;
      state.arrLichTruc = [...state.arrLichTruc, item];
      state.arrLichTrucSearch = [...state.arrLichTruc];
    },
    updateLichTrucAction: (state, action) => {
      let itemEdit = action.payload;
      // rowToChange - vi tri item co cung id
      let rowToChange = state.arrLichTruc.findIndex((item) => {
        return item.maLich === itemEdit.maLich;
      });

      state.arrLichTruc[rowToChange] = itemEdit;
      state.arrLichTrucSearch = [...state.arrLichTruc];
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrLichTrucAction,
  setArrLichTrucSearchAction,
  insertLichTrucAction,
  updateLichTrucAction,
} = lichTrucReducer.actions;
export default lichTrucReducer.reducer;

// CALL APi ==================================
export const getAllLichTruc = async (dispatch) => {
  try {
    // let result = await http.get("DSlichTruc");
    // dispatch(setArrLichTrucAction(result.data));

    dispatch(setArrLichTrucAction(Database.datalichTruc));
  } catch (error) {
    console.log(
      "🚀 ~ file: lichTrucReducer.jsx:29 ~ getAllLichTruc ~ error:",
      error
    );
  }
};

// export const getLichTrucbyId = async (id) => {
export const getLichTrucbyId = (id) => {
  let item = {};
  try {
    // let result = await http.get(`DSlichTruc/${id}`);

    const attItem = Database.datalichTruc.filter((item) => item.maLich == id);

    item = attItem[0];
  } catch (error) {
    console.log(
      "🚀 ~ file: lichTrucReducer.jsx:43 ~ getLichTrucbyId ~ error:",
      error
    );
  }

  return item;
};

// add
export const insertLichTrucApi = (lichTruc) => {
  let idRandom = Math.floor(Math.random() * 10000) + 1000;
  lichTruc = {...lichTruc, maLich:idRandom}
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuLichTruc", lichTruc);
      console.log("api OK nhung data chua okay", result);

      //
      // dispatch(insertLichTrucAction(result.data));
      dispatch(insertLichTrucAction(lichTruc));
      history.push("../../phan-cong/lich-truc");
    } catch (error) {
      console.log("🚀 ~ file: lichTrucReducer.jsx:65 ~ return ~ error:", error);
    }
  };
};

// update
export const updateLichTrucApi = (lichTruc) => {
  return async (dispatch) => {
    try {
      // let result = await http.put("/SuaLichTruc", lichTruc);
      //
      dispatch(updateLichTrucAction(lichTruc));

      history.push("../");
    } catch (error) {
      console.log("🚀 ~ file: lichTrucReducer.jsx:88 ~ return ~ error:", error);
    }
  };
};
