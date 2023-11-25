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
import lichTrucReducer from "./reducers/lichTrucReducer";
import homeReducer from "./reducers/homeReducer";
import phongMayReducer from "./reducers/phongMayReducer";
import phanMemReducer from "./reducers/phanMemReducer";
import chucVuReducer from "./reducers/chucVuReducer";
import mayTinhReducer from "./reducers/mayTinhReducer";
import lichThucHanhReducer from "./reducers/lichThucHanhReducer";

export const store = configureStore({
    reducer: {
      lichThucHanhReducer: lichThucHanhReducer,
      mayTinhReducer:mayTinhReducer,
      chucVuReducer:chucVuReducer,
      phanMemReducer:phanMemReducer,
      phongMayReducer:phongMayReducer,
      homeReducer:homeReducer,
      lichTrucReducer:lichTrucReducer,
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