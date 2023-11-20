//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import { formatToaNhaAndTang } from "../../util/formatString";

const initialState = {
  arrMayTinh: [],
  arrMayTinhSearch: [],
  valueSearch: "",
  valueSelToaNha: "-1",
  valueSelTang: "-1",
  valueSelPhongMay: "-1",
  valueSelTrangThai:'-1',
};

const mayTinhReducer = createSlice({
  name: "mayTinhReducer",
  initialState,
  reducers: {
    setArrMayTinhAction: (state, action) => {
      state.arrMayTinh = action.payload;
      state.arrMayTinhSearch = action.payload;
    },
    setValueSearchMayTinhAction: (state, action) => {
      state.valueSearch = action.payload;

      // 
      let {arrMayTinh, valueSearch, valueSelPhongMay, valueSelTang, valueSelToaNha, valueSelTrangThai} = state;

      state.arrMayTinhSearch = dataSearch(arrMayTinh, action.payload, valueSelToaNha, valueSelTang, valueSelPhongMay,valueSelTrangThai)
    },

  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrMayTinhAction,
  setValueSearchMayTinhAction, 
} = mayTinhReducer.actions;
export default mayTinhReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * 
 * @param {* data ccần tìm} arrData 
 * @param {* data search ở text} valSearch 
 * @param {* data select toaNha} valSelect1 
 * @param {* data select tang} valSelect2 
 * @param {* data select phong may} valSelect3 
 * @param {* data select Trangj thai} valSelect4
 */
const dataSearch = (
  arrData,
  valSearch,
  valSelect1,
  valSelect2,
  valSelect3,
  valSelect4
) => {
  let search = valSearch.toLowerCase();
  
  let arrUpdate = arrData.filter(item => {
    let ngaySD = new Date(item.ngayLapDat);
    return (
      (item.thietBiMays.length+'').toLowerCase().includes(search) ||
      item.moTa.toLowerCase().includes(search) ||
      item.phongMay.tenPhong.toLowerCase().includes(search) ||
      item.phongMay.tang.tenTang.toLowerCase().includes(search) ||
      item.phongMay.tang.toaNha.tenToaNha.toLowerCase().includes(search) ||
      formatToaNhaAndTang(item.phongMay.tang).toLowerCase().includes(search) ||
      formatStringDate(ngaySD).toLowerCase().includes(search)
    )
  })

  // 1
  if(valSelect1 != -1) {
    arrUpdate = arrUpdate.filter(item =>{
      return item.phongMay.tang.toaNha.maToaNha == valSelect1
    })
  }

  return [...arrUpdate];
};

// Call Api ++++++++++++++++++++++++++++++++++++++++++++++

export const getAllMayTinhApi = async (dispatch) => {
  try {
    let result = await http.get("/DSMayTinh2");

    dispatch(setArrMayTinhAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: mayTinhReducer.jsx:32 ~ getAllMayTinhApi ~ error:",
      error
    );
  }
};
