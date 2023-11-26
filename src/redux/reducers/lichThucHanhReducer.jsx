//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";

//
const fun_Search = (objData) => {
  let {arrCaThucHanh, valueSearch} =objData

  return dataSearch(arrCaThucHanh, valueSearch)
}
const dataSearch = (arrData, valSearch) => {
  let search = valSearch.toLowerCase();
  
  let arrUpdate = arrData.filter((item) => {
    let tgian = new Date(item.ngayThucHanh);

      let strTietTH = `${item.tietBatDau} - ${item.tietKetThuc}`;

    return (
      item.monHoc.tenMon.toLowerCase().includes(search) ||
      formatStringDate(tgian).toLowerCase().includes(search) ||
      item.tenCa.toLowerCase().includes(search) ||
      strTietTH.toLowerCase().includes(search) ||
      item.giaoVien.maGiaoVien.toLowerCase().includes(search) ||
      item.phongMay.tenPhong.toLowerCase().includes(search) 
    );
  });
  return [...arrUpdate];

}
//
const initialState = {
  arrCaThucHanh:[],
  arrCaThucHanhSearch:[],
  valueSearch:'',
  objDetailCaTH: {},
};

const lichThucHanhReducer = createSlice({
  name: "lichThucHanhReducer",
  initialState,
  reducers: {
    setArrCaThucHanhAction: (state, action) => {
      state.arrCaThucHanh = action.payload;
      state.objDetailCaTH = state.arrCaThucHanh[0]

      state.arrCaThucHanhSearch = fun_Search(state)
    },
    setObjDetailCaThucHanh: (state, action) => {
      state.objDetailCaTH = action.payload;
    },
    setValueSelSearchCaTHAction: (state, action) => {
      state.valueSearch = action.payload;

      //
      state.arrCaThucHanhSearch = fun_Search(state)
    },
    
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrCaThucHanhAction,
  setObjDetailCaThucHanh,
  setValueSelSearchCaTHAction
 } = lichThucHanhReducer.actions;
export default lichThucHanhReducer.reducer;


// Call api +++++++++++++++++++++++++++++++++++++++++++++++++


export const getAllCaThucHanhApi = async (dispatch) => {
  try {
    let result  = await http.get('/DSCaThucHanh');

    dispatch(setArrCaThucHanhAction(result.data));
  } catch (error) {
    console.log("🚀 ~ file: lichThucHanhReducer.jsx:36 ~ getAllCaThucHanh ~ error:", error)
    
  }
}