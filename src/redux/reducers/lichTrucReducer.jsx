//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";
import { history } from "../..";
import { formatDate_MM_YYYY } from "../../util/formatString";

//
const funcSearch = (objData) => {
  let { arrLichTruc, valueSearch } = objData;

  return dataSearch(arrLichTruc, valueSearch);
};

const dataSearch = (arrData, valSearch) => {
  let search = valSearch.trim().toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    let strCaTruc = `${item.thoiGianBatDau}h - ${item.thoiGianKetThuc}h`;

    return (
      formatDate_MM_YYYY(item.ngayTruc).toLowerCase().includes(search) ||
      strCaTruc.toLowerCase().includes(search) ||
      `${item.thoiGianBatDau}h`.toLowerCase().includes(search) ||
      `${item.thoiGianKetThuc}h`.toLowerCase().includes(search) ||
      (item.soNgayNghi + "").toLowerCase().includes(search) ||
      item.nhanVien.tenNV.toLowerCase().includes(search) ||
      item.nhanVien.sDT.toLowerCase().includes(search) ||
      item.tang.tenTang.toLowerCase().includes(search) ||
      item.tang.toaNha.tenToaNha.toLowerCase().includes(search)
    );
  });
  arrUpdate.sort(compare);
  return [...arrUpdate];
};
//
const compare = (a, b) => {
  if (a.ngayTruc < b.ngayTruc) {
    return 1;
  }
  if (a.ngayTruc > b.ngayTruc) {
    return -1;
  }
  return 0;
};

const initialState = {
  arrLichTruc: [],
  arrLichTrucSearch: [],
  arrTangChuaCoLichTruc: [], //arrTang dung ở form LichTruc
  arrToaNhaByChuaCoLichTruc: [], //arrToaNha dung ở form LichTruc
  valueSearch: "",
};

const lichTrucReducer = createSlice({
  name: "lichTrucReducer",
  initialState,
  reducers: {
    setArrLichTrucAction: (state, action) => {
      state.arrLichTruc = action.payload;

      //
      state.arrLichTrucSearch = funcSearch(state);
    },
    setArrLichTrucSearchAction: (state, action) => {
      state.valueSearch = action.payload;
      //
      state.arrLichTrucSearch = funcSearch(state);
    },
    setArrTangChuaCoLichTrucAction: (state, action) => {
      state.arrTangChuaCoLichTruc = action.payload;
    },
    setArrToaNhaChuaCoLichTrucAction: (state, action) => {
      state.arrToaNhaByChuaCoLichTruc = action.payload;
    },
    insertLichTrucAction: (state, action) => {
      let item = action.payload;
      let arrUpdate = state.arrLichTruc;
      arrUpdate.push(item);
      state.arrLichTruc = arrUpdate;

      //
      state.arrLichTrucSearch = funcSearch(state);
    },
    updateLichTrucAction: (state, action) => {
      let itemEdit = action.payload;
      // rowToChange - vi tri item co cung id
      let rowToChange = state.arrLichTruc.findIndex((item) => {
        return item.maLich === itemEdit.maLich;
      });

      state.arrLichTruc[rowToChange] = itemEdit;
      //
      state.arrLichTrucSearch = funcSearch(state);
    },
    deleteLichTrucAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrLichTruc.filter((item) => {
        return item.maLich !== maXoa;
      });

      state.arrLichTruc = [...arrUpdate];
      //
      state.arrLichTrucSearch = funcSearch(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrLichTrucAction,
  setArrLichTrucSearchAction,
  setArrTangChuaCoLichTrucAction,
  setArrToaNhaChuaCoLichTrucAction,
  insertLichTrucAction,
  updateLichTrucAction,
  deleteLichTrucAction,
} = lichTrucReducer.actions;
export default lichTrucReducer.reducer;

// CALL APi ==================================

export const getAllTangByToaNhaApi = (arrtang) => {
  return (dispatch) => {
    let arrDataToaNha_z = arrtang.map((item) => {
      return item.toaNha;
    });

    const ids = arrDataToaNha_z.map(({ maToaNha }) => maToaNha);
    const filtered = arrDataToaNha_z.filter(
      ({ maToaNha }, index) => !ids.includes(maToaNha, index + 1)
    );

    dispatch(setArrTangChuaCoLichTrucAction(arrtang));
    dispatch(setArrToaNhaChuaCoLichTrucAction(filtered));
  };
};
/**
 * ds Tang chua co lich truc
 * @param {*} dispatch
 */
export const getAllTangChuaCoLichTrucApi = async (dispatch) => {
  try {
    const result = await http.get("/TangChuaCoNhanVienTrucTrongThang");

    let arrDataToaNha_z = result.data.map((item) => {
      return item.toaNha;
    });

    const ids = arrDataToaNha_z.map(({ maToaNha }) => maToaNha);
    const filtered = arrDataToaNha_z.filter(
      ({ maToaNha }, index) => !ids.includes(maToaNha, index + 1)
    );

    dispatch(setArrTangChuaCoLichTrucAction(result.data));
    dispatch(setArrToaNhaChuaCoLichTrucAction(filtered));
  } catch (error) {
    console.log("🚀 ~ file: tangReducer.jsx:44 ~ returnasync ~ error:", error);
  }
};

/**
 * del lich truc theo ma
 */
export const deleteLichTrucApi = (maXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaLichTruc/${maXoa}`);

      dispatch(deleteLichTrucAction(maXoa));
    } catch (error) {
      console.log("🚀 ~ file: lichTrucReducer.jsx:93 ~ return ~ error:", error);
    }
  };
};

//get All
export const getAllLichTruc = async (dispatch) => {
  try {
    let result = await http.get("/DSLichTruc");
    dispatch(setArrLichTrucAction(result.data));

    // dispatch(setArrLichTrucAction(Database.datalichTruc));
  } catch (error) {
    console.log(
      "🚀 ~ file: lichTrucReducer.jsx:29 ~ getAllLichTruc ~ error:",
      error
    );
  }
};

// export const getLichTrucbyId = async (id) => {
export const getLichTrucbyId = (id) => {
  let item = {};
  try {
    // let result = await http.get(`DSlichTruc/${id}`);

    const attItem = Database.datalichTruc.filter((item) => item.maLich == id);

    item = attItem[0];
  } catch (error) {
    console.log(
      "🚀 ~ file: lichTrucReducer.jsx:43 ~ getLichTrucbyId ~ error:",
      error
    );
  }

  return item;
};

// add
export const insertLichTrucApi = (lichTruc) => {
  console.log("🚀 ~ file: lichTrucReducer.jsx:214 ~ insertLichTrucApi ~ lichTruc:", lichTruc)
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuLichTruc", lichTruc);
      console.log("api OK nhung data chua okay", result);

      //
      dispatch(insertLichTrucAction(result.data));
      history.push("/phan-cong/lich-truc");
    } catch (error) {
      console.log("🚀 ~ file: lichTrucReducer.jsx:65 ~ return ~ error:", error);
    }
  };
};

// update
export const updateLichTrucApi = (lichTruc) => {
  return async (dispatch) => {
    try {
      let result = await http.post("/LuuLichTruc", lichTruc);
      //
      dispatch(updateLichTrucAction(lichTruc));

      history.push("/phan-cong/lich-truc");
    } catch (error) {
      console.log("🚀 ~ file: lichTrucReducer.jsx:88 ~ return ~ error:", error);
    }
  };
};
