//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import Database from "../../util/database/Database";


// function
const dataSearch = (arrData, valSearch) => {
    let search = valSearch.toLowerCase();

    let arrUpdate = arrData.filter(item => {
        let ngaySinh = new Date(item.ngaySinh);
        return (
        item.idCode.toLowerCase().includes(search) ||
        (formatNameByHocVi(item) + '').toLowerCase().includes(search) ||
        (ngaySinh.getYear()+"").toLowerCase().includes(search) ||
        item.sdt.toLowerCase().includes(search) ||
        item.hocVi.toLowerCase().includes(search) ||
        item.tenKhoa.toLowerCase().includes(search) ||
        item.chucVu.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) 
        )
    })

    return [...arrUpdate];
    
}

const initialState = {
  arrTaiKhoan: [],
  arrTaiKhoanSearch: [],
  detailTaiKhoan: {},
  valueSearch: "",
};

const taiKhoanReducer = createSlice({
  name: "taiKhoanReducer",
  initialState,
  reducers: {
    setArrTaiKhoanAction: (state, action) => {
      state.arrTaiKhoan = action.payload;
      state.arrTaiKhoanSearch = action.payload;
    },
    setValueSearchTaiKhoan: (state, action) =>{
        state.valueSearch = action.payload

        let{arrTaiKhoan} = state;
        state.arrTaiKhoanSearch = dataSearch(arrTaiKhoan, action.payload)
    }
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTaiKhoanAction,
  setValueSearchTaiKhoan,
 } = taiKhoanReducer.actions;
export default taiKhoanReducer.reducer;

// -------------- Call API ---------------

export const getAllTaiKhoanApi = async (dispatch) => {
  try {
    // const result = await http.get("/TaiKhoan...");
    // dispatch(setArrTaiKhoanAction(result.data.content));
    dispatch(setArrTaiKhoanAction(Database.dataTaiKhoan));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};
