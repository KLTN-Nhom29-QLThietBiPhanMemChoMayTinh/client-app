//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { history } from "../..";

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  // TH theo search
  let search = valSearch.trim().toLowerCase();
  let arrUpdate = [];
  if (valSelect != -1) {
    arrUpdate = arrData.filter((item) => {
      return (
        (item.maTK.toLowerCase().includes(search) ||
          item.tenDangNhap.toLowerCase().includes(search)) &&
        item.quyen.maQuyen == valSelect
      );
    });
  } else {
    arrUpdate = arrData.filter((item) => {
      return (
        item.maTK.toLowerCase().includes(search) ||
        item.tenDangNhap.toLowerCase().includes(search)
      );
    });
  }

  //TH theo Select
  // if (valSelect !== "all") {
  //   arrUpdate = arrUpdate.filter((item) => {
  //     return item.quyenId.includes(valSelect);
  //   });
  // }

  return [...arrUpdate];
};

const initialState = {
  arrTaiKhoan: [],
  arrTaiKhoanSearch: [],
  arrQuyen: [],
  detailTaiKhoan: {},
  valueSearch: "",
  valueSelect: "-1",
  objUser: {},
};

const taiKhoanReducer = createSlice({
  name: "taiKhoanReducer",
  initialState,
  reducers: {
    serArrQuyenAction: (state, action) => {
      state.arrQuyen = action.payload;
    },
    setArrTaiKhoanAction: (state, action) => {
      state.arrTaiKhoan = action.payload;
      state.arrTaiKhoanSearch = action.payload;
    },
    setValueSearchTaiKhoan: (state, action) => {
      state.valueSearch = action.payload;

      let { arrTaiKhoan, valueSelect } = state;
      state.arrTaiKhoanSearch = dataSearch(
        arrTaiKhoan,
        action.payload,
        valueSelect
      );
    },
    setValueSelectTaiKhoan: (state, action) => {
      state.valueSelect = action.payload;

      let { arrTaiKhoan, valueSearch } = state;

      state.arrTaiKhoanSearch = dataSearch(
        arrTaiKhoan,
        valueSearch,
        action.payload
      );
    },
    insertTaiKhoanAction: (state, action) => {
      let taiKhoan = action.payload;

      state.arrTaiKhoan.push(taiKhoan);

      // let { arrTaiKhoan, valueSearch, valueSelect } = state;

      // state.arrTaiKhoanSearch = dataSearch(
      //   arrTaiKhoan,
      //   valueSearch,
      //   valueSelect
      // );
    },
    setObjUserAction: (state, action) => {
      state.objUser = action.payload;
    },
    updateTaiKhoanAction: (state, action) => {
      let objTaiKhoan = action.payload;

      let rowToChange = state.arrTaiKhoan.findIndex((item) => {
        return item.maTK === objTaiKhoan.maTK;
      });

      state.arrTaiKhoan[rowToChange] = objTaiKhoan;
      state.objUser = {...state.objUser, taiKhoan:objTaiKhoan}
      //
      let { arrTaiKhoan, valueSearch, valueSelect } = state;

      state.arrTaiKhoanSearch = dataSearch(
        arrTaiKhoan,
        valueSearch,
        valueSelect
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTaiKhoanAction,
  setValueSearchTaiKhoan,
  serArrQuyenAction,
  setValueSelectTaiKhoan,
  insertTaiKhoanAction,
  setObjUserAction,
  updateTaiKhoanAction,
} = taiKhoanReducer.actions;
export default taiKhoanReducer.reducer;

// -------------- Call API ---------------

export const deleteTaiKhoanApi= (maTk) => {
  return async (dispatch) => {
    try {
      
    } catch (error) {
      console.log("🚀 ~ file: taiKhoanReducer.jsx:136 ~ return ~ error:", error)
      
    }
  }
}

/**
 * update taiKhoan
 * @param {*} taiKhoan
 * @returns
 */
export const updateTaiKhoan2 = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/them_tai_khoan", taiKhoan);
      console.log('Chua co api update taikhoan -- dang dung themTaiKhoan');
      dispatch(updateTaiKhoanAction(taiKhoan));

      alert('Thay đổi thành công!')
    } catch (error) {
      console.log(
        "🚀 ~ file: taiKhoanReducer.jsx:121 ~ return ~ error:",
        error
      );
      alert('Thay đổi thất bại thành công!')
      history('/quan-ly/tai-khoan')
    }
  };
};

/**
 * get 1 user theo id
 */
export const getUserbyIdApi = (taiKhoan) => {
  let { maTK, quyen } = taiKhoan;
  return async (dispatch) => {
    try {
      let resultUser = {};
      if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
        resultUser = await http.get(`/GiaoVien/${maTK}`);
      } else {
        resultUser = await http.get(`/NhanVien/${maTK}`);
      }

      dispatch(setObjUserAction(resultUser.data));
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * add 1 tai khoan
 * @param {*} taiKhoan
 * @returns
 */
export const insertTaiKhoanApi = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/them_tai_khoan", taiKhoan);
      dispatch(insertTaiKhoanAction(result.data));
    } catch (error) {
      console.log("🚀 ~ file: taiKhoanReducer.jsx:89 ~ return ~ error:", error);
    }
  };
};
/**
 * get All api
 *
 * @param {*} dispatch
 */
export const getAllTaiKhoanApi = async (dispatch) => {
  try {
    const result = await http.get("/DSTaiKhoan");
    dispatch(setArrTaiKhoanAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};

/**
 * CAll data quyền sử dụng
 */
export const getAllQuyenSDApi = async (dispatch) => {
  try {
    const result = await http.get("/DSQuyen");
    dispatch(serArrQuyenAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: taiKhoanReducer.jsx:38 ~ getAllTaiKhoanApi ~ error:",
      error
    );
  }
};

// update taiKhoan

export const updateTaiKhoan = (taiKhoan) => {
  return async (dispatch) => {
    try {
      let result = await http.put("/tai_khoan", taiKhoan);
      console.log("reducer - updateTaiKhoan() - " + result.status);
    } catch (error) {
      console.log(
        "🚀 ~ file: taiKhoanReducer.jsx:121 ~ return ~ error:",
        error
      );
    }
  };
};
