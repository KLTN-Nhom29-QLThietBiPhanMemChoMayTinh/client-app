//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import { formatToaNhaAndTang } from "../../util/formatString";
import { history } from "../..";
import { setStatusDataMoi } from "./homeReducer";
import { getAllPhongMayApi } from "./phongMayReducer";

const initialState = {
  arrMayTinh: [],
  arrMayTinhSearch: [],
  valueSearch: "",
  valueSelToaNha: "-1",
  valueSelTang: "-1",
  valueSelPhongMay: "-1",
  valueSelTrangThai: "-1",
};

const mayTinhReducer = createSlice({
  name: "mayTinhReducer",
  initialState,
  reducers: {
    setArrMayTinhAction: (state, action) => {
      state.arrMayTinh = action.payload;
      state.arrMayTinhSearch = action.payload;
    },
    setValueSearchMayTinhAction: (state, action) => {
      state.valueSearch = action.payload;

      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        action.payload,
        valueSelToaNha,
        valueSelTang,
        valueSelPhongMay,
        valueSelTrangThai
      );
    },
    setvalueSelToaNha_MayTinhAction: (state, action) => {
      state.valueSelToaNha = action.payload;
      state.valueSelTang = -1;
      state.valueSelPhongMay = -1;
      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        valueSearch,
        action.payload,
        valueSelTang,
        valueSelPhongMay,
        valueSelTrangThai
      );
    },
    setvalueSelTang_MayTinhAction: (state, action) => {
      state.valueSelTang = action.payload;
      state.valueSelPhongMay = -1;

      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        valueSearch,
        valueSelToaNha,
        action.payload,
        valueSelPhongMay,
        valueSelTrangThai
      );
    },
    setvalueSelPhongMay_MayTinhAction: (state, action) => {
      state.valueSelPhongMay = action.payload;

      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        valueSearch,
        valueSelToaNha,
        valueSelTang,
        action.payload,
        valueSelTrangThai
      );
    },
    setvalueSelTrangThai_MayTinhAction: (state, action) => {
      state.valueSelTrangThai = action.payload;

      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        valueSearch,
        valueSelToaNha,
        valueSelTang,
        valueSelPhongMay,
        action.payload
      );
    },
    insertMayTinhAction: (state, action) => {
      let objNew = action.payload;

      state.arrMayTinh.push(objNew);
      //
      let {
        arrMayTinh,
        valueSearch,
        valueSelPhongMay,
        valueSelTang,
        valueSelToaNha,
        valueSelTrangThai,
      } = state;

      state.arrMayTinhSearch = dataSearch(
        arrMayTinh,
        valueSearch,
        valueSelToaNha,
        valueSelTang,
        valueSelPhongMay,
        valueSelTrangThai
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrMayTinhAction,
  setValueSearchMayTinhAction,
  setvalueSelToaNha_MayTinhAction,
  setvalueSelTang_MayTinhAction,
  setvalueSelPhongMay_MayTinhAction,
  setvalueSelTrangThai_MayTinhAction,
  insertMayTinhAction,
} = mayTinhReducer.actions;
export default mayTinhReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 *
 * @param {* data ccần tìm} arrData
 * @param {* data search ở text} valSearch
 * @param {* data select toaNha} valSelect1
 * @param {* data select tang} valSelect2
 * @param {* data select phong may} valSelect3
 * @param {* data select Trangj thai} valSelect4
 */
const dataSearch = (
  arrData,
  valSearch,
  valSelect1,
  valSelect2,
  valSelect3,
  valSelect4
) => {
  let search = valSearch.toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    let ngaySD = new Date(item.ngayLapDat);
    return (
      (item.thietBiMays.length + "").toLowerCase().includes(search) ||
      item.moTa.toLowerCase().includes(search) ||
      item.phongMay.tenPhong.toLowerCase().includes(search) ||
      item.phongMay.tang.tenTang.toLowerCase().includes(search) ||
      item.phongMay.tang.toaNha.tenToaNha.toLowerCase().includes(search) ||
      formatToaNhaAndTang(item.phongMay.tang).toLowerCase().includes(search) ||
      formatStringDate(ngaySD).toLowerCase().includes(search)
    );
  });

  // 1
  if (valSelect1 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.phongMay.tang.toaNha.maToaNha == valSelect1;
    });
  }

  // 2
  if (valSelect2 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.phongMay.tang.maTang == valSelect2;
    });
  }
  // 3
  if (valSelect3 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.phongMay.maPhong == valSelect3;
    });
  }

  // 3
  if (valSelect4 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.trangThai.toLowerCase().includes(valSelect4.toLowerCase());
    });
  }

  arrUpdate = sortArrDataMayTinhByTenPhong(arrUpdate);
  return [...arrUpdate];
};

