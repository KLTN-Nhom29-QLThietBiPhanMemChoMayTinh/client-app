import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/scss/style.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page404 from "./pages/Page404/Page404";
import PageHome from "./pages/PageHome/PageHome";
import PageQlKhuVuc from "./pages/PageQuanLy/PageQlKhuVuc";
import PageQLPhongMay from "./pages/PageQuanLy/PageQLPhongMay";
import FromAddKhuVuc from './components/layout/FormAddKhuVuc'
import FormKhuVucUpdate from "./components/layout/FormKhuVucUpdate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />}>
        <Route path="" element={<PageHome />}></Route>
        <Route path="/quan-ly" element={<PageQlKhuVuc />}></Route>
        <Route path="/quan-ly/khu-vuc" element={<PageQlKhuVuc />}></Route>
        <Route path="/quan-ly/khu-vuc/add" element={<FromAddKhuVuc />}></Route>
        <Route path="/quan-ly/khu-vuc/update" element={<FormKhuVucUpdate />}></Route>
        <Route path="/quan-ly/phong" element={<PageQLPhongMay />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
