//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";

//
const fun_Search = (objData) => {
  let {arrCaThucHanh, valueSearch, valueDateFrom, valueDateTo} =objData

  return dataSearch(arrCaThucHanh, valueSearch, valueDateFrom, valueDateTo)
}
const dataSearch = (arrData, valSearch, valDateFrom, valDateTo ) => {
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

  //
  if(valDateFrom.length > 0) {
    let dayForm = new Date(valDateFrom)
    arrUpdate = arrUpdate.filter(item => {
      let tgianTH = new Date(item.ngayThucHanh);
      return tgianTH >= dayForm;
    })
  }
  //
  if(valDateTo.length > 0) {
    let day = new Date(valDateTo)
    arrUpdate = arrUpdate.filter(item => {
      let tgianTH = new Date(item.ngayThucHanh);
      return tgianTH <= day;
    })
  }



  //
  return [...arrUpdate];
}
//
const initialState = {
  arrCaThucHanh:[],
  arrCaThucHanhSearch:[],
  objDetailCaTH: {},
  valueSearch:'',
  valueDateFrom:'',
  valueDateTo:'',
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
    setValueSelDateFromCaTHAction: (state, action) => {
      state.valueDateFrom = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state)
    },
    setValueSelDateToCaTHAction: (state, action) => {
      state.valueDateTo = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state)
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { 
  setArrCaThucHanhAction,
  setObjDetailCaThucHanh,
  setValueSelSearchCaTHAction,
  setValueSelDateFromCaTHAction,
  setValueSelDateToCaTHAction,
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