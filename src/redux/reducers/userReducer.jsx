//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, USER_LOGIN, getStoreJSON, http, setCookie, setStore, setStoreJSON } from "../../util/config";
import { history } from "../..";

const initialState = {
    // userLogin: {
  //     email: '',
  //     accessToken: ''
  // },
  userLogin: getStoreJSON(USER_LOGIN),
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

export const getDangNhapApi = (userLogin) => {
  // userLogin = { username: '', password: '', }

  let user = {
    tenDangNhap:userLogin.username,
    matKhau:userLogin.password
  }
  return async (dispatch) => {
    try {
      let result = await http.post("/DangNhap", user);

      //   setStore(ACCESS_TOKEN, result.data.content.accessToken);
    //   setCookie(result.data.content.accessToken, 30, ACCESS_TOKEN);

    // luu lai username - token
    let{quyen, tenDangNhap} = result.data
    setStoreJSON(USER_LOGIN, {quyen, tenDangNhap});

    // dua len reducer
    const action = setUserLoginAction(result.data);
    dispatch(action);

    history.push("/home");
    } catch (error) {
      console.log(
        "🚀 ~ file: userReducer.jsx:31 ~ returnasync ~ error:",
        error
      );

      alert("Đăng nhập không thành công. Sai thông tin");
      history.push("/login");
    }
  };
};
