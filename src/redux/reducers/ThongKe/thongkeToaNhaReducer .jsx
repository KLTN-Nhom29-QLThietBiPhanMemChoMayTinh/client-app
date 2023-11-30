//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  //{ name_title:'', data_table:[ {name, value} ], }
  tk_ToaNha_SoTang: {},
  // ToaNha_SoTang , ToaNha_SoPhong, ToaNha_SoMay
  tk_TheoToaNha_arr: [],
  tk_ToaNha_status_mayTinh: {},
};

const thongkeToaNhaReducer = createSlice({
  name: "thongkeToaNhaReducer ",
  initialState,
  reducers: {
    set_tk_ToaNha_SoTang_Action: (state, action) => {
      state.tk_ToaNha_SoTang = action.payload;
    },
    set_tk_TheoToaNha_arr_Action: (state, action) => {
      state.tk_TheoToaNha_arr = action.payload;
    },
    set_tk_ToaNha_status_mayTinh_action: (state, action) => {
      state.tk_ToaNha_status_mayTinh = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_tk_ToaNha_SoTang_Action,
  set_tk_ToaNha_status_mayTinh_action,
  set_tk_TheoToaNha_arr_Action,
} = thongkeToaNhaReducer.actions;
export default thongkeToaNhaReducer.reducer;

// ++++++++++++++++++++++++++++++++++++++++++++++
export const set_tk_TheoToaNha_arr_Api = async (dispatch) => {
  try {
    const tk_TheoToaNha_arr = [];
    const result = await http.get("/DSToaNha");
    const result2 = await http.get("/DSTang");
    const resultPhong = await http.get("/DSPhongMay2");
    let sum = 0;
    const arrData1 = result.data.map((item) => {
      let soTang = 0;
      result2.data.forEach((itemTang) => {
        if (itemTang.toaNha.maToaNha === item.maToaNha) {
          soTang++;
        }
      });
      sum += soTang;
      return { name: item.tenToaNha, value: soTang };
    });
    //{ name_title:'', data_table:[ {name, value} ], }
    tk_TheoToaNha_arr.push({
      name_title: "1: thống kê tòa nhà theo số tầng",
      sum,
      text_name: "tầng",
      data_table: arrData1,
    });

    // data2 ToaNha_phongMay
    sum = 0;
    let arrData2 = result.data.map((item, index) => {
      let soPhong = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.toaNha.maToaNha === item.maToaNha) {
          soPhong++;
        }
      });
      sum += soPhong;
      return { name: item.tenToaNha, value: soPhong };
    });
    tk_TheoToaNha_arr.push({
      name_title: "2: thống kê tòa nhà theo số phòng",
      sum,
      text_name: "phòng",
      data_table: arrData2,
    });

    // data3 ToaNha_MayTinh
    sum = 0;
    let arrData3 = result.data.map((item, index) => {
      let soMayTinh = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.toaNha.maToaNha === item.maToaNha) {
          soMayTinh += itemPhong.mayTinhs.length;
        }
      });
      sum += soMayTinh;
      return { name: item.tenToaNha, value: soMayTinh };
    });
    tk_TheoToaNha_arr.push({
      name_title: "3: thống kê tòa nhà theo số máy tính",
      sum,
      text_name: "máy",
      data_table: arrData3,
    });

    // data3 ToaNha_MayTinh
    sum = 0;
    let arrData4 = result.data.map((item, index) => {
      let soMayTinh = 0;
      let soMay_biHong = 0;
      let soMay_dangSD = 0;
      let value_err = 0;
      let value_run = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.toaNha.maToaNha === item.maToaNha) {
          if(itemPhong.mayTinhs.length === 0) {
            return ;
          }
          soMayTinh += itemPhong.mayTinhs.length;
          value_err = 0;
          value_run = 0;
          itemPhong.mayTinhs.forEach((e) => {
            if (e.trangThai.includes("Đã hỏng")) {
              value_err++;
            } else {
              value_run++;
            }
          });

          soMay_biHong += value_err;
          soMay_dangSD += value_run;
        }
      });
      sum += soMayTinh;
      return { name: item.tenToaNha, soMayTinh, soMay_biHong, soMay_dangSD };
    });
    const obj_tk_TheoToaNha_TrangThaiMayTinh = {
      name_title: "4: thống kê tòa nhà theo trạng thái máy tính hiện tại",
      sum,
      text_name: "máy",
      data_table: arrData4,
    };

    // dispatch(
    //   set_tk_ToaNha_SoTang_Action({
    //     name_title: "1: thống kê tòa nhà theo số tầng",
    //      sum,
    //      text_name:'Số máy',
    //     data_table: arrData1,
    //   })
    // );
    dispatch(set_tk_TheoToaNha_arr_Action(tk_TheoToaNha_arr));
    dispatch(
      set_tk_ToaNha_status_mayTinh_action(obj_tk_TheoToaNha_TrangThaiMayTinh)
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkeToaNhaReducer .jsx:32 ~ constset_tk_ToaNha_SoTang_arr_Api= ~ error:",
      error
    );
  }
};
