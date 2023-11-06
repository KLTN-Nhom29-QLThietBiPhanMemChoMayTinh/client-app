import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllToaNhaHomeApi,
  getPhongByFirst,
} from "../../redux/reducers/homeReducer";
import ComponentThongTinChiTiet from "../../components/layoutHome/ComponentThongTinChiTiet";
import ComponentToaNhaAndTang from "../../components/layoutHome/ComponentToaNhaAndTang";
import ComponentListPhong from "../../components/layoutHome/ComponentListPhong";
import ComponentDetailPhong from "../../components/layoutHome/ComponentDetailPhong";


export default function PageHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    //
    dispatch(getPhongByFirst);
    //
    dispatch(getAllToaNhaHomeApi);
    // call Tang
  }, []);

  //
  return (
    <div
      className="row p-2 d-flex justify-content-between bg-light  w-100"
      style={{ height: "100vh", margin: "0px" }}
    >
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
            <button type="button" className="btn btn-primary">
              Chi tiết
            </button>
            <button type="button" className="btn btn-primary">
              Chỉnh sửa
            </button>
            <button type="button" className="btn btn-primary">
              Ghi chú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
