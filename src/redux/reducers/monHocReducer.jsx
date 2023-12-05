//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, formatStringDate3, http } from "../../util/config";
import Database from "../../util/database/Database";
import { insert } from "formik";
import { history } from "../..";

// function
const funcSearch = ({ arrMonHoc, valueTxtSearch, valueSelect }) => {
  return searchData(arrMonHoc, valueTxtSearch, valueSelect);
};
/**
 *
 * @param {list data gốc} arrData
 * @param {text search dang co} valSearch
 * @param {value select dang chon} valSelect
 * @returns
 */
const searchData = (arrData, valSearch, valSelect) => {
  let textSearch = valSearch.trim().toLowerCase();

  // search - text
  let arrUpdate = arrData.filter((item) => {
    let ngayBD = new Date(item.ngayBatDau);
    let ngayKT = new Date(item.ngayBatDau);
    ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

    return (
      (item.maMon + "").toLowerCase().includes(textSearch) ||
      item.tenMon.toLowerCase().includes(textSearch) ||
      // item.ngayBatDau.toLowerCase().includes(textSearch)  ||
      (item.soBuoi + "").toLowerCase().includes(textSearch) ||
      formatStringDate3(ngayBD).toLowerCase().includes(textSearch) ||
      formatStringDate3(ngayKT).toLowerCase().includes(textSearch)
    );
  });

  // search -- select
  let day = new Date();

  if (valSelect == 1) {
    // Kết thúc
    arrUpdate = arrUpdate.filter((item) => {
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

      return ngayKT < day;
    });
  } else if (valSelect == 2) {
    // Chờ mở lớp
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);

      return ngayBD > day;
    });
  } else if (valSelect == 3) {
    // Đang học
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + (item.soBuoi + 1) * 7);

      return ngayBD < day && ngayKT > day;
    });
  }

  return [...arrUpdate];
};

const initialState = {
  arrMonHoc: [],
  arrMonHocSearch: [],
  arrPhanmemUpdate: [],
  detailMonHoc: {},
  valueTxtSearch: "",
  valueSelect: -1,
};

