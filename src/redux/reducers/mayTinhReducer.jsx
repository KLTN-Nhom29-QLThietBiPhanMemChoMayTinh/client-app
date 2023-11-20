//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrMayTinh: [],
  arrMayTinhSearch: [],
  valueSearch: "",
};

const mayTinhReducer = createSlice({
  name: "mayTinhReducer",
  initialState,
  reducers: {
    setArrMayTinhAction: (state, action) => {
      state.arrMayTinh = action.payload;
      state.arrMayTinhSearch = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setArrMayTinhAction } = mayTinhReducer.actions;
export default mayTinhReducer.reducer;

// Call Api ++++++++++++++++++++++++++++++++++++++++++++++

export const getAllMayTinhApi = async (dispatch) => {
  try {
    let result = await http.get("/DSMayTinh2");

    dispatch(setArrMayTinhAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: mayTinhReducer.jsx:32 ~ getAllMayTinhApi ~ error:",
      error
    );
  }
};
