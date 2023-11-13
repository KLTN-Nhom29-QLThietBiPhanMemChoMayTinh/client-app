//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrPhongMay: [],
  arrPhongMaySearch: [],
  arrTangbyToaNha: [],
  valueSearch: "",
  valueSelectToaNha: "-1",
  valueSelectTang: "-1",
};

const phongMayReducer = createSlice({
  name: "phongMayReducer",
  initialState,
  reducers: {
    setArrPhongMayAction: (state, action) => {
      state.arrPhongMay = action.payload;
      state.arrPhongMaySearch = action.payload;
    },
    setValueSearchPhongMayAction: (state, action) => {
      state.valueSearch = action.payload;

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        action.payload,
        valueSelectToaNha,
        valueSelectTang
      );
    },
    setvalueSelectToaNhaPhongMayAction: (state, action) => {
      let { valSelect, arrTang } = action.payload;

      state.valueSelectToaNha = valSelect;
      state.valueSelectTang = "-1";

      // if (valSelect != -1) {
      state.arrTangbyToaNha = arrTang.filter(
        (item) => item.toaNha.maToaNha == valSelect
      );
      // }

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valSelect,
        "-1"
      );
    },
    setvalueSelectTangPhongMayAction: (state, action) => {
      let { valSelect } = action.payload;
      state.valueSelectTang = valSelect;

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valueSelectToaNha,
        valSelect
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrPhongMayAction,
  setValueSearchPhongMayAction,
  setvalueSelectToaNhaPhongMayAction,
  setvalueSelectTangPhongMayAction,
} = phongMayReducer.actions;
export default phongMayReducer.reducer;

/// =================================
const dataSearch = (arrData, valSearch, valSelectTN, valSelectTG) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = arrData;
  if (valSelectTN != -1) {
    console.log("toa nha != -1");
    if (valSelectTG != -1) {
      console.log("tang != -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.maTang == valSelectTG &&
          item.tang.toaNha.maToaNha == valSelectTN
        );
      });
    } else {
      console.log("tang == -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.toaNha.maToaNha == valSelectTN
        );
      });
    }
  } else {
    console.log("toa nha = -1");

    if (valSelectTG != -1) {
      console.log("tang != -1");
      arrUpdate = arrData.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.maTang == valSelectTG
        );
      });
    } else {
      console.log("tang == -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          item.tenPhong.toLowerCase().includes(search) ||
          item.moTa.toLowerCase().includes(search) ||
          (item.mayTinhs.length + "").toLowerCase().includes(search) ||
          (item.phanMems.length + "").toLowerCase().includes(search) ||
          item.trangThai.toLowerCase().includes(search)
        );
      });
    }
  }

  console.log(arrUpdate);
  return [...arrUpdate];
};

// CAll APi++++++++++++++++++++++++++++++++++++++

export const getAllPhongMayApi = async (dispatch) => {
  try {
    let result = await http.get("/DSPhongMay2");

    dispatch(setArrPhongMayAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: phongMayReducer.jsx:30 ~ getAllPhongMayApi ~ error:",
      error
    );
  }
};
