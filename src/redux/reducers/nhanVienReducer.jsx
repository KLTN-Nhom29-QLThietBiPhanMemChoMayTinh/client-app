//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";


// function
const dataSearch = (arrData, valSearch) => {
    let search = valSearch.toLowerCase();

    let arrUpdate = arrData.filter(item => {
        let ngaySinh = new Date(item.ngaySinh);
        return (
        item.idCode.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (ngaySinh.getYear()+"").toLowerCase().includes(search) ||
        item.sdt.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) 
        )
    })

    return [...arrUpdate];
    
}

const initialState = {
  arrNhanVien: [],
  arrNhanVienSearch: [],
  detailNhanVien: {},
  valueSearch: "",
};

const nhanVienReducer = createSlice({
  name: "nhanVienReducer",
  initialState,
  reducers: {
    setArrNhanVienAction: (state, action) => {
      state.arrNhanVien = action.payload;
      state.arrNhanVienSearch = action.payload;
    },
    setValueSearchNhanVien: (state, action) =>{
        state.valueSearch = action.payload

        let{arrNhanVien} = state;
        state.arrNhanVienSearch = dataSearch(arrNhanVien, action.payload)
    }
  },
});
// exp nay de sử dụng theo cách 2
export const {setArrNhanVienAction,setValueSearchNhanVien, } = nhanVienReducer.actions;
export default nhanVienReducer.reducer;

// -------------- Call API ---------------

export const getAllNhanVienApi = async (dispatch) => {
  try {
    const result = await http.get("/DSNhanVien");
    dispatch(setArrNhanVienAction(result.data));
    // dispatch(setArrNhanVienAction(Database.dataNhanVien));
  } catch (error) {
    console.log(
      "🚀 ~ file: nhanVienReducer.jsx:38 ~ getAllNhanVienApi ~ error:",
      error
    );
  }
};
