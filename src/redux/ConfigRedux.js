import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./reducers/numberReducer";
import monHocReducer from "./reducers/monHocReducer";
import thietBiReducer from "./reducers/thietBiReducer";
import nhanVienReducer from "./reducers/nhanVienReducer";
import khoaReducer from "./reducers/khoaReducer";
import giaoVienReducer from "./reducers/giaoVienReducer";
import taiKhoanReducer from "./reducers/taiKhoanReducer";
import userReducer from "./reducers/userReducer";
import toaNhaReducer from "./reducers/toaNhaReducer";
import tangReducer from "./reducers/tangReducer";

export const store = configureStore({
    reducer: {
      tangReducer:tangReducer,
      toaNhaReducer:toaNhaReducer,
      userReducer:userReducer,
      taiKhoanReducer:taiKhoanReducer,
      giaoVienReducer:giaoVienReducer,
      khoaReducer:khoaReducer,
      nhanVienReducer:nhanVienReducer,
      number: numberReducer,
      monHocReducer: monHocReducer,
      thietBiReducer:thietBiReducer,
    },
  });