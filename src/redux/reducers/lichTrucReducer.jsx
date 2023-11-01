//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import Database from "../../util/database/Database";
import { history } from "../..";

const initialState = {
  arrLichTruc: [],
};

const lichTrucReducer = createSlice({
  name: "lichTrucReducer",
  initialState,
  reducers: {
    setArrLichTrucAction: (state, action) => {
      state.arrLichTruc = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrLichTrucAction } = lichTrucReducer.actions;
export default lichTrucReducer.reducer;

// CALL APi ==================================
export const getAllLichTruc = async (dispatch) => {
  try {
    // let result = await http.get("DSlichTruc");
    // dispatch(setArrLichTrucAction(result.data));

    dispatch(setArrLichTrucAction(Database.datalichTruc));
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
