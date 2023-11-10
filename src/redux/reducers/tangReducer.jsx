//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { history } from "../..";

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
    setArrTangByLichTruc: (state, action) => {
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
    insertTangAction:  (state, action) => {
      let objTang = action.payload

      let arrUpdate = state.arrTang;
      arrUpdate.push({...objTang, soPhong:0});
      state.arrTang = [...arrUpdate]
      state.arrTangSearch = [...arrUpdate]
      state.arrTangByLichTruc = [...arrUpdate]
    }
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrTangAction,
  setArrTangByLichTruc,
  setValueSearchTangAction,
  setValueSelectTangAction,
  insertTangAction,
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

export const insertTangApi = (objTang) => {
  return async(dispatch) => {
    try {
      const result = await http.post("/LuuTang", objTang)

      dispatch(insertTangAction(result.data));

      history.push("../")
    } catch (error) {
      console.log("🚀 ~ file: tangReducer.jsx:79 ~ returnasync ~ error:", error)
      
    }
  }
}
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

      // dispatch(setArrTangByLichTruc(result.data));
      //

      //
      const arrTang = result.data.filter((item) => {
        return item.toaNha.maToaNha == idToaNha;
      });

      dispatch(setArrTangByLichTruc([...arrTang]));
    } catch (error) {
      console.log(
        "🚀 ~ file: tangReducer.jsx:44 ~ returnasync ~ error:",
        error
      );
    }
  };
};
