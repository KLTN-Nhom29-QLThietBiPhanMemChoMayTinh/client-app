//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import Database from "../../util/database/Database";
import { history } from "../..";

//function

const searchData = (arrData, valSearch, valSelect, valSelect2) => {
  let textSearch = valSearch.trim().toLowerCase();
  let arrUpdate = [];
  // search - text
  arrUpdate = arrData.filter((item) => {
    let ngaySD = new Date(item.ngayCaiDat);
    let ngayKT = new Date(item.ngayCaiDat);
    ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

    return (
      (item.maThietBi + "").toLowerCase().includes(textSearch) ||
      item.tenThietBi.toLowerCase().includes(textSearch) ||
      (item.tuoiTho + "").toLowerCase().includes(textSearch) ||
      formatStringDate(ngaySD).toLowerCase().includes(textSearch) ||
      formatStringDate(ngayKT).toLowerCase().includes(textSearch)
    );
  });

  // search -- select
  let day = new Date();

  if (valSelect == 1) {
    // bi hong
    arrUpdate = arrUpdate.filter((item) => {
      return item.status === false;
    });
  } else if (valSelect == 2) {
    // Đang sử dụng
    arrUpdate = arrUpdate.filter((item) => {
      return item.status === true;
    });
  } else if (valSelect == 3) {
    // het han
    arrUpdate = arrUpdate.filter((item) => {
      let ngaySD = new Date(item.ngayCaiDat);
      let ngayKT = new Date(item.ngayCaiDat);

      ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);

      return day > ngayKT;
    });
  } else if (valSelect == 4) {
    // sap het han
    arrUpdate = arrUpdate.filter((item) => {
      let ngayKT = new Date(item.ngayCaiDat);
      ngayKT.setMonth(ngayKT.getMonth() + item.tuoiTho);
      let day2 = new Date(ngayKT);
      day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay

      return day2 < day && ngayKT > day;
    });
  }

  //
  if (valSelect2 != -1) {
    arrUpdate = arrUpdate.filter(
      (item) => item.loaiThietBi.maLoai == valSelect2
    );
  }

  return [...arrUpdate];
};
// sort
const sortData_LoaiThietBi = (arrData) => {
  let arrUpdate = arrData.sort((a, b) =>
    a.loaiThietBi.tenLoai > b.loaiThietBi.tenLoai
      ? 1
      : b.loaiThietBi.tenLoai > a.loaiThietBi.tenLoai
      ? -1
      : 0
  );

  return [...arrUpdate];
};

const initialState = {
  arrThietBi: [],
  arrThietBiSearch: [],
  arrLoaiTBi: [],
  detailValue: {},
  valueTxtSearch: "",
  valueSelect: "-1",
  valueSelectLoaiTBi: "-1",
};

