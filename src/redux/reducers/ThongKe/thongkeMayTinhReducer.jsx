//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  valueSearch: "",
  valueSelectToaNha: -1,
  valueSelectTang: -1,
  valueSelectPhongMay: -1,
  valueSort: 1,
  valueSort_err: 1,
  arrDataTK_MayTinh: [],
  arrDataTK_MayTinhSearch: [],
  arrDataTK_MayTinhSearch_err: [],
  sum_Tbi: 0,
};

const thongkeMayTinhReducer = createSlice({
  name: "thongkeMayTinhReducer",
  initialState,
  reducers: {
    set_tk__MT_Action: (state, action) => {
      state.valueSearch = action.payload;
    },
    set_tk_valueSort_MT_Action: (state, action) => {
      state.valueSort = action.payload;
      //
      let { arrDataTK_MayTinhSearch, valueSort } = state;
      state.arrDataTK_MayTinhSearch = dataSort(
        arrDataTK_MayTinhSearch,
        valueSort
      );
    },
    set_tk_valueSort_err_MT_Action: (state, action) => {
      state.valueSort_err = action.payload;
      //
      let { arrDataTK_MayTinhSearch_err, valueSort_err } = state;
      state.arrDataTK_MayTinhSearch_err = dataSort(
        arrDataTK_MayTinhSearch_err,
        valueSort_err
      );
    },
    set_tk_sum_Tbi_MT_Action: (state, action) => {
      state.sum_Tbi = action.payload;
    },
    set_tk_arrDataTK_MayTinh_MT_Action: (state, action) => {
      state.arrDataTK_MayTinh = action.payload;

      //
      let { arrData, arrData_err } = dataSearch(state);
      state.arrDataTK_MayTinhSearch = arrData;
      state.arrDataTK_MayTinhSearch_err = arrData_err;
    },
    set_tk_valueSearch_MT_Action: (state, action) => {
      state.valueSearch = action.payload;
      //
      let { arrData, arrData_err } = dataSearch(state);
      state.arrDataTK_MayTinhSearch = arrData;
      state.arrDataTK_MayTinhSearch_err = arrData_err;
    },
    set_tk_valueSelectToaNha_MT_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
      state.valueSelectTang = -1;
      state.valueSelectPhongMay = -1;
      //
      let { arrData, arrData_err } = dataSearch(state);
      state.arrDataTK_MayTinhSearch = arrData;
      state.arrDataTK_MayTinhSearch_err = arrData_err;
    },
    set_tk_valueSelectTang_MT_Action: (state, action) => {
      state.valueSelectTang = action.payload;
      state.valueSelectPhongMay = -1;
      //
      let { arrData, arrData_err } = dataSearch(state);
      state.arrDataTK_MayTinhSearch = arrData;
      state.arrDataTK_MayTinhSearch_err = arrData_err;
    },
    set_tk_valueSelectPhongMay_MT_Action: (state, action) => {
      state.valueSelectPhongMay = action.payload;
      //
      let { arrData, arrData_err } = dataSearch(state);
      state.arrDataTK_MayTinhSearch = arrData;
      state.arrDataTK_MayTinhSearch_err = arrData_err;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_tk_valueSearch_MT_Action,
  set_tk_valueSelectToaNha_MT_Action,
  set_tk_valueSelectTang_MT_Action,
  set_tk_valueSelectPhongMay_MT_Action,
  set_tk_valueSort_MT_Action,
  set_tk_valueSort_err_MT_Action,
  //
  set_tk_arrDataTK_MayTinh_MT_Action,
  set_tk_sum_Tbi_MT_Action,
} = thongkeMayTinhReducer.actions;
export default thongkeMayTinhReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++
const dataSearch = (state) => {
  let {
    valueSearch,
    valueSelectToaNha,
    valueSelectTang,
    valueSelectPhongMay,
    arrDataTK_MayTinh,
    valueSort,
    valueSort_err,
  } = state;
  //
  let arrUpdate = arrDataTK_MayTinh;
  //
  if (valueSearch.trim().length !== 0) {
    let search = valueSearch.trim().toLowerCase();
    arrUpdate = arrUpdate.filter((item) => {
      return item.moTa.toLowerCase().includes(search);
    });
  }
  //
  if (valueSelectToaNha != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      let { phongMay } = item;
      return phongMay.tang.toaNha.maToaNha == valueSelectToaNha;
    });
  }
  //
  if (valueSelectTang != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      let { phongMay } = item;
      return phongMay.tang.maTang == valueSelectTang;
    });
  }
  //
  if (valueSelectPhongMay != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      let { phongMay } = item;
      return phongMay.maPhong == valueSelectPhongMay;
    });
  }
  let arrData = arrUpdate.filter((item) =>
    item.trangThai.includes("Đang hoạt động")
  );
  let arrData_err = arrUpdate.filter((item) =>
    item.trangThai.includes("Đã hỏng")
  );
  //sort
  switch (valueSort) {
    case 1:
      arrData.sort(sort_soThietBi);
      break;
    case 2:
      arrData.sort(sort_soThietBi_err);
      break;

    default:
      arrData.sort(sort_soThietBi_tiLe);
      break;
  }
  //sort_err
  switch (valueSort_err) {
    case 1:
      arrData_err.sort(sort_soThietBi);
      break;
    case 2:
      arrData_err.sort(sort_soThietBi_err);
      break;

    default:
      arrData_err.sort(sort_soThietBi_tiLe);
      break;
  }

  return { arrData, arrData_err };
};
//
const dataSort = (arrData, valSort) => {
  switch (valSort) {
    case 1:
      arrData.sort(sort_soThietBi);
      break;
    case 2:
      arrData.sort(sort_soThietBi_err);
      break;

    default:
      arrData.sort(sort_soThietBi_tiLe);
      break;
  }

  return [...arrData];
};
//
const sort_soThietBi = (a, b) => {
  let valuea = a.soThietBi;
  let valueb = b.soThietBi;
  return valueb - valuea;
};
//
const sort_soThietBi_err = (a, b) => {
  let valuea = a.soTbi_err;
  let valueb = b.soTbi_err;
  return valueb - valuea;
};
//
const sort_soThietBi_tiLe = (a, b) => {
  let valuea = (a.soTbi_err * 100) / a.soThietBi;
  let valueb = (b.soTbi_err * 100) / b.soThietBi;
  return valueb - valuea;
};
// +++++++++++++++++++++++++++++++++++++++++

export const getData_TKMayTinhApi = async (dispatch) => {
  try {
    let result_DSMayTinh = await http.get("/DSMayTinh2");
    let arrData = result_DSMayTinh.data.map((item) => {
      let { maMay, trangThai, moTa, phongMay, thietBiMays } = item;
      let soTbi_err = 0;
      thietBiMays.forEach((e) => {
        if (!e.trangThaiTbi) {
          soTbi_err++;
        }
      });

      let objData = {
        maMay,
        trangThai,
        moTa,
        phongMay,
        soThietBi: thietBiMays.length,
        soTbi_err,
      };
      return objData;
    });

    let result_DSThietbi = await http.get("/DSThietBiMay");

    dispatch(set_tk_arrDataTK_MayTinh_MT_Action(arrData));
    dispatch(set_tk_sum_Tbi_MT_Action(result_DSThietbi.data.length));
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkeMayTinhReducer.jsx:45 ~ constgetData_TKMayTinhApi= ~ error:",
      error
    );
  }
};
