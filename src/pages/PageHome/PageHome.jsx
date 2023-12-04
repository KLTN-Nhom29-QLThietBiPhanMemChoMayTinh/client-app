import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllToaNhaHomeApi,
  getPhongByFirst,
} from "../../redux/reducers/homeReducer";
import ComponentThongTinChiTiet from "../../components/layoutHome/ComponentThongTinChiTiet";
import ComponentToaNhaAndTang from "../../components/layoutHome/ComponentToaNhaAndTang";
import ComponentListPhong from "../../components/layoutHome/ComponentListPhong";
import ComponentDetailPhong from "../../components/layoutHome/ComponentDetailPhong";
import {
  getAllPhongMayApi,
  getAllPhongMay_GhiChuApi,
} from "../../redux/reducers/phongMayReducer";
import { getAllToaNhaApi } from "../../redux/reducers/toaNhaReducer";
import ComponentModelDetail from "../../components/layoutHome/ComponentModelDetail";
import ComponentModalGhiChu from "../../components/layoutHome/ComponentModalGhiChu";
import { setThongTinObjGhiChuRedux } from "../../redux/reducers/home2Reducer";
import ComponentModalGhiChuPhong from "../../components/layoutHome/ComponentModalGhiChuPhong";
import ComponentModalGhiChuMayTinh from "../../components/layoutHome/ComponentModalGhiChuMayTinh";
import ComponentModalDetaiGhiChulMayTinh from "../../components/layoutHome/ComponentModalDetaiGhiChulMayTinh";
import { getAllGiaoVienApi } from "../../redux/reducers/giaoVienReducer";
import { getAllNhanVienApi } from "../../redux/reducers/nhanVienReducer";
import { getAllThietBiApi } from "../../redux/reducers/thietBiReducer";
import { getAllPhanMemApi } from "../../redux/reducers/phanMemReducer";
import ComponentModalDetaiGhiChuPhanMem from "../../components/layoutHome/ComponentModalDetaiGhiChuPhanMem";

export default function PageHome() {
  const dispatch = useDispatch();

  let { objThongTin, status } = useSelector((state) => state.homeReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);

  // 3.
  let { arrPhongMay, arrPhongMay_GhiChu } = useSelector(
    (state) => state.phongMayReducer
  );
  // 4
  let { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  let { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  let { arrThietBi } = useSelector((state) => state.thietBiReducer);
  let { arrPhanMem } = useSelector((state) => state.phanMemReducer);
  useEffect(() => {
    //
    if (status) {
      dispatch(getPhongByFirst);
    } else {
      if (Object.keys(objThongTin).length === 0) {
        dispatch(getPhongByFirst);
      }
    }
    //
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    // call Tang

    // 3.del
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
    if (arrPhongMay_GhiChu.length === 0) {
      dispatch(getAllPhongMay_GhiChuApi);
    }

    // ghichu
    if (arrGiaoVien.length === 0) {
      dispatch(getAllGiaoVienApi);
    }
    //
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }

    // btn update
    if (arrThietBi.length === 0) {
      dispatch(getAllThietBiApi);
    }
    if (arrPhanMem.length === 0) {
      dispatch(getAllPhanMemApi);
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
      <ComponentModalGhiChuPhong />
      <ComponentModalGhiChuMayTinh />

      {/* modal detail ghichu */}
      <ComponentModalDetaiGhiChulMayTinh />
      <ComponentModalDetaiGhiChuPhanMem />

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
              data-bs-target="#modalIdGhiChuPhong"
              type="button"
              onClick={() => {
                // let { arrPhanMem, arrThietBi } = objThongTin;
                dispatch(setThongTinObjGhiChuRedux(objThongTin));
              }}
              className="btn btn-primary"
            >
              Ghi chú phòng
            </button>

            <button
              data-bs-toggle="modal"
              data-bs-target="#modalIdGhiChuMayTinh"
              type="button"
              onClick={() => {
                // let { arrPhanMem, arrThietBi } = objThongTin;
                dispatch(setThongTinObjGhiChuRedux(objThongTin));
              }}
              className="btn btn-primary"
            >
              Ghi chú MT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
