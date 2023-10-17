//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
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
  arrMonHocSort: [],
  detailMonHoc: {},
};

const monHocReducer = createSlice({
  name: "monHocReducer",
  initialState,
  reducers: {
    setArrMonHocAction: (state, action) => {
      state.arrMonHoc = action.payload;
      state.arrMonHocSort = action.payload;
    },
    setArrMonHocSortAction: (state, action) => {
      let textSearch = action.payload.toLowerCase();
      console.log("🚀 ~ file: monHocReducer.jsx:31 ~ action:", textSearch)
      let dataUpdate = state.arrMonHoc.filter((item)=>{
        let ngayBD = new Date(item.ngayBatDau);
        let ngayKT = new Date(item.ngayBatDau);
        ngayKT.setDate(ngayKT.getDate() + item.soBuoi*7)

        return (
          
          item.idCode.toLowerCase().includes(textSearch)  || 
          item.name.toLowerCase().includes(textSearch)  || 
          // item.ngayBatDau.toLowerCase().includes(textSearch)  || 
          (item.soBuoi + "").toLowerCase().includes(textSearch)  ||
          formatStringDate(ngayBD).toLowerCase().includes(textSearch) ||
          formatStringDate(ngayKT).toLowerCase().includes(textSearch)
        )
      })

      state.arrMonHocSort = [...dataUpdate];

    },

  },
});
// exp nay de sử dụng theo cách 2
export const { setArrMonHocAction, setArrMonHocSortAction } =
  monHocReducer.actions;
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
    console.log(
      "🚀 ~ file: monHocReducer.jsx:37 ~ getAllMonHoc ~ error:",
      error
    );
  }
};