const monHocReducer = createSlice({
  name: "monHocReducer",
  initialState,
  reducers: {
    setArrPhanmemUpdateAction: (state, action) => {
      state.arrPhanmemUpdate = action.payload;
    },
    setValueTxtSearchAction: (state, action) => {
      state.valueTxtSearch = action.payload;

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    setValueSelectAction: (state, action) => {
      state.valueSelect = action.payload;

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    setArrMonHocAction: (state, action) => {
      state.arrMonHoc = action.payload;
      //
      state.arrMonHocSearch = funcSearch(state);
    },
    insertMonHocAction: (state, action) => {
      let item = action.payload;
      state.arrMonHoc.push(item);

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    updateMOnhocAction: (state, action) => {
      let object = action.payload;

      let rowToChange = state.arrMonHoc.findIndex(
        (item) => item.maMon === object.maMon
      );
      state.arrMonHoc[rowToChange] = object;

      //
      state.arrMonHocSearch = funcSearch(state);
    },
    deleteMonHocAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrMonHoc.filter((item) => {
        return item.maMon !== maXoa;
      });

      state.arrMonHoc = [...arrUpdate];
      //
      state.arrMonHocSearch = funcSearch(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrMonHocAction,
  setArrPhanmemUpdateAction,
  setValueSelectAction,
  setValueTxtSearchAction,
  insertMonHocAction,
  updateMOnhocAction,
  deleteMonHocAction,
} = monHocReducer.actions;
export default monHocReducer.reducer;

// -------------- Call Api -----------------
export const deleteMonHocApi = (maMon) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaMonHoc/${maMon}`);

      dispatch(deleteMonHocAction(maMon));
    } catch (error) {
      console.log("🚀 ~ file: monHocReducer.jsx:141 ~ return ~ error:", error);
    }
  };
};
//
export const updateMonHocApi = (monHoc, arrPhanMem) => {
  let { maMon, tenMon, ngayBatDau, soBuoi, phanMems, dsCaThucHanh } = monHoc;
  return async (dispatch) => {
    try {
      let objMonHoc = {
        maMon,
        tenMon,
        ngayBatDau,
        soBuoi,
        dsCaThucHanh,
      };
      let result = await http.post("/LuuMonHoc", objMonHoc);

      //
      arrPhanMem.forEach(async (item) => {
        let rowCheck = phanMems.findIndex(
          (e) => e.maPhanMem === item.maPhanMem
        );

        if (rowCheck >= 0) {
          let objMonHocPhanMem = {
            phanMem: item,
            monHoc: objMonHoc,
          };
          await http.post("/LuuMonHocPhanMem", objMonHocPhanMem);
        } else {
          //@DeleteMapping("/XoaMonHocPhanMem/{maMon}/{maPhanMem}")
          await http.delete(`/XoaMonHocPhanMem/${maMon}/${item.maPhanMem}`);
        }
      });

      setTimeout(() => {
        dispatch(updateMOnhocAction(objMonHoc));

        history.push("/quan-ly/mon");
        alert("chỉnh sửa thành công.");
      }, 200);
    } catch (error) {
      console.log("🚀 ~ file: monHocReducer.jsx:129 ~ return ~ error:", error);
    }
  };
};

// ds phan mem theo ma mon hoc
export const getDSPhanmem_idMonhoc = (maMon) => {
  return async (dispatch) => {
    try {
      //@GetMapping("/DSMonHocPhanMem/{maMon}")
      let result = await http.get(`/DSMonHocPhanMem/${maMon}`);

      let arrPhanmemUpdate = [];

      result.data.forEach((item) => {
        console.log(
          "🚀 ~ file: monHocReducer.jsx:133 ~ result.data.forEach ~ item:",
          item
        );
        arrPhanmemUpdate.push(item.phanMem);
      });

      dispatch(setArrPhanmemUpdateAction([...arrPhanmemUpdate]));
    } catch (error) {
      console.log("🚀 ~ file: monHocReducer.jsx:123 ~ error:", error);
    }
  };
};
/**
 * addd 1 mon hoc
 * @param {Object} monHoc
 * @returns
 */
export const insertMonHocApi = (monHoc) => {
  let { tenMon, ngayBatDau, soBuoi, phanMems } = monHoc;
  let objMonHoc = {
    tenMon,
    ngayBatDau,
    soBuoi,
  };
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuMonHoc", objMonHoc);

      let objDataNew = result.data;

      phanMems.forEach(async (item) => {
        let objMonHocPhanMem = {
          phanMem: item,
          monHoc: objDataNew,
        };
        await http.post("/LuuMonHocPhanMem", objMonHocPhanMem);
      });

      setTimeout(() => {
        alert("Tạo thành công!");
        dispatch(getAllMonHoc);
        history.push("/quan-ly/mon");
      }, 1000);
    } catch (error) {
      console.log(
        "🚀 ~ file: monHocReducer.jsx:123 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * get all ds mon hoc
 * @param {*} dispatch
 */
export const getAllMonHoc = async (dispatch) => {
  // call Api
  try {
    let result_dsMonHoc = await http.get("/DSMonHoc");
    let arrData_MH = [];
    result_dsMonHoc.data.forEach(async (item) => {
      let result_CaTH_IdMonHoc = await http.get(
        `/DSCaThucHanhTheoMonHoc/${item.maMon}`
      );

      arrData_MH.push({ ...item, dsCaThucHanh: result_CaTH_IdMonHoc.data });
    });

    //
    setTimeout(() => {
      const action = setArrMonHocAction([...arrData_MH]);
      dispatch(action);
    }, 500);
  } catch (error) {
    console.log(
      "🚀 ~ file: monHocReducer.jsx:37 ~ getAllMonHoc ~ error:",
      error
    );
  }
};
