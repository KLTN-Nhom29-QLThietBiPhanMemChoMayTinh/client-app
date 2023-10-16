//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";

const initialState = {
  arrMonHoc: [
    {
      id: 1,
      idCode: "MH001",
      name: "Lập trình www.",
      ngayBatDau: new Date(2022, 9, 9),
      soBuoi: 15,
    },
  ],
  detailMonHoc: {},
};

const monHocReducer = createSlice({
  name: "monHocReducer",
  initialState,
  reducers: {
    setArrMonHocAction : (state, action) => {
        state.arrMonHoc = action.payload
    }
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrMonHocAction, } = monHocReducer.actions;
export default monHocReducer.reducer;




// -------------- Call Api -----------------

export const getAllMonHoc = async (dispatch) => {
    // call Api 
    try {
        // let result = await http.get('/monhoc...');
        // const action = setArrMonHocAction(result.data.content)
        const action = setArrMonHocAction(Database.dataMonHoc);

        dispatch(action);


    } catch (error) {
        console.log("🚀 ~ file: monHocReducer.jsx:37 ~ getAllMonHoc ~ error:", error)
        
    }
}