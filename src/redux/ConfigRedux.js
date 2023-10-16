import { configureStore } from "@reduxjs/toolkit";
import numberReducer from "./reducers/numberReducer";
import monHocReducer from "./reducers/monHocReducer";

export const store = configureStore({
    reducer: {
      number: numberReducer,
      monHocReducer: monHocReducer,
    },
  });