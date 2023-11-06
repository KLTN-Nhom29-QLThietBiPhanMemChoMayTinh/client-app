//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  objThongTin: {}, // luu data nguoi dung chon
  arrToaNhaH: [], //toan bo ds Toa nha trong db
  arrTangH: [], // ds tang ma co ma Toa nha = maToaNha trong objThongTin
  arrPhongH: [], // ds Phong thuoc tang co trong objThongTin
  arrMayTinhH: [], // ds may tinh thuoc phong co trong objThongTin
};

const homeReducer = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setObjPhongFirstAction: (state, action) => {
      // state.objPhongFirst = action.payload;
      let { arrTangH, arrPhongH, mayTinhs, objThongTin } = action.payload;
      state.objThongTin = objThongTin;
      state.arrTangH = arrTangH;
      state.arrPhongH = arrPhongH;
      state.arrMayTinhH = mayTinhs;
    },
    setArrToaNhaHomeAction: (state, action) => {
      state.arrToaNhaH = action.payload;
    },
    setArrTangHomeAction: (state, action) => {
      state.arrTangH = action.payload;
    },
    setObjThongTinByToaNhaAction: (state, action) => {
      let { arrTangH, objThongTin, arrPhongH, arrMayTinh } = action.payload;

      state.objThongTin = objThongTin;
      state.arrTangH = arrTangH;
      state.arrPhongH = arrPhongH;
      state.arrMayTinhH = arrMayTinh;
    },
    setObjThongTinByTangAction: (state, action) => {
      let { objThongTin, arrPhongH, arrMayTinh } = action.payload;

      state.objThongTin = objThongTin;
      state.arrPhongH = arrPhongH;
      state.arrMayTinhH = arrMayTinh;
    },
    setObjThongTinByPhongAction: (state, action) => {
      let { objThongTin, arrMayTinh } = action.payload;

      state.objThongTin = objThongTin;
      state.arrMayTinhH = arrMayTinh;
    },
    setObjThongTinByMayAction: (state, action) => {
      let objUpdate = state.objThongTin;

      state.objThongTin =  {...objUpdate, mayTinh: action.payload};
      
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setObjPhongFirstAction,
  setArrToaNhaHomeAction,
  setArrTangHomeAction,
  setObjThongTinByToaNhaAction,
  setObjThongTinByTangAction,
  setObjThongTinByPhongAction,
  setObjThongTinByMayAction,
} = homeReducer.actions;
export default homeReducer.reducer;

/**
 * thay doi data trang home khi click ở btn detail May
 * */
export const setObjThongTinByMay = (valMay) => {
  return async(dispatch) => {
    dispatch(setObjThongTinByMayAction(valMay))
  }
} 

/**
 * thay doi data trang home khi click ở btn PhongMay
 * */
export const setObjThongTinByPhongMay = (valPhong) => {
  // valPhong = {}  data phong duoc chon
  return async (dispatch) => {
    let { maPhong, tenPhong, moTa, tang, mayTinhs } = valPhong;
    // phong: { maPhong,tenPhong,moTa},
    let objThongTin = {
      phong: { maPhong,tenPhong,moTa, soMay:mayTinhs.length},
      tang,
      mayTinh: {},
      arrPhanMem: [],
      giaoVien: {},
      nhanVien: {},
      monHoc: {},
    };

    let arrMayTinh = [];
    // arr may Tinh
    if (mayTinhs.length !== 0) {
      // gan ds may tinh vao arr
      // ds may tinh nay pha thuoc ma phong duoc chon
      arrMayTinh = mayTinhs;
    }

    //
    dispatch(
      setObjThongTinByPhongAction({
        objThongTin,
        arrMayTinh,
      })
    );
  }
}

/**
 * thay doi data trang home khi click ở btn Tang
 * */
