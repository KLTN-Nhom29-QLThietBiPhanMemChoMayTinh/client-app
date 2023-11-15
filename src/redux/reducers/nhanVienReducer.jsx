//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";
import { insertTaiKhoanAction } from "./taiKhoanReducer";
import { history } from "../..";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = [];
  if (valSelect != -1) {
    arrUpdate = arrData.filter((item) => {
      return (
        (item.maNV.toLowerCase().includes(search) ||
          item.tenNV.toLowerCase().includes(search) ||
          item.sDT.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)) &&
        item.chucVu.maCV == valSelect
      );
    });
  } else {
    arrUpdate = arrData.filter((item) => {
      return (
        item.maNV.toLowerCase().includes(search) ||
        item.tenNV.toLowerCase().includes(search) ||
        item.sDT.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
      );
    });
  }

  return [...arrUpdate];
};

const initialState = {
  arrNhanVien: [],
  arrNhanVienSearch: [],
  detailNhanVien: {},
  valueSearch: "",
  valueSelect: "-1",
};

const nhanVienReducer = createSlice({
  name: "nhanVienReducer",
  initialState,
  reducers: {
    setArrNhanVienAction: (state, action) => {
      state.arrNhanVien = action.payload;
      state.arrNhanVienSearch = action.payload;
    },
    setValueSearchNhanVien: (state, action) => {
      state.valueSearch = action.payload;

      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        action.payload,
        valueSelect
      );
    },
    setValueSelectNhanVienAction: (state, action) => {
      state.valueSelect = action.payload;

      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        valueSearch,
        action.payload
      );
    },
    insertNhanVienAction: (state, action) => {
      let item = action.payload;
      state.arrNhanVien.push(item);

      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        valueSearch,
        valueSelect
      );
    },
    updateNhanVienAction: (state, action) => {
      let itemUpdate = action.payload;

      let rowToChange = state.arrNhanVien.findIndex((item) => {
        return item.maNV == itemUpdate.maNV;
      });

      state.arrNhanVien[rowToChange] = itemUpdate;
      //
      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        valueSearch,
        valueSelect
      );
    },
    deleteNhanVienAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrNhanVien.filter(item => {
        return item.maNV !== maXoa
      })

      state.arrNhanVien = [...arrUpdate]
      //
      let { arrNhanVien, valueSearch, valueSelect } = state;
      state.arrNhanVienSearch = dataSearch(
        arrNhanVien,
        valueSearch,
        valueSelect
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrNhanVienAction,
  setValueSelectNhanVienAction,
  setValueSearchNhanVien,
  insertNhanVienAction,
  updateNhanVienAction,
  deleteNhanVienAction
} = nhanVienReducer.actions;
export default nhanVienReducer.reducer;

// -------------- Call API ---------------

export const deleteNhanVienApi = (maXoa) => {
  return async(dispatch) =>{
    try {
      await http.delete(`/XoaNhanVien/${maXoa}`);

      dispatch(deleteNhanVienAction(maXoa));
    } catch (error) {
      console.log("🚀 ~ file: nhanVienReducer.jsx:136 ~ returnasync ~ error:", error)
      
    }
  }
}
/**
 * UPdate nhan vien 
 * @param {*} nhanVien 
 * @returns 
 */
export const updateNhanVienApi = (nhanVien) => {
  return async(dispatch) => {
    try {
      let result = await http.post("/LuuNhanVien", nhanVien);
      console.log(' dang dung api add - chua co api cho update');

      dispatch(updateNhanVienAction(result.data));

      history.push('/quan-ly/nhan-vien');
    } catch (error) {
      console.log("🚀 ~ file: nhanVienReducer.jsx:136 ~ returnasync ~ error:", error)
      
    }
  }
}

/**
 * add 1 Nhan vien
 * @param {*} nhanVien 
 * @returns 
 */
export const insertNhanVienApi = (nhanVien) => {
  return async (dispatch) => {
    try {
      let resultAddTaiKhoan = await http.post(
        "/them_tai_khoan",
        nhanVien.taiKhoan
      );

      let result = await http.post("/LuuNhanVien", nhanVien);

      dispatch(insertTaiKhoanAction(resultAddTaiKhoan.data));

      dispatch(insertNhanVienAction(result.data));

      alert(
        `Tạo thành công nhân viên ${nhanVien.tenNV} với tài khoản: ${nhanVien.taiKhoan.tenDangNhap}, mật khẩu: ${nhanVien.taiKhoan.matKhau}`
      );

      history.push("/quan-ly/nhan-vien");
    } catch (error) {
      console.log("🚀 ~ file: nhanVienReducer.jsx:88 ~ return ~ error:", error);
    }
  };
};

/**
 * get all 1 NhanVien
 * @param {*} dispatch
 */
export const getAllNhanVienApi = async (dispatch) => {
  try {
    const result = await http.get("/DSNhanVien");
    dispatch(setArrNhanVienAction(result.data));
    // dispatch(setArrNhanVienAction(Database.dataNhanVien));
  } catch (error) {
    console.log(
      "🚀 ~ file: nhanVienReducer.jsx:38 ~ getAllNhanVienApi ~ error:",
      error
    );
  }
};