// Call Api ++++++++++++++++++++++++++++++++++++++++++++++

/**
 * // tao data luu server
 * // update data - api
 * // duyet ds thiet bi
 * // trùng vs thietbis thi gui api tao moi (thiet bi va maytinh va status thietbi may)
 * // khác vs thietbis thì gui api del(thiet bi va maytinh va status thietbi may)
 * @param {(dataObj moi - dataObj cu - dsThiet bi)} param0
 * @returns
 */
export const updateMayTinhApi = ({
  objMayTinhNew,
  objData_old,
  arrThietBi,
}) => {
  let { moTa, valueSelPhongMay, thietBis, phongMay, valueSelTrangThai } =
    objMayTinhNew;

  //
  let saveMayTinh = {
    maMay: objData_old.maMay,
    moTa,
    trangThai: valueSelTrangThai,
    ngayLapDat: objData_old.ngayLapDat,
    phongMay: {
      maPhong: valueSelPhongMay,
    },
  };
  return async (dispatch) => {
    try {
      let resultSaveMayTinh = await http.post("/LuuMayTinh", saveMayTinh);
      console.log("🚀 ~ file: mayTinhReducer.jsx:273 ~ return ~ resultSaveMayTinh:", resultSaveMayTinh)

      //
      arrThietBi.forEach(async (item) => {
        let rowData = thietBis.findIndex((e) => e.maThietBi == item.maThietBi);
        if (rowData >= 0) {
          // trùng
          let saveMayTinhThietBi = {
            mayTinh: {
              maMay: objData_old.maMay,
            },
            thietBi: item,
            status: true,
          };
          //
          await http.post("/LuuMayTinhThietBi", saveMayTinhThietBi);
        } else {
          await http.delete(
            `/XoaMayTinhThietBi/${objData_old.maMay}/${item.maThietBi}`
          );
        }
      });

      dispatch(getAllMayTinhApi);
      dispatch(getAllPhongMayApi);
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/may-tinh");
    } catch (error) {
      console.log("🚀 ~ file: mayTinhReducer.jsx:248 ~ return ~ error:", error);
    }
  };
};

/**
 * add 1 may tinh
 * add list may tinh vs thiet bij
 * @param {*} mayTinh
 * @returns
 */
export const insertMayTinhApi = (mayTinh) => {
  let { moTa, valueSelPhongMay, thietBis, phongMay } = mayTinh;
  let day = new Date();

  //
  let saveMayTinh = {
    moTa,
    trangThai: "Đang hoạt động",
    ngayLapDat: day,
    phongMay: {
      maPhong: valueSelPhongMay,
    },
  };
  return async (dispatch) => {
    try {
      let resultSaveMayTinh = await http.post("/LuuMayTinh", saveMayTinh);

      let objMayTinh = resultSaveMayTinh.data;

      thietBis.forEach(async (item) => {
        let objSave = {
          mayTinh: objMayTinh,
          thietBi: item,
          status: true,
        };
        let resultMayTinhThietBI = await http.post(
          "/LuuMayTinhThietBi",
          objSave
        );
      });

      // luu len reducer

      let thietBiMays = thietBis.map((item) => {
        return { ...item, trangThaiTbi: true };
      });
      let objRedux = {
        maMay: objMayTinh.maMay,
        trangThai: objMayTinh.trangThai,
        moTa: objMayTinh.moTa,
        ngayLapDat: objMayTinh.ngayLapDat,
        phongMay,
        thietBiMays,
      };
      dispatch(insertMayTinhAction(objRedux));

      dispatch(getAllPhongMayApi);
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/may-tinh");
    } catch (error) {
      console.log(
        "🚀 ~ file: mayTinhReducer.jsx:220 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * Get all may tinh
 * @param {*} dispatch
 */
export const getAllMayTinhApi = async (dispatch) => {
  try {
    let result = await http.get("/DSMayTinh2");
    let updateData = result.data;
    updateData = sortArrDataMayTinhByTenPhong(updateData);
    dispatch(setArrMayTinhAction([...updateData]));
  } catch (error) {
    console.log(
      "🚀 ~ file: mayTinhReducer.jsx:32 ~ getAllMayTinhApi ~ error:",
      error
    );
  }
};
const sortArrDataMayTinhByTenPhong = (updateData) => {
  return updateData.sort((a, b) =>
    a.phongMay.tenPhong > b.phongMay.tenPhong
      ? 1
      : b.phongMay.tenPhong > a.phongMay.tenPhong
      ? -1
      : 0
  );
};
