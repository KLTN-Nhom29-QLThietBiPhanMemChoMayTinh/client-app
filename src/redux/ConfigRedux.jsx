// import productReducer from "./reducers/productReducer";
import { createStore, combineReducers } from "redux";
import { ReducerKhuVuc } from "./reducers/ReducerKhuVuc";

const rootReducer = combineReducers({
    // Nơi chứa các state của ứng dụng
    reducerKhuVuc:ReducerKhuVuc,
    
})

export const store  = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // de co the xem redux tren gg chorme
);