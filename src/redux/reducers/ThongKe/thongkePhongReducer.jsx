//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  sum_PM: 0,
  valueSearch: "",
  valueSelectToaNha: -1,
  valueSelectTang: -1,
  obj_TKPhong: {},
  arrTK_DataPhong: [],
  arrTK_DataPhong_Search: [],
  valueSort: 3, // sort theo soMay
};

const thongkePhongReducer = createSlice({
  name: "thongkePhongReducer",
  initialState,
  reducers: {
    set_obj_TKPhong_Action: (state, action) => {
      state.arrTK_DataPhong = action.payload;
      let arrData = action.payload;
      state.arrTK_DataPhong = arrData.map((item) => {
        let { tang, mayTinhs, tenPhong, arrPhanMem } = item;
        let soPM_err = 0;
        let soMT_err = 0;
        arrPhanMem.map((item) => {
          if (!item.trangThaiPM) {
            soPM_err++;
          }
        });
        mayTinhs.map((item) => {
          if (item.trangThai.includes("Đã hỏng")) {
            soMT_err++;
          }
        });
        let objData = {
          tenPhong,
          tang,
          soMayTinh: mayTinhs.length,
          soPhanMem: arrPhanMem.length,
          soPM_err,
          soMT_err,
        };
        return objData;
      });

      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    set_tk_valueSort_Action: (state, action) => {
      state.valueSort = action.payload;
       //
       state.arrTK_DataPhong_Search = funcSearch(state);
    
    },
    set_Sum_PM: (state, action) => {
      state.sum_PM = action.payload;
    },
    set_tk_valueSearch_Action: (state, action) => {
      state.valueSearch = action.payload;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    set_tk_valueSelectToaNha_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
      state.valueSelectTang = -1;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    set_tk_valueSelectTang_Action: (state, action) => {
      state.valueSelectTang = action.payload;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    changeNumber: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_Sum_PM,
  set_obj_TKPhong_Action,
  set_tk_valueSelectToaNha_Action,
  set_tk_valueSelectTang_Action,
  set_tk_valueSearch_Action,
  set_tk_valueSort_Action,
} = thongkePhongReducer.actions;
export default thongkePhongReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++
const funcSearch = (objData) => {
  let {
    arrTK_DataPhong,
    valueSort,
    valueSearch,
    valueSelectToaNha,
    valueSelectTang,
  } = objData;

  return dataSearch(
    arrTK_DataPhong,
    valueSearch,
    valueSort,
    valueSelectToaNha,
    valueSelectTang
  );
};
const dataSearch = (arrData, valSearch, valSort, valSelect1, valSelect2) => {
  let arrUpdate = arrData;
  //
  if (valSearch.trim().length !== 0) {
    let search = valSearch.trim().toLowerCase();
    arrUpdate = arrUpdate.filter((item) => {
      return item.tenPhong.toLowerCase().includes(search);
    });
  }
  //
  if (valSelect1 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.toaNha.maToaNha == valSelect1;
    });
  }
  //
  if (valSelect2 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.maTang == valSelect2;
    });
  }
  // sort
  switch (valSort) {
    case 1:
      arrUpdate.sort(sort_soPhanMem);
      break;
    case 2:
      arrUpdate.sort(sort_soPhanMem_err);
      break;
    case 4:
      arrUpdate.sort(sort_soMayTinh_err);
      break;

    default:
      arrUpdate.sort(sort_soMayTinh);
  }

  return [...arrUpdate];
};
//
const sort_soMayTinh = (a, b) => {
  let valuea = a.soMayTinh;
  let valueb = b.soMayTinh;
  return valueb - valuea;
};
//
const sort_soMayTinh_err = (a, b) => {
  let valuea = a.soMT_err;
  let valueb = b.soMT_err;
  return valueb - valuea;
};
//
const sort_soPhanMem_err = (a, b) => {
  return b.soPM_err - a.soPM_err;
};
//
const sort_soPhanMem = (a, b) => {
  return b.soPhanMem - a.soPhanMem;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++
export const getData_TkPhong_Api = async (dispatch) => {
  try {
    const result_DSPhong = await http.get("/DSPhongMay");

    let arrDataPhong = [];
    result_DSPhong.data.forEach(async (item) => {
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
    // lays ds PM - de co sum PM
    let resultPM = await http.get("/DSPhanMem");

    setTimeout(() => {
      dispatch(set_Sum_PM(resultPM.data.length));
      dispatch(set_obj_TKPhong_Action(arrDataPhong));
    }, 1000);
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkePhongReducer.jsx:39 ~ constgetData_TkPhong_Api=async ~ error:",
      error
    );
  }
};
