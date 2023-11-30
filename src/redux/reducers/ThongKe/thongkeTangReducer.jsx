//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  tk_TheoTang_arr: [],
};

const thongkeTangReducer = createSlice({
  name: "thongkeTangReducer",
  initialState,
  reducers: {
    set_tk_TheoTang_arr_Action: (state, action) => {
      state.tk_TheoTang_arr = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { set_tk_TheoTang_arr_Action } = thongkeTangReducer.actions;
export default thongkeTangReducer.reducer;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++

export const set_tk_TheoTang_arr_Api = async (dispatch) => {
  try {
    const tk_TheoTang_arr = [];
    const result = await http.get("/DSTang");
    const resultPhong = await http.get("/DSPhongMay2");
    let sum = 0;

    // data2 ToaNha_phongMay
    sum = 0;
    let arrData2 = result.data.map((item, index) => {
      let soPhong = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.maTang === item.maTang) {
          soPhong++;
        }
      });
      sum += soPhong;
      let name = `${item.tenTang} - ${item.toaNha.tenToaNha}`;
      return { name, value: soPhong };
    });
    // arrData2.sort((a, b) => a.name > b.name ? 1 : -1);
    tk_TheoTang_arr.push({
      name_title: "1: thống kê tầng theo số phòng",
      sum,
      text_name: "phòng",
      data_table: arrData2,
    });

    // data3 ToaNha_MayTinh
    sum = 0;
    let arrData3 = result.data.map((item, index) => {
      let soMayTinh = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.maTang === item.maTang) {
          soMayTinh += itemPhong.mayTinhs.length;
        }
      });
      sum += soMayTinh;
      let name = `${item.tenTang} - ${item.toaNha.tenToaNha}`;
      return { name, value: soMayTinh };
    });
    tk_TheoTang_arr.push({
      name_title: "2: thống kê tầng theo số máy tính",
      sum,
      text_name: "máy",
      data_table: arrData3,
    });

    dispatch(set_tk_TheoTang_arr_Action(tk_TheoTang_arr));
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkeTangReducer.jsx:30 ~ constset_tk_TheoTang_arr_Api= ~ error:",
      error
    );
  }
};