const thietBiReducer = createSlice({
  name: "thietBiReducer",
  initialState,
  reducers: {
    setArrThietBiAction: (state, action) => {
      let arrdata = sortData_LoaiThietBi(action.payload);
      state.arrThietBi = arrdata;

      state.arrThietBiSearch = arrdata;
      state.valueSelect = "-1";
      state.valueTxtSearch = "";
    },
    setArrLoaiThietBiAction: (state, action) => {
      state.arrLoaiTBi = action.payload;
    },
    setValueTxtSearchAction: (state, action) => {
      state.valueTxtSearch = action.payload;

      let { valueSelect, arrThietBi, valueSelectLoaiTBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        action.payload,
        valueSelect,
        valueSelectLoaiTBi
      );
    },
    setValueSelectActionTBi: (state, action) => {
      state.valueSelect = action.payload;

      let { valueTxtSearch, arrThietBi, valueSelectLoaiTBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        action.payload,
        valueSelectLoaiTBi
      );
    },
    setValueSelectLoaiTbiAction: (state, action) => {
      state.valueSelectLoaiTBi = action.payload;

      let { valueTxtSearch, arrThietBi, valueSelect } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        valueSelect,
        action.payload
      );
    },
    insertThietBiAction: (state, action) => {
      let thietbi = action.payload;
      state.arrThietBi.push(thietbi);

      let arrdata = sortData_LoaiThietBi(state.arrThietBi);
      state.arrThietBi = arrdata;
      //
      let { valueTxtSearch, arrThietBi, valSelect, valueSelectLoaiTBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        valSelect,
        valueSelectLoaiTBi
      );
    },
    updateThietBiAction: (state, action) => {
      let thietbi = action.payload;

      let rowToChange = state.arrThietBi.findIndex(
        (item) => item.maThietBi == thietbi.maThietBi
      );
      state.arrThietBi[rowToChange] = thietbi;

      let arrdata = sortData_LoaiThietBi(state.arrThietBi);
      state.arrThietBi = arrdata;
      //
      let { valueTxtSearch, arrThietBi, valSelect, valueSelectLoaiTBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        valSelect,
        valueSelectLoaiTBi
      );
    },
    deleteThietBiAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrThietBi.filter((item) => {
        return item.maThietBi !== maXoa;
      });
      state.arrNhanVien = [...arrUpdate];
      //
      let { valueTxtSearch, arrThietBi, valSelect, valueSelectLoaiTBi } = state;

      state.arrThietBiSearch = searchData(
        arrThietBi,
        valueTxtSearch,
        valSelect,
        valueSelectLoaiTBi
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrLoaiThietBiAction,
  setArrThietBiAction,
  setValueTxtSearchAction,
  setValueSelectActionTBi,
  setValueSelectLoaiTbiAction,
  insertThietBiAction,
  updateThietBiAction,
  deleteThietBiAction,
} = thietBiReducer.actions;
export default thietBiReducer.reducer;

// -------------- Call Api -----------------

export const deleteThietBiApi = (maXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaThietBiMay/${maXoa}`);
      console.log(
        "Chưa có api xoa thietbi ( xóa 1 thiet bị xóa cả MaytinhThietbij liên quan )"
      );

      dispatch(deleteThietBiAction(maXoa));
    } catch (error) {
      alert('Thiết bị đang dược sử dụng tại 1 phòng học. không thể xóa.')
      console.log(
        "🚀 ~ file: thietBiReducer.jsx:203 ~ returnasync ~ error:",
        error
      );
    }
  };
};
/**
 * edit 1 thiet bị api
 * @param {object} thietBi
 * @returns
 */
export const updateThietbiApi = (thietBi) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuThietBiMay", thietBi);

      dispatch(updateThietBiAction(result.data));

      history.push("/quan-ly/thiet-bi");
    } catch (error) {
      console.log(
        "🚀 ~ file: thietBiReducer.jsx:126 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * add 1 thiet bị api
 * @param {object} thietBi
 * @returns
 */
export const insertThietBiApi = (thietBi) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuThietBiMay", thietBi);

      dispatch(insertThietBiAction(result.data));

      history.push("/quan-ly/thiet-bi");
    } catch (error) {
      console.log(
        "🚀 ~ file: thietBiReducer.jsx:126 ~ returnasync ~ error:",
        error
      );
    }
  };
};
/**
 * ds loai thiet bi
 */
export const getAllLoaiThietBiApi = async (dispatch) => {
  try {
    let result = await http.get("/DSLoaiThietBi");

    dispatch(setArrLoaiThietBiAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: thietBiReducer.jsx:128 ~ getAllLoaiThietBiApi ~ error:",
      error
    );
  }
};
/**
 * Ds all Thiet bij
 * @param {*} dispatch
 */
export const getAllThietBiApi = async (dispatch) => {
  try {
    let result = await http.get("/DSThietBiMay");
    const action = setArrThietBiAction(result.data);

    // const action = setArrThietBiAction(Database.dataThietBi);
    dispatch(action);
  } catch (error) {
    console.log(
      "🚀 ~ file: thietBiReducer.jsx:38 ~ getAllThietBi ~ error:",
      error
    );
  }
};
