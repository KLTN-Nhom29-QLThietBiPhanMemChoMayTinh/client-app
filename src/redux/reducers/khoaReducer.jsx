//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import { history } from "../..";

// function
const dataSearch = (arrData, valSearch) => {
  let search = valSearch.trim().toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    return (
      (item.maKhoa + "").toLowerCase().includes(search) ||
      item.tenKhoa.toLowerCase().includes(search) ||
      (item.soGiaoVien + "").toLowerCase().includes(search)
    );
  });

  return [...arrUpdate];
};

const initialState = {
  arrKhoa: [],
  arrKhoaSearch: [],
  detailKhoa: {},
  valueSearch: "",
};

const khoaReducer = createSlice({
  name: "khoaReducer",
  initialState,
  reducers: {
    setArrKhoaAction: (state, action) => {
      state.arrKhoa = action.payload;
      state.arrKhoaSearch = action.payload;
    },
    setValueSearchKhoa: (state, action) => {
      state.valueSearch = action.payload;

      let { arrKhoa } = state;
      state.arrKhoaSearch = dataSearch(arrKhoa, action.payload);
    },
    insertKhoaAction: (state, action) => {
      let khoa = action.payload;
      let soGiaoVien = 0;

      state.arrKhoa.push({ ...khoa, soGiaoVien });
      let { arrKhoa, valueSearch } = state;

      state.arrKhoaSearch = dataSearch(arrKhoa, valueSearch);
    },
    updateKhoaAction: (state, action) => {
      let khoa = action.payload;

      let rowToChange = state.arrKhoa.findIndex((item) => {
        return item.maKhoa == khoa.maKhoa;
      });

      state.arrKhoa[rowToChange] = khoa;

      let { arrKhoa, valueSearch } = state;
      state.arrKhoaSearch = dataSearch(arrKhoa, valueSearch);
    },
    deleteKhoaAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrKhoa.filter((item) => {
        return item.maKhoa !== maXoa;
      });

      state.arrKhoa = [...arrUpdate];

      let { arrKhoa, valueSearch } = state;
      state.arrKhoaSearch = dataSearch(arrKhoa, valueSearch);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrKhoaAction,
  setValueSearchKhoa,
  insertKhoaAction,
  updateKhoaAction,
  deleteKhoaAction,
} = khoaReducer.actions;
export default khoaReducer.reducer;

// -------------- Call Api -------------------

/**
 * delete KhoaApi by id
 */
export const deleteKhoaApi = (maXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaKhoa/${maXoa}`)

      dispatch(deleteKhoaAction(maXoa));
    } catch (error) {
      console.log("🚀 ~ file: khoaReducer.jsx:85 ~ return ~ error:", error);
    }
  };
};

/**
 * edit 1 Khoa
 * @param {*} khoa
 * @returns
 */
export const updateKhoaApi = (khoa) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuKhoa", khoa);
      console.log("Dang dùng api insert");

      dispatch(updateKhoaAction(khoa));
    } catch (error) {
      console.log("🚀 ~ file: khoaReducer.jsx:56 ~ return ~ error:", error);
    }
  };
};

/**
 * add 1 Khoa
 * @param {*} khoa
 * @returns
 */
export const insertKhoaApi = (khoa) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuKhoa", khoa);

      dispatch(insertKhoaAction(result.data));
    } catch (error) {
      console.log("🚀 ~ file: khoaReducer.jsx:56 ~ return ~ error:", error);
    }
  };
};

/**
 * get all Khoa
 * @param {*} dispatch
 */
export const getAllKhoaApi = async (dispatch) => {
  try {
    let result = await http.get("/DSKhoa");
    let resultGV = await http.get("/DSGiaoVien");

    let arrData = result.data.map((item) => {
      let soGiaoVien = 0;
      resultGV.data.forEach((e) => {
        if (e.khoa.maKhoa == item.maKhoa) {
          soGiaoVien++;
        }
      });
      return { ...item, soGiaoVien };
    });

    dispatch(setArrKhoaAction(arrData));
    // dispatch(setArrKhoaAction(Database.dataKhoa));
  } catch (error) {
    console.log(
      "🚀 ~ file: khoaReducer.jsx:]7 ~ getAllKhoaApi ~ error:",
      error
    );
  }
};
