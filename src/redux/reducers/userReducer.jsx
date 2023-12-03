//rxslice

import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  clearLocalStorage,
  getStoreJSON,
  http,
  setCookie,
  setStore,
  setStoreJSON,
} from "../../util/config";
import { history } from "../..";

const initialState = {
  // userLogin: {
  //     email: '',
  //     accessToken: ''
  // },
  userLogin: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserLoginAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setUserLoginAction } = userReducer.actions;
export default userReducer.reducer;

export const getDangNhapApi = (userLogin, ckbRemeber) => {
  // userLogin = { username: '', password: '', }

  let user = {
    tenDangNhap: userLogin.username,
    matKhau: userLogin.password,
  };
  return async (dispatch) => {
    try {
      let result = await http.post("/DangNhap", user);

      //   setStore(ACCESS_TOKEN, result.data.content.accessToken);
      //   setCookie(result.data.content.accessToken, 30, ACCESS_TOKEN);

      // luu lai username - token

      let { maTK, tenDangNhap, quyen } = result.data;
      let resultUser = {};
      let userLogin = { maTK, tenDangNhap, quyen };
      if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
        resultUser = await http.get(`/GiaoVien/${maTK}`);
        userLogin = { ...userLogin, name: resultUser.data.hoTen };
      } else {
        resultUser = await http.get(`/NhanVien/${maTK}`);
        userLogin = { ...userLogin, name: resultUser.data.tenNV };
      }

      if (ckbRemeber) {
        setStoreJSON(USER_LOGIN, userLogin);
      }

      // dua len reducer
      const action = setUserLoginAction(resultUser.data);
      // const action = setUserLoginAction({});
      dispatch(action);

      history.push("/home");
    } catch (error) {
      console.log(
        "🚀 ~ file: userReducer.jsx:31 ~ returnasync ~ error:",
        error
      );

      // console.log(error.request.responseText)

      alert("Đăng nhập không thành công. Sai thông tin");
      history.push("/login");
    }
  };
};

export const getUserLoginApi = (userStore) => {
  return async (dispatch) => {
    try {
      let { maTK, quyen } = userStore;
      let resultUser = {};

      if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
        resultUser = await http.get(`/GiaoVien/${maTK}`);
      } else {
        resultUser = await http.get(`/NhanVien/${maTK}`);
      }

      const action = setUserLoginAction(resultUser.data);
      dispatch(action);
    } catch (error) {
      console.log("🚀 ~ file: userReducer.jsx:99 ~ return ~ error:", error);

      alert("Đăng nhập không thành công, vui lòng thử lại!");

      history.push("/login");
    }
  };
};

export const eventLogout = () => {
  return async (dispatch) => {
    clearLocalStorage(USER_LOGIN);

    dispatch(setUserLoginAction({}));
  };
};
