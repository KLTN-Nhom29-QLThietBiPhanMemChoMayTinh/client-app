import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/scss/style.scss";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Page404 from "./pages/Page404/Page404";
import PageHome2 from "./pages/PageHome/PageHome2";
import PageQlKhuVuc from "./pages/PageQuanLy/PageQlKhuVuc";
import PageQLPhongMay from "./pages/PageQuanLy/PageQLPhongMay";
import FromAddKhuVuc from "./components/layout/Add/FormAddKhuVuc";
import FormKhuVucUpdate from "./components/layout/Edit/FormKhuVucUpdate";
import { Provider } from "react-redux";
import { store } from "./redux/ConfigRedux";
import PageQLTang from "./pages/PageQuanLy/PageQLTang";
import FormAddTang from "./components/layout/Add/FormAddTang";
import FormUpdateTang from "./components/layout/Edit/FormUpdateTang";
import DetailKhuVuc from "./components/layout/Detail/DetailKhuVuc";
import FormAddPhong from "./components/layout/Add/FormAddPhong";
import FormUpdatePhong from "./components/layout/Edit/FormUpdatePhong";
import PageQLPhanMem from "./pages/PageQuanLy/PageQLPhanMem";
import PageQlMonHoc from "./pages/PageQuanLy/PageQlMonHoc";
import PageQLThietBi from "./pages/PageQuanLy/PageQLThietBi";
import PageQLNhanVien from "./pages/PageQuanLy/PageQLNhanVien";
import PageQLKhoa from "./pages/PageQuanLy/PageQLKhoa";
import PageQLGiaoVien from "./pages/PageQuanLy/PageQLGiaoVien";
import PageQLTaiKhoan from "./pages/PageQuanLy/PageQLTaiKhoan";
import PageHome from "./pages/PageHome/PageHome";
import PageLogin from "./pages/PageLogin/PageLogin";
import PageBrand from "./pages/PageBrand/PageBrand";
import PageLichTruc from "./pages/PagePhanCongLich/PageLichTruc";
import FormAddKhuVuc from "./components/layout/Add/FormAddKhuVuc";
import FormAddLichTruc from "./components/layout/Add/FormAddLichTruc";
import FormUpdateLichTruc from "./components/layout/Edit/FormUpdateLichTruc";
import PageProfile from "./pages/PageProfile/PageProfile";
import FormAddGiaoVien from "./components/layout/Add/FormAddGiaoVien";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="" element={<PageBrand />}></Route>
        <Route path="" element={<App />}>
          {/* <Route path="/" element={<PageHome2 />}>
            <Route path="/detail-khu-vuc" >
              <Route path=":id" element={<DetailKhuVuc />} ></Route>
            </Route>
          </Route> */}

          <Route path="/home" element={<PageHome />}></Route>
          <Route path="/quan-ly" element={<PageQlKhuVuc />}></Route>
          <Route path="/quan-ly/khu-vuc" element={<PageQlKhuVuc />}></Route>
          <Route
            path="/quan-ly/khu-vuc/add"
            element={<FromAddKhuVuc />}
          ></Route>
          {/* <Route path="/quan-ly/khu-vuc/update">
            <Route path=":id"  element={<FormKhuVucUpdate />} ></Route>
          </Route> */}
          <Route path="/quan-ly/khu-vuc/update" element={<FormKhuVucUpdate />}>
          </Route>
          <Route path="/quan-ly/khu-vuc/detail">
            <Route path=":id" element={<DetailKhuVuc />}></Route>
          </Route>
          <Route path="/quan-ly/tang" element={<PageQLTang />}></Route>
          <Route path="/quan-ly/tang/add" element={<FormAddTang />}></Route>
          <Route
            path="/quan-ly/tang/update"
            element={<FormUpdateTang />}
          ></Route>
          <Route path="/quan-ly/tang/detail">
            <Route path=":id" element={<DetailKhuVuc />}></Route>
          </Route>
          <Route path="/quan-ly/phong" element={<PageQLPhongMay />}></Route>
          <Route path="/quan-ly/phong/add" element={<FormAddPhong />}></Route>
          <Route path="/quan-ly/phong/update">
            <Route path=":id" element={<FormUpdatePhong />}></Route>
          </Route>
          <Route path="/quan-ly/phan-mem" element={<PageQLPhanMem />}></Route>
          <Route path="/quan-ly/mon" element={<PageQlMonHoc />}></Route>
          <Route path="/quan-ly/thiet-bi" element={<PageQLThietBi />}></Route>
          <Route path="/quan-ly/nhan-vien" element={<PageQLNhanVien />}></Route>
          <Route path="/quan-ly/khoa" element={<PageQLKhoa />}></Route>
          <Route path="/quan-ly/giao-vien" element={<PageQLGiaoVien />}></Route>
          <Route path="/quan-ly/giao-vien/add" element={<FormAddGiaoVien />}></Route>
          <Route path="/quan-ly/tai-khoan" element={<PageQLTaiKhoan />}></Route>
          <Route path="/phan-cong/lich-truc" element={<PageLichTruc />}></Route>
          <Route
            path="/phan-cong/lich-truc/add"
            element={<FormAddLichTruc />}
          ></Route>
          <Route
            path="/phan-cong/lich-truc/update/:id"
            element={<FormUpdateLichTruc />}
          ></Route>
          <Route path="/account" element={<PageProfile />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Route>
        <Route path="/login" element={<PageLogin />}></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
