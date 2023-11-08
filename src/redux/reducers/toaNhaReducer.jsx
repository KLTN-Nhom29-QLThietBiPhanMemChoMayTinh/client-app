//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { history } from "../..";

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
    insertToaNhaAction: (state, action) => {
      let toaNha = action.payload;
      let arrUpdate = state.arrToaNha;
      arrUpdate.push({ ...toaNha, soTang: 0 });
      state.arrToaNha = [...arrUpdate];
      state.arrToaNhaSearch = [...arrUpdate];
    },
    deleteToaNhaAction: (state, action) => {
      let idXoa = action.payload;
      let arrUpdate = state.arrToaNha.filter((item) => {
        return item.maToaNha !== idXoa;
      });
      state.arrToaNha = [...arrUpdate];
      state.arrToaNhaSearch = [...arrUpdate];
    },
    updateToaNhaAction: (state, action) => {
      let itemEdit = action.payload;
      let rowToChange = state.arrToaNha.findIndex((item) => {
        return item.maToaNha == itemEdit.maToaNha;
      });
      state.arrToaNha[rowToChange] = itemEdit;
      state.arrToaNhaSearch = [...state.arrToaNha];
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
  insertToaNhaAction,
  deleteToaNhaAction,
  updateToaNhaAction,
} = toaNhaReducer.actions;
export default toaNhaReducer.reducer;

// Call APi ======================================

export const updateToaNha = (toaNha) => {
  return async (dispatch) => {
    // let result = await http.put("/toaNha", toaNha)
    console.log("chua co api update ToaNha");

    dispatch(updateToaNhaAction(toaNha));
    history.push('../')
  };
};

/**
 * xoa 1 toa nha theo id
 * @param {long} idXoa
 * @returns
 */
export const deleteToaNha = (idXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaToaNha/${idXoa}`);

      //
      dispatch(deleteToaNhaAction(idXoa));
    } catch (error) {
      console.log("🚀 ~ file: toaNhaReducer.jsx:73 ~ return ~ error:", error);
    }
  };
};

/**
 * insert 1 toa nha
 * @param {text} tenToaNha
 * @returns
 */
export const insertToaNha = (tenToaNha) => {
  let toaNhaNew = {
    tenToaNha,
  };
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuToaNha", toaNhaNew);
      let toaNha = result.data;
      dispatch(insertToaNhaAction(toaNha));

      history.push("/quan-ly/khu-vuc");
    } catch (error) {
      console.log("🚀 ~ file: toaNhaReducer.jsx:70 ~ return ~ error:", error);
    }
  };
};

/**
 * api Call ALL ToaNha
 * @param {*} dispatch
 */
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
