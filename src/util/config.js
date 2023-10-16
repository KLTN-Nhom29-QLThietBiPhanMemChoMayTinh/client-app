import axios from "axios";
import { history } from "..";


// luu data ra local storage
export const configs = {
  setStore: (name, value) => {
    localStorage.setItem(name, value);
  },
  getStore: (name) => {
    return localStorage.getItem(name);
  },
  /**
   * bien doi sang jSON truoc khi luu vao Storage
   */
  setStoreJSON: (name, value) => {
    // bien doi  thanh chuoi
    let value1 = JSON.stringify(value);

    // luu vao store
    localStorage.setItem(name, value1);
  },
  /**
   * lay data tu Storage
   */
  getStoreJSON: (name) => {
    if (localStorage.getItem(name)) {
      let content = JSON.parse(localStorage.getItem(name));

      return content;
    }
    return null;
  },
  /**
   * luu theo cookie
   * @param {*} value
   * @param {*} days
   * @param {*} name
   */
  setCookie: (value, days = 30, name ) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  /**
   * lay data theo cookie
   * @param {*} name
   * @returns
   */
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  clearCookie: (name) => {
    setCookie('',-1, name)
  },
  clearLocalStorage: (name) => {
    localStorage.removeItem(name);
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN:'userLogin'
};

export const {
  setCookie,
  setStore,
  setStoreJSON,
  getCookie,
  getStore,
  getStoreJSON,
  clearCookie,
  clearLocalStorage,
  ACCESS_TOKEN,
  USER_LOGIN,
} = configs;



// cấu hình  interceptor (Cau hình cho các  request và response) 
const TOKEN_CYBERSOFT = 'z123456';

export const http = axios.create({
  baseURL:`https://shop.cyberlearn.vn/api`,
  timeout:6000// thoi gian duy tri 600s
})

// cấu hình request 
http.interceptors.request.use((configs) => {

  // cau hinh header  add them  thuoc tinh  Authorization
  configs.headers = {...configs.headers, 
    ['Authorization'] : `Bearer ${getStore(ACCESS_TOKEN)}`,
    ['TokenCybersoft'] : TOKEN_CYBERSOFT
  }

  return configs;

}, (err) => {
  // cau hinh err 
  return Promise.reject(err);
})

/*
  statusCode: ma ket qua tra ve do backEnd quy dinh
  200(Success): thanh cong
  201(created) : tao gia tri thanh cong  tren server ( thuong dung 200)
  400(Bad Request): khongo ton tai duong dan
  404(Not Found): khongo tim thay du lieu
  401(UnAuthorrize): Khong co quyen truy cap
  403(ForBiden): token chua du quyen truy cap
  500(Error in server) : loi say ra tren server (Nguyeen nhan do fontend hoac backEnd tuy tinh huong) 
*/

http.interceptors.response.use((response) => {
  // console.log("🚀 ~ file: config.js:120 ~ http.interceptors.response.use ~ response:", response)

  return response;
},err => {
  let statusCode = err.response.status;
  console.log(statusCode);
  
  // console.log(err);
  if (statusCode === 400 || statusCode === 404) {
     
    history.push('/')
  }
  if (statusCode === 401 || statusCode === 403) {
    alert('Token không hợp lệ! Vui lòng đăng nhập lại!')
    history.push('/login')
  }


  return Promise.reject(err);
})
