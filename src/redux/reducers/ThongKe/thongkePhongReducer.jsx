//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  valueSelectToaNha: -1,
  valueSelectTang: -1,
  obj_TKPhong: {},
};

const thongkePhongReducer = createSlice({
  name: "thongkePhongReducer",
  initialState,
  reducers: {
    set_obj_TKPhong_Action: (state, action) => {
      let {arrDataPhong} = action.payload;
      // let { tenPhong, tang, mayTinhs, arrPhanMem } = arrDataPhong;

      // let soMayTinh = mayTinhs.length;
      // let soPhanMem = arrPhanMem.length;

      // let objData = {
      //   tenPhong,
      //   tang,
      //   soMayTinh,
      //   soPhanMem,
      // };
      console.log("🚀 ~ file: thongkePhongReducer.jsx:29 ~ objData:", arrDataPhong)
    },
    set_tk_valueSelectToaNha_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
    },
    set_tk_valueSelectTang_Action: (state, action) => {
      state.valueSelectTang = action.payload;
    },
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_obj_TKPhong_Action,
  set_tk_valueSelectToaNha_Action,
  set_tk_valueSelectTang_Action,
} = thongkePhongReducer.actions;
export default thongkePhongReducer.reducer;

export const getData_TkPhong_Api = async (dispatch) => {
  try {
    const result_DSPhong = await http.get("/DSPhongMay");

    let arrDataPhong = [];
    result_DSPhong.data.forEach(async (item) => {
      console.log(
        "🚀 ~ file: thongkePhongReducer.jsx:44 ~ arrDataPhong ~ item:",
        item
      );
      let arrPhanMem = [];
      let resultPM = await http.get(
        `/DSPhongMayPhanMemTheoMaPhong/${item.maPhong}`
      );
      if (resultPM.data.length !== 0) {
        arrPhanMem = resultPM.data.map((e) => {
          return { ...e.phanMem, trangThaiPM: e.status };
        });
      }

      arrDataPhong.push({ ...item, arrPhanMem });
    });
    

    // setTimeout(() => {
      
      dispatch(set_obj_TKPhong_Action(arrDataPhong));
    // }, 1000);
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkePhongReducer.jsx:39 ~ constgetData_TkPhong_Api=async ~ error:",
      error
    );
  }
};
