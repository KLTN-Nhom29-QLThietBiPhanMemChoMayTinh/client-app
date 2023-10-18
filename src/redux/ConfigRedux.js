import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./reducers/numberReducer";
import monHocReducer from "./reducers/monHocReducer";
import thietBiReducer from "./reducers/thietBiReducer";
import nhanVienReducer from "./reducers/nhanVienReducer";

export const store = configureStore({
    reducer: {
      nhanVienReducer:nhanVienReducer,
      number: numberReducer,
      monHocReducer: monHocReducer,
      thietBiReducer:thietBiReducer,
    },
  });