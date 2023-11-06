//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrToaNha: [],
  arrToaNhaSearch: [],
  arrToaNhaLichTruc: [],
  detailToaNha: {},
  valueSearch: "",
};

const toaNhaReducer = createSlice({
  name: "toaNhaReducer",
  initialState,
  reducers: {
    setArrToaNhaAction: (state, action) => {
      state.arrToaNha = action.payload;
      state.arrToaNhaSearch = action.payload;
    },
    serArrToaNhaLichTrucAction: (state, action) => {
      state.arrToaNhaLichTruc = action.payload;
    },
    setArrToaNhaByValSearchAction: (state, action) => {
      state.valueSearch = action.payload;
      let { arrToaNha } = state;

      state.arrToaNhaSearch = dataSearch(arrToaNha, action.payload);
    },
  },
});
//
const dataSearch = (arrData, valSearch) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    return (
      (item.maToaNha + "").toLowerCase().includes(search) ||
      item.tenToaNha.toLowerCase().includes(search) ||
      (item.soTang + "").toLowerCase().includes(search)
    );
  });

  return [...arrUpdate];
};

// exp nay de sử dụng theo cách 2
export const {
  setArrToaNhaAction,
  serArrToaNhaLichTrucAction,
  setArrToaNhaByValSearchAction,
} = toaNhaReducer.actions;
export default toaNhaReducer.reducer;

// Call APi ======================================

export const getAllToaNhaApi = async (dispatch) => {
  try {
    const result = await http.get("/DSToaNha");
    const result2 = await http.get("/DSTang");

    const arrData = result.data.map((item) => {
      let soTang = 0;
      result2.data.forEach((itemTang) => {
        if (itemTang.toaNha.maToaNha === item.maToaNha) {
          soTang++;
        }
      });

      return { ...item, soTang };
    });
    dispatch(setArrToaNhaAction(arrData));
  } catch (error) {
    console.log(
      "🚀 ~ file: toaNhaReducer.jsx:34 ~ getAllToaNhaApi ~ error:",
      error
    );
  }
};
//
/**
 * ds toa nha co tang chua co nguoi giams sat
 * @param {*} dispatch
 */
export const getAllToaNhaByLichTruc = async (dispatch) => {
  try {
    console.log(
      "can 1 controller - ds toa nha co tang chua co nguoi giams sat"
    );
    const result = await http.get("/DSToaNha");

    dispatch(serArrToaNhaLichTrucAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: toaNhaReducer.jsx:34 ~ getAllToaNhaApi ~ error:",
      error
    );
  }
};
