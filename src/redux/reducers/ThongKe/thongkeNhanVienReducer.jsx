//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";
import { formatDate_MM_YYYY } from "../../../util/formatString";

const initialState = {
  arr_tk_TgianTruc: [],
  arrDataTK_NhanVien: [],
  arrDataTK_NhanVienSearch: [],
  valueSelTgianTruc: formatDate_MM_YYYY(new Date()),
  valueSelCaTruc: -1, //1 : 6h-14h ---- 2: 14h-22h
  valueSearch: "",
  valueSort: 1,
};

const thongkeNhanVienReducer = createSlice({
  name: "thongkeNhanVienReducer",
  initialState,
  reducers: {
    set_tk__NV_Action: (state, action) => {
      state.valueSearch = action.payload;
    },
    set_tk_arrDataTK_NhanVien_NV_Action: (state, action) => {
      state.arrDataTK_NhanVien = action.payload;
      // state.arrDataTK_NhanVienSearch = action.payload;
      //
      state.arrDataTK_NhanVienSearch = dataSearch(state);
    },
    set_tk_arr_tk_TgianTruc_NV_Action: (state, action) => {
      state.arr_tk_TgianTruc = action.payload;
    },
    // search
    set_tk_valueSelTgianTruc_NV_Action: (state, action) => {
      state.valueSelTgianTruc = action.payload;
      //
      state.arrDataTK_NhanVienSearch = dataSearch(state);
    },
    set_tk_valueSelCaTruc_NV_Action: (state, action) => {
      state.valueSelCaTruc = action.payload;
      //
      state.arrDataTK_NhanVienSearch = dataSearch(state);
    },
    set_tk_valueSearch_NV_Action: (state, action) => {
      state.valueSearch = action.payload;
      //
      state.arrDataTK_NhanVienSearch = dataSearch(state);
    },
    set_tk_valueSort_NV_Action: (state, action) => {
      state.valueSort = action.payload;
      //
      state.arrDataTK_NhanVienSearch = dataSort(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_tk_arr_tk_TgianTruc_NV_Action,
  set_tk_arrDataTK_NhanVien_NV_Action,
  //
  set_tk_valueSelTgianTruc_NV_Action,
  set_tk_valueSelCaTruc_NV_Action,
  set_tk_valueSearch_NV_Action,
  //
  set_tk_valueSort_NV_Action,
} = thongkeNhanVienReducer.actions;
export default thongkeNhanVienReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++
const dataSearch = (state) => {
  let {
    arrDataTK_NhanVien,
    valueSelTgianTruc,
    valueSelCaTruc, //1 : 6h-14h ---- 2: 14h-22h
    valueSearch,
    valueSort,
  } = state;
  //
  let arrUpdate = arrDataTK_NhanVien;
  ///
  if (!valueSelTgianTruc.includes("-1")) {
    arrUpdate = arrUpdate.map((item) => {
      let { arrLichTruc } = item;
      let arrLT_new = arrLichTruc.filter((e) => {
        let strNgayTruc = formatDate_MM_YYYY(new Date(e.ngayTruc));
        return strNgayTruc.includes(valueSelTgianTruc);
      });
      return { ...item, arrLichTruc: arrLT_new };
    });
  }
  //
  if (valueSelCaTruc != -1) {
    arrUpdate = arrUpdate.map((item) => {
      let { arrLichTruc } = item;
      let arrLT_new = [];
      if (valueSelCaTruc == 1) {
        arrLT_new = arrLichTruc.filter((e) => {
          let { thoiGianBatDau, thoiGianKetThuc } = e;

          return parseInt(thoiGianBatDau) === 6;
        });
      } else if (valueSelCaTruc == 2) {
        arrLT_new = arrLichTruc.filter((e) => {
          let { thoiGianBatDau, thoiGianKetThuc } = e;

          return parseInt(thoiGianBatDau) !== 6;
        });
      }

      return { ...item, arrLichTruc: arrLT_new };
    });
  }
  //
  if (valueSearch.length !== 0) {
    arrUpdate = arrUpdate.filter((item) => {
      let search = valueSearch.trim().toLowerCase();
      return (
        item.tenNV.toLowerCase().includes(search) ||
        item.maNV.toLowerCase().includes(search)
      );
    });
  }
  if (valueSort != 0) {
    switch (valueSort) {
      case 1:
        arrUpdate.sort(sortSoLichTruc);
        break;

      default:
        break;
    }
  }

  return [...arrUpdate];
};
//
const dataSort = (state) => {
  let { arrDataTK_NhanVienSearch, valueSort } = state;
  let arrUpdate = arrDataTK_NhanVienSearch;
  if (valueSort != 0) {
    switch (valueSort) {
      case 1:
        arrUpdate.sort(sortSoLichTruc);
        break;

      default:
        break;
    }
  }
  return [...arrUpdate];
};
// sort
const sortSoLichTruc = (a, b) => {
  return b.arrLichTruc.length - a.arrLichTruc.length;
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const getData_TKNhanVienApi = async (dispatch) => {
  try {
    let result_LichTruc = await http.get("/DSLichTruc");
    let arr_LichTruc = result_LichTruc.data;

    let arr_tk_TgianTruc = arr_LichTruc.map((item) => {
      let date = new Date(item.ngayTruc);
      let tgian = formatDate_MM_YYYY(date);
      return tgian;
    });
    arr_tk_TgianTruc = arr_tk_TgianTruc.filter(
      (item, index) => arr_tk_TgianTruc.indexOf(item) === index
    );

    let result_DsNhanVien = await http.get("/DSNhanVien");
    let arrDataTK_NhanVien = result_DsNhanVien.data.map((item) => {
      let { maNV, tenNV } = item;

      let arrLichTruc = [];
      arr_LichTruc.forEach((e) => {
        let {
          maLich,
          ngayTruc,
          thoiGianBatDau,
          thoiGianKetThuc,
          nhanVien,
          tang,
        } = e;

        if (nhanVien.maNV.includes(maNV)) {
          arrLichTruc.push({
            maLich,
            ngayTruc,
            thoiGianBatDau,
            thoiGianKetThuc,
            tang,
          });
        }
      });

      let objData = {
        maNV,
        tenNV,
        arrLichTruc,
      };
      return objData;
    });

    //
    dispatch(set_tk_arr_tk_TgianTruc_NV_Action(arr_tk_TgianTruc));
    dispatch(set_tk_arrDataTK_NhanVien_NV_Action(arrDataTK_NhanVien));
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkeNhanVienReducer.jsx:31 ~ constgetData_TKNhanVienApi=async ~ error:",
      error
    );
  }
};
