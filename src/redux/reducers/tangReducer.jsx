//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { history } from "../..";
import { getAllToaNhaApi } from "./toaNhaReducer";
import { setStatusDataMoi } from "./homeReducer";

const initialState = {
  arrTang: [],
  arrTangSearch: [],
  arrTangByLichTruc: [], //arrTang dung ở form LichTruc
  valueSearch: "",
  valueSelect: "",
};

const tangReducer = createSlice({
  name: "tangReducer",
  initialState,
  reducers: {
    setArrTangAction: (state, action) => {
      state.arrTang = action.payload;
      state.arrTangSearch = action.payload;
    },
    setArrTangByLichTrucAction: (state, action) => {
      state.arrTangByLichTruc = action.payload;
    },
    setValueSearchTangAction: (state, action) => {
      state.valueSearch = action.payload;

      let { arrTang, valueSelect } = state;

      state.arrTangSearch = dataSearch(arrTang, action.payload, valueSelect);
    },
    setValueSelectTangAction: (state, action) => {
      state.valueSelect = action.payload;

      let { arrTang, valueSearch } = state;

      state.arrTangSearch = dataSearch(arrTang, valueSearch, action.payload);
    },
    insertTangAction: (state, action) => {
      let objTang = action.payload;

      let arrUpdate = state.arrTang;
      arrUpdate.push({ ...objTang, soPhong: 0 });
      state.arrTang = [...arrUpdate];
      state.arrTangSearch = [...arrUpdate];
      state.arrTangByLichTruc = [...arrUpdate];
    },
    updateTangApiAction: (state, action) => {
      let objTangNew = action.payload;

      let rowToChange1 = state.arrTang.findIndex((item) => {
        return item.maTang == objTangNew.maTang;
      });

      let rowToChange2 = state.arrTangSearch.findIndex((item) => {
        return item.maTang == objTangNew.maTang;
      });

      state.arrTang[rowToChange1] = objTangNew;
      state.arrTangSearch[rowToChange2] = objTangNew;
      state.arrTangByLichTruc = [...state.arrTang];
    },
    deleteTangAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrTang.filter((item) => {
        return item.maTang !== maXoa;
      });
      state.arrTang = [...arrUpdate];
      state.arrTangSearch = [...arrUpdate];
      state.arrTangByLichTruc = [...arrUpdate];
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTangAction,
  setArrTangByLichTrucAction,
  setValueSearchTangAction,
  setValueSelectTangAction,
  insertTangAction,
  updateTangApiAction,
  deleteTangAction,
} = tangReducer.actions;
export default tangReducer.reducer;

// function
const dataSearch = (arrData, valSearch, valSelect) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = arrData.filter((item) => {
    if (valSelect == -1 || valSelect.length === 0) {
      return (
        (item.maTang + "").toLowerCase().includes(search) ||
        item.tenTang.toLowerCase().includes(search) ||
        (item.soPhong + "").toLowerCase().includes(search)
      );
    }
    return (
      ((item.maTang + "").toLowerCase().includes(search) ||
        item.tenTang.toLowerCase().includes(search) ||
        (item.soPhong + "").toLowerCase().includes(search)) &&
      item.toaNha.maToaNha == valSelect
    );
  });

  return [...arrUpdate];
};

// Call Api ========================================

/**
 * xoa tnag theo id - maXoa
 * @param {*} maXoa
 * @returns
 */
export const deleteTangApi = (maXoa) => {
  return async (dispatch) => {
    try {
      await http.delete(`/XoaTang/${maXoa}`);

      dispatch(deleteTangAction(maXoa));
      dispatch(getAllToaNhaApi);
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/tang");
    } catch (error) {
      console.log(
        "🚀 ~ file: tangReducer.jsx:106 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * update Tang theo Api
 * @param {} objTang
 * @returns
 */
export const updateTangApi = (objTang) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/LuuTang", objTang);
      console.log("Chua co Api Update");

      dispatch(updateTangApiAction(objTang));
      dispatch(getAllToaNhaApi);
      history.push("/quan-ly/tang");
      dispatch(setStatusDataMoi(true));
    } catch (error) {
      console.log(
        "🚀 ~ file: tangReducer.jsx:90 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * insert 1 Tang
 * @param {} objTang
 * @returns
 */
export const insertTangApi = (objTang) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/LuuTang", objTang);

      dispatch(insertTangAction(result.data));
      dispatch(getAllToaNhaApi);
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/tang");
    } catch (error) {
      console.log(
        "🚀 ~ file: tangReducer.jsx:79 ~ returnasync ~ error:",
        error
      );
    }
  };
};
//
export const getAllTangApi = async (dispatch) => {
  try {
    const result = await http.get("/DSTang");
    let resultPhong = await http.get("/DSPhongMay");

    let dataUpdate = result.data.map((item, index) => {
      let soPhong = 0;
      resultPhong.data.forEach((itemPhong) => {
        if (itemPhong.tang.maTang === item.maTang) {
          soPhong++;
        }
      });
      return { ...item, soPhong };
    });

    dispatch(setArrTangAction(dataUpdate));
  } catch (error) {
    console.log(
      "🚀 ~ file: tangReducer.jsx:30 ~ getAllTangApi ~ error:",
      error
    );
  }
};


//
export const getAllTangbyIdToaNha = (idToaNha) => {
  return async (dispatch) => {
    try {
      console.log("can api tang theo ma toa nha owr day");
      const result = await http.get("/DSTang");

      // dispatch(setArrTangByLichTrucAction(result.data));
      //

      //
      const arrTang = result.data.filter((item) => {
        return item.toaNha.maToaNha == idToaNha;
      });

      dispatch(setArrTangByLichTrucAction([...arrTang]));
    } catch (error) {
      console.log(
        "🚀 ~ file: tangReducer.jsx:44 ~ returnasync ~ error:",
        error
      );
    }
  };
};
