//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import Database from "../../util/database/Database";

// function
const dataSearch = (arrData, valSearch) => {
    let search = valSearch.toLowerCase();

    let arrUpdate = arrData.filter(item => {
        return (
        item.idCode.toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (item.soGiaoVien+"").toLowerCase().includes(search) ||
        formatNameByHocVi(item.truongKhoa).toLowerCase().includes(search) 
        )
    })

    return [...arrUpdate];
    
}

const initialState = {
    arrKhoa:[],
    arrKhoaSearch:[],
    detailKhoa:{},
    valueSearch:'',

}

const khoaReducer = createSlice({
  name: "khoaReducer",
  initialState,
  reducers: {
    setArrKhoaAction:(state,action) => {
        state.arrKhoa = action.payload;
        state.arrKhoaSearch = action.payload;
    },
    setValueSearchKhoa: (state, action) =>{
        state.valueSearch = action.payload

        let{arrKhoa} = state;
        state.arrKhoaSearch = dataSearch(arrKhoa, action.payload)
    },
    
  },
});
// exp nay de sử dụng theo cách 2
export const { 
    setArrKhoaAction,
    setValueSearchKhoa,
 } = khoaReducer.actions;
export default khoaReducer.reducer;


// -------------- Call Api -------------------

export const getAllKhoaApi = async (dispatch) => {
    try {
        // let result = await http.get('/Khoa...');
        // dispatch(setArrKhoaAction(result.data.content));
        dispatch(setArrKhoaAction(Database.dataKhoa));
    } catch (error) {
        console.log("🚀 ~ file: khoaReducer.jsx:37 ~ getAllKhoaApi ~ error:", error)
        
    }
}
