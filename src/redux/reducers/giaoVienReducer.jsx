//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatNameByHocVi, http } from "../../util/config";
import Database from "../../util/database/Database";
import { history } from "../..";
import { insertTaiKhoanAction } from "./taiKhoanReducer";
import { getAllKhoaApi } from "./khoaReducer";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    if (valSelect == -1) {
      return (
        item.maGiaoVien.toLowerCase().includes(search) ||
        formatNameByHocVi({ hocVi: item.hocVi, name: item.hoTen })
          .toLowerCase()
          .includes(search) ||
        item.soDienThoai.toLowerCase().includes(search) ||
        item.hocVi.toLowerCase().includes(search) ||
        item.taiKhoan.tenDangNhap.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    } else {
      return (
        (item.maGiaoVien.toLowerCase().includes(search) ||
          formatNameByHocVi({ hocVi: item.hocVi, name: item.hoTen })
            .toLowerCase()
            .includes(search) ||
          item.soDienThoai.toLowerCase().includes(search) ||
          item.hocVi.toLowerCase().includes(search) ||
          item.taiKhoan.tenDangNhap.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)) &&
        item.khoa.maKhoa == valSelect
      );
    }
  });

  return [...arrUpdate];
};

const initialState = {
  arrGiaoVien: [],
  arrGiaoVienSearch: [],
  detailGiaoVien: {},
  valueSearch: "",
  valueSelect: "-1",
};

const giaoVienReducer = createSlice({
  name: "giaoVienReducer",
  initialState,
  reducers: {
    setArrGiaoVienAction: (state, action) => {
      state.arrGiaoVien = action.payload;
      state.arrGiaoVienSearch = action.payload;
    },
    setValueSearchGiaoVien: (state, action) => {
      state.valueSearch = action.payload;

      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        action.payload,
        valueSelect
      );
    },
    setValueSelectGiaoVien: (state, action) => {
      state.valueSelect = action.payload;

      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        valueSearch,
        action.payload
      );
    },
    insertGiaoVienAction: (state, action) => {
      let giaoVien = action.payload;

      state.arrGiaoVien.push(giaoVien);

      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        valueSearch,
        valueSelect
      );
    },
    updateGiaoVienAction: (state, action) => {
      let objGiaoVien = action.payload;

      let rowToChange = state.arrGiaoVien.findIndex((item) => {
        return item.maGiaoVien == objGiaoVien.maGiaoVien;
      });

      state.arrGiaoVien[rowToChange] = objGiaoVien;

      //
      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        valueSearch,
        valueSelect
      );
    },
    deleteGiaoVienAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrGiaoVien.filter((item) => {
        return item.maGiaoVien !== maXoa;
      });

      state.arrGiaoVien = [...arrUpdate];

      //
      let { arrGiaoVien, valueSearch, valueSelect } = state;
      state.arrGiaoVienSearch = dataSearch(
        arrGiaoVien,
        valueSearch,
        valueSelect
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrGiaoVienAction,
  setValueSelectGiaoVien,
  setValueSearchGiaoVien,
  insertGiaoVienAction,
  updateGiaoVienAction,
  deleteGiaoVienAction,
} = giaoVienReducer.actions;
export default giaoVienReducer.reducer;

// -------------- Call API ---------------
/**
 * Del 1 giao vien theo id
 * @param {*} giaoVien
 * @returns
 */
export const deleteGiaoVienApi = (maXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaGiaoVien/${maXoa}`);

      dispatch(deleteGiaoVienAction(maXoa));

      dispatch(getAllKhoaApi);
    } catch (error) {
      console.log(
        "🚀 ~ file: giaoVienReducer.jsx:131 ~ return ~ error:",
        error
      );
    }
  };
};

/**
 * update 1 Giao vien
 */
export const updateGiaoVienApi = (giaoVien) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuGiaoVien", giaoVien);
      console.log("dang dung api add - chua  co update");

      dispatch(updateGiaoVienAction(result.data));

      history.push("/quan-ly/giao-vien");
    } catch (error) {
      console.log(
        "🚀 ~ file: giaoVienReducer.jsx:106 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * add 1 Giao Vien
 */
export const insertGiaoVienApi = (giaoVien) => {
  return async (dispatch) => {
    try {
      let resultAddTaiKhoan = await http.post(
        "/them_tai_khoan",
        giaoVien.taiKhoan
      );

      let result = await http.post("/LuuGiaoVien", giaoVien);

      dispatch(insertTaiKhoanAction(resultAddTaiKhoan.data));
      dispatch(insertGiaoVienAction(result.data));

      alert(
        `Tạo thành công giao viên ${giaoVien.hoTen} với tài khoản: ${giaoVien.taiKhoan.tenDangNhap}, mật khẩu: ${giaoVien.taiKhoan.matKhau}`
      );

      dispatch(getAllKhoaApi);

      history.push("/quan-ly/giao-vien");
    } catch (error) {
      console.log(
        "🚀 ~ file: giaoVienReducer.jsx:93 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * Get all Api
 * @param {*} dispatch
 */
export const getAllGiaoVienApi = async (dispatch) => {
  try {
    const result = await http.get("/DSGiaoVien");
    dispatch(setArrGiaoVienAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: giaoVienReducer.jsx:38 ~ getAllGiaoVienApi ~ error:",
      error
    );
  }
};
