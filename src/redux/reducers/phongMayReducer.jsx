//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrPhongMay: [],
  arrPhongMaySearch: [],
  valueSearch: "",
  valueSelectToaNha:'',
  valueSelectTang:'',
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

      let {arrPhongMay ,valueSearch, valueSelectToaNha, valueSelectTang  } = state

      state.arrPhongMaySearch = dataSearch(arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang);
    },
    
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrPhongMayAction,
  setValueSearchPhongMayAction,
 } = phongMayReducer.actions;
export default phongMayReducer.reducer;

/// =================================
const dataSearch = (arrData, valSearch, valSelectTN, valSelectTG) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = arrData.filter((item) => {
    return (
      item.tenPhong.toLowerCase().includes(search) ||
      item.moTa.toLowerCase().includes(search) ||
      (item.mayTinhs.length+'').toLowerCase().includes(search) ||
      (item.phanMems.length + '').toLowerCase().includes(search) ||
      item.trangThai.toLowerCase().includes(search)
    )
  })

  return [...arrUpdate];
}

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