export const setObjThongTinByTang = (valTang) => {
  // valTang = {} tang duoc chon
  return async (dispatch) => {
    // phong: { maPhong,tenPhong,moTa},
    let objThongTin = {
      phong: {},
      tang: valTang,
      mayTinh: {},
      arrPhanMem: [],
      giaoVien: {},
      nhanVien: {},
      monHoc: {},
    };
    //
    let arrPhongH = [];
    let arrMayTinh = [];

    //
    console.log("Chua co api lay list Phong theo maTang");
    let resultArrPhong = await http.get("/DSPhongMay");

    // duyet tim phong trong ds co maTang dang chonj
    arrPhongH = resultArrPhong.data.filter((item) => {
      return item.tang.maTang === objThongTin.tang.maTang;
    });

    if (arrPhongH.length !== 0) {
      let { maPhong, tenPhong, moTa, mayTinhs } = arrPhongH[0];
      // gans gtri phong dau tien vao obj gtri chon
      objThongTin = {
        ...objThongTin,
        phong: { maPhong, tenPhong, moTa, soMay:mayTinhs.length },
      };
      // arr may Tinh
      if (mayTinhs.length !== 0) {
        // gan ds may tinh vao arr
        // ds may tinh nay pha thuoc ma phong duoc chon
        arrMayTinh = mayTinhs;
      }
    }

    //
    //
    dispatch(
      setObjThongTinByTangAction({
        objThongTin,
        arrPhongH,
        arrMayTinh,
      })
    );
  };
};

/**
 * thay doi data trang home khi click ở select Toa nha
 * */
export const setObjThongTinByToaNha = (idSelect) => {
  // idSelect == maToaNha
  return async (dispatch) => {
    // phong: { maPhong,tenPhong,moTa},
    let objThongTin = {
      phong: {},
      tang: {},
      mayTinh: {},
      arrPhanMem: [],
      giaoVien: {},
      nhanVien: {},
      monHoc: {},
    };
    //
    let arrTangH = [];
    let arrPhongH = [];
    let arrMayTinh = [];
    ///
    let resultArrTang = await http.get(`/TangTheoToaNha/${idSelect}`);
    arrTangH = resultArrTang.data;
    ///

    if (arrTangH.length !== 0) {
      objThongTin = { ...objThongTin, tang: arrTangH[0] };

      //
      console.log("Chua co api lay list Phong theo maTang");
      let resultArrPhong = await http.get("/DSPhongMay");

      // duyet tim phong trong ds co maTang dang chonj
      arrPhongH = resultArrPhong.data.filter((item) => {
        return item.tang.maTang === objThongTin.tang.maTang;
      });

      if (arrPhongH.length !== 0) {
        let { maPhong, tenPhong, moTa, mayTinhs } = arrPhongH[0];
        // gans gtri phong dau tien vao obj gtri chon
        objThongTin = {
          ...objThongTin,
          phong: { maPhong, tenPhong, moTa, soMay:mayTinhs.length },
        };
        // arr may Tinh
        if (mayTinhs.length !== 0) {
          // gan ds may tinh vao arr
          // ds may tinh nay pha thuoc ma phong duoc chon
          arrMayTinh = mayTinhs;
        }
      }
    }
    //
    //
    dispatch(
      setObjThongTinByToaNhaAction({
        arrTangH,
        objThongTin,
        arrPhongH,
        arrMayTinh,
      })
    );
  };
};
/**
 * Tìm phong đầu tiên trong Data
 *  */
export const getPhongByFirst = async (dispatch) => {
  try {
    let result = await http.get("/PhongMay/2");
    let objPhongFirst = result.data;
    let { maPhong, tenPhong, moTa, tang, mayTinhs } = objPhongFirst;

    //
    let objThongTin = {
      phong: { maPhong, tenPhong, moTa, soMay:mayTinhs.length },
      tang,
      mayTinh: {},
      arrPhanMem: [],
      giaoVien: {},
      nhanVien: {},
      monHoc: {},
    };
    //
    let resultArrTang = await http.get(
      `/TangTheoToaNha/${tang.toaNha.maToaNha}`
    );
    let arrTangH = resultArrTang.data;

    //
    console.log("Chua co api lay list Phong theo maTang");
    let resultArrPhong = await http.get("/DSPhongMay");

    let arrPhongH = resultArrPhong.data.filter((item) => {
      return item.tang.maTang === tang.maTang;
    });

    dispatch(
      setObjPhongFirstAction({
        arrTangH,
        arrPhongH,
        mayTinhs,
        objThongTin,
      })
    );
    // dispatch(setArrTangHomeAction(resultTang.data));
  } catch (error) {}
};
/**
 * Lấy toàn bộ tòa nhà - api
 */
export const getAllToaNhaHomeApi = async (dispatch) => {
  try {
    let result = await http.get("/DSToaNha");
    dispatch(setArrToaNhaHomeAction(result.data));
  } catch (error) {}
};
