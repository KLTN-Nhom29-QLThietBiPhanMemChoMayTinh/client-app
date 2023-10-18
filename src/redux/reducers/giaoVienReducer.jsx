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
  arrGiaoVien: [],
  arrGiaoVienSearch: [],
  detailGiaoVien: {},
  valueSearch: "",
};

const giaoVienReducer = createSlice({
  name: "giaoVienReducer",
  initialState,
  reducers: {
    setArrGiaoVienAction: (state, action) => {
      state.arrGiaoVien = action.payload;
      state.arrGiaoVienSearch = action.payload;
    },
    setValueSearchGiaoVien: (state, action) =>{
        state.valueSearch = action.payload

        let{arrGiaoVien} = state;
        state.arrGiaoVienSearch = dataSearch(arrGiaoVien, action.payload)
    }
  },
});
// exp nay de sử dụng theo cách 2
export const {setArrGiaoVienAction,setValueSearchGiaoVien, } = giaoVienReducer.actions;
export default giaoVienReducer.reducer;

// -------------- Call API ---------------

export const getAllGiaoVienApi = async (dispatch) => {
  try {
    // const result = await http.get("/giaovien...");
    // dispatch(setArrGiaoVienAction(result.data.content));
    dispatch(setArrGiaoVienAction(Database.dataGiaoVien));
  } catch (error) {
    console.log(
      "🚀 ~ file: giaoVienReducer.jsx:38 ~ getAllGiaoVienApi ~ error:",
      error
    );
  }
};
