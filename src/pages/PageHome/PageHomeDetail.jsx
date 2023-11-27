import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllToaNhaHomeApi,
  getPhongByFirst,
  setArrPhongMayHomeAction,
  setArrTangHomeAction,
  setObjThongTinByMay,
  setObjThongTinByMay2,
  setObjThongTinByMayAction,
  setObjThongTinByPhongMay,
  setObjThongTinByTang,
  setObjThongTinByToaNha,
} from "../../redux/reducers/homeReducer";
import ComponentThongTinChiTiet from "../../components/layoutHome/ComponentThongTinChiTiet";
import ComponentToaNhaAndTang from "../../components/layoutHome/ComponentToaNhaAndTang";
import ComponentListPhong from "../../components/layoutHome/ComponentListPhong";
import ComponentDetailPhong from "../../components/layoutHome/ComponentDetailPhong";
import { getAllPhongMayApi } from "../../redux/reducers/phongMayReducer";
import { getAllToaNhaApi } from "../../redux/reducers/toaNhaReducer";
import ComponentModelDetail from "../../components/layoutHome/ComponentModelDetail";
import ComponentModalGhiChu from "../../components/layoutHome/ComponentModalGhiChu";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTangApi } from "../../redux/reducers/tangReducer";

export default function PageHomeDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //

  let { objThongTin, arrToaNhaH, status } = useSelector(
    (state) => state.homeReducer
  );
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  // arrTang dùng cho detail gửi về detail id tang
  let { arrTang } = useSelector((state) => state.tangReducer);
  // arrmayTinh dung cho detail
  let { arrMayTinh } = useSelector((state) => state.mayTinhReducer);
  // 3.
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);

  useEffect(() => {
    //
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if(arrTang.length === 0 ){
      dispatch(getAllTangApi)
    }
    // call Tang

    // 3.del
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
    //

    if (Object.keys(objParam).length !== 0) {
      let { id, key } = objParam;
      switch (key) {
        case "toanha":
          dispatch(setObjThongTinByToaNha(id, arrPhongMay));
          break;
        case "tang": {
          if (arrTang.length === 0) {
            navigate("/quan-ly/tang");
            return;
          }
          let objTang = arrTang.find((item) => item.maTang == id);

          let arrTangH = arrTang.filter(
            (item) => item.toaNha.maToaNha == objTang.toaNha.maToaNha
          );

          dispatch(setArrTangHomeAction(arrTangH));
          dispatch(setObjThongTinByTang(objTang, arrPhongMay));
          break;
        }
        case "phongmay": {
          if (arrTang.length === 0) {
            navigate("/quan-ly/tang");
            return;
          }
          let objPhongmay = arrPhongMay.find((item) => item.maPhong == id);
          // update ds tang Home
          let arrTangH = arrTang.filter(
            (item) => item.toaNha.maToaNha == objPhongmay.tang.toaNha.maToaNha
          );

          dispatch(setArrTangHomeAction(arrTangH));
          // update ds phong Home
          let arrPhongH = arrPhongMay.filter(
            (item) => item.tang.maTang == objPhongmay.tang.maTang
          );
          dispatch(setArrPhongMayHomeAction(arrPhongH));
          //
          dispatch(setObjThongTinByPhongMay(objPhongmay));
          break;
        }
        //
        case "maytinh": {
          //
          if (arrTang.length === 0) {
            navigate("/quan-ly/tang");
            return;
          }
          if (arrMayTinh.length === 0) {
            navigate("/quan-ly/may-tinh");
            return;
          }
          //
          let objMayTinh = arrMayTinh.find((item) => item.maMay == id);
          let idPhong = objMayTinh.phongMay.maPhong;

          //
          let objPhongmay = arrPhongMay.find((item) => item.maPhong == idPhong);
          // update ds tang Home
          let arrTangH = arrTang.filter(
            (item) => item.toaNha.maToaNha == objPhongmay.tang.toaNha.maToaNha
          );

          dispatch(setArrTangHomeAction(arrTangH));
          // update ds phong Home
          let arrPhongH = arrPhongMay.filter(
            (item) => item.tang.maTang == objPhongmay.tang.maTang
          );
          dispatch(setArrPhongMayHomeAction(arrPhongH));

          //
          dispatch(setObjThongTinByPhongMay(objPhongmay));
          //

          /**
           * objMay tin co data objMayTinh va thietBiMays
           * nhung thang dispatch(setObjThongTinByPhongMay(objPhongmay));
           * no chay chậm đẫn đến chạy dispatch(setObjThongTinByMayAction()) trước,
           * mà ở trong thằng  setObjThongTinByPhongMay - nó sẽ new 1 obj mới
           * đẫn đến data - setObjThongTinByMayAction bi xóa mất
           */

          let arrThietBi = objMayTinh.thietBiMays;
          let objMay = objMayTinh;
          setTimeout(() => {
            console.log("chú ý - 0.5s");
            dispatch(setObjThongTinByMayAction({ objMay, arrThietBi }));

          }, 500)

          // dispatch(setObjThongTinByMay(objMayTinh));
        }
        default:
          break;
      }
    } else {
      // kiểm soát khi có update data liên quan đến trang home thì se reload lại data
      if (status) {
        dispatch(getPhongByFirst);
      } else {
        if (Object.keys(objThongTin).length === 0) {
          dispatch(getPhongByFirst);
        }
      }
    }
  }, []);

  //
  return (
    <div
      className="row p-2 d-flex justify-content-between bg-light  w-100"
      style={{ height: "100vh", margin: "0px" }}
    >
      {/* modal thong tin chi tiet */}
      <ComponentModelDetail />

      {/* modal Ghi chu */}
      <ComponentModalGhiChu />

      {/*1. col Toa nha -- Tang */}
      <div className="col-2  flex-column d-flex justify-content-between px-1">
        <ComponentToaNhaAndTang />

        <div></div>
        <div></div>
        <div></div>
      </div>

      {/*1. Col2 phong - CT Phong  */}
      <div className="col-7  px-2 " style={{ height: "100%" }}>
        <div className="flex-column d-flex " style={{ height: "100%" }}>
          {/* list Phong  */}
          <ComponentListPhong />

          {/* List Detail Phong */}
          <ComponentDetailPhong />
        </div>
      </div>

      {/*1. Col3 Thongo tin  */}
      <div
        className="col-3 border border-info rounded p-2 "
        style={{ height: "100%" }}
      >
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          <div className="">
            <h3 style={{ fontWeight: 600 }}>Thông tin chi tiết</h3>
          </div>
          <ComponentThongTinChiTiet />
          <div className="d-flex justify-content-around">
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalIdDetail"
              type="button"
              className="btn btn-primary"
            >
              Chi tiết
            </button>

            <button
              data-bs-toggle="modal"
              data-bs-target="#modalIdGhiChu"
              type="button"
              className="btn btn-primary"
            >
              Ghi chú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
