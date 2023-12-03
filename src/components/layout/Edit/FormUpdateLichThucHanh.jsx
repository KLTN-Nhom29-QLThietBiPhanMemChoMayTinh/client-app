import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { getAllToaNhaApi } from "../../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";
import { getAllPhongMayApi } from "../../../redux/reducers/phongMayReducer";
import { getAllMonHoc } from "../../../redux/reducers/monHocReducer";
import { getAllGiaoVienApi } from "../../../redux/reducers/giaoVienReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { formatStringDate2 } from "../../../util/config";
import {
  getAllDsPhongHocInMonHoc,
  getDSPhong_trungPM_MonHocApi3,
  getDsNgayTH,
} from "../../../redux/reducers/lichThucHanhReducer";

//
let objData_old = {};
let regex_date_min = "";
let regex_date_max = "";
//
export default function FormUpdateLichThucHanh() {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //
  //
  let { arrPhanMemByMonHoc, arrPhongByMonHoc, arrMonHoc_CaTH, arrCaThucHanh } =
    useSelector((state) => state.lichThucHanhReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  let { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  let { arrMonHoc } = useSelector((state) => state.monHocReducer);
  //
  let objCaThucHanh = useRef({
    valueSelGiaoVien: -1,
    txtSoBuoiTH: 0,
    txtTietBD: "",
    txtTietKT: "",
    txtMonHoc: -1,
    valueSelTang: -1,
    valueSelPhongMay: -1,
    valueSelToaNha: -1,
    valueSelCaTH: "1",
    txtNgayTH: "",
  });
  let [errCaTH, setErrCaTH] = useState({
    txtNgayTH: "",
    valueSelGiaoVien: "",
    valueSelCaTH: "",
    txtTietTH: "",
    valueSelToaNha: "",
    valueSelTang: "",
    valueSelPhongMay: "",
  });

  //
  useEffect(() => {
    if (objParam.id == null) {
      navigate("/phan-cong/lich-thuc-hanh");
    }
    if (arrCaThucHanh.length === 0) {
      navigate("/phan-cong/lich-thuc-hanh");
    } else {
      objData_old = arrCaThucHanh.find((item) => item.maCa == objParam.id);
      let {
        maCa,
        ngayThucHanh,
        tenCa,
        tietBatDau,
        tietKetThuc,
        buoiSo,
        giaoVien,
        phongMay,
        monHoc,
      } = objData_old;

      //
      let { soBuoi, ngayBatDau } = monHoc;
      regex_date_min = new Date(ngayBatDau);
      regex_date_max = new Date(ngayBatDau);

      regex_date_max.setDate(regex_date_max.getDate() + (soBuoi + 1) * 7);

      //
      objCaThucHanh.current = {
        txtMonHoc: monHoc.tenMon,
        txtSoBuoiTH: buoiSo,
        txtNgayTH: ngayThucHanh,
        valueSelGiaoVien: giaoVien.maGiaoVien,
        valueSelCaTH: tenCa,
        txtTietBD: tietBatDau,
        txtTietKT: tietKetThuc,
        valueSelTang: phongMay.tang.maTang,
        valueSelPhongMay: phongMay.maPhong,
        valueSelToaNha: phongMay.tang.toaNha.maToaNha,
      };
    }

    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }

    if (arrMonHoc.length === 0) {
      dispatch(getAllMonHoc);
    }
    if (arrGiaoVien.length === 0) {
      dispatch(getAllGiaoVienApi);
    } else {
      objCaThucHanh.current.valueSelGiaoVien = arrGiaoVien[0].maGiaoVien;
    }
    // update arrPhongByMonHoc - gia tri ban dau là toàn bộ arrPhong
    // dispatch(getAllDsPhongHocInMonHoc);
    // update Gia trij mon hoc chuaw co ca thuc hanh
    // dispatch(setArrMonHoc_CaThucHanhApi);
    // update ds PM can theit
    // dispatch (serArrPhanMemByIdMonHocAction([]))
    // setErrCaTH({ ...errCaTH });

    // tim PM cho mon hoc - tim phongf
    dispatch(getDSPhong_trungPM_MonHocApi3(objData_old.monHoc.maMon));

    setErrCaTH({ ...setErrCaTH });
  }, []);
  //
  // handle
  //
  const handleChangeSelectPhongMay = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelPhongMay: value,
    };
    //
    let text_err = "";
    if (checkDataTrungCa(objCaThucHanh.current, arrCaThucHanh)) {
      text_err = "Buổi học đang trùng với một ca khác!";
    }
    setErrCaTH({
      txtNgayTH: "",
      valueSelGiaoVien: "",
      valueSelCaTH: text_err,
      txtTietTH: "",
      valueSelToaNha: "",
      valueSelTang: "",
      valueSelPhongMay: "",
    });
  };
  //
  const handleChangeSelectTang = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelTang: value,
      // valueSelPhongMay: -1,
    };
    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelTang: "Hãy chọn tầng!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelTang: "",
        valueSelToaNha: "",
      });
    }
  };
  //
  const handleChangeSelectToaNha = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelToaNha: value,
      valueSelTang: -1,
      // valueSelPhongMay: -1,
    };
    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelToaNha: "Hãy chọn tòa nhà!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelToaNha: "",
      });
    }
  };
  //
  const handleChangTietHocTo = (e) => {
    let { value } = e.target;
    objCaThucHanh.current.txtTietKT = value;

    setErrCaTH({ ...errCaTH });
  };
  //
  const handleChangTietHocFrom = (e) => {
    let { value } = e.target;
    objCaThucHanh.current.txtTietBD = value;

    setErrCaTH({ ...errCaTH });
  };
  ///
  const handleChangeSelectCaTH = (e) => {
    objCaThucHanh.current.valueSelCaTH = e.target.value;

    let text_err = "";
    if (checkDataTrungCa(objCaThucHanh.current, arrCaThucHanh)) {
      text_err = "Buổi học đang trùng với một ca khác!";
    }
    setErrCaTH({
      txtNgayTH: "",
      valueSelGiaoVien: "",
      valueSelCaTH: text_err,
      txtTietTH: "",
      valueSelToaNha: "",
      valueSelTang: "",
      valueSelPhongMay: "",
    });
  };
  //
  const handleChangeSelectGiaoVien = (e) => {
    let { value } = e.target;
    objCaThucHanh.current.valueSelGiaoVien = value;

    let text_err = "";
    if (checkDataTrungCa(objCaThucHanh.current, arrCaThucHanh)) {
      text_err = "Buổi học đang trùng với một ca khác!";
    }
    setErrCaTH({
      txtNgayTH: "",
      valueSelGiaoVien: text_err,
      valueSelCaTH: "",
      txtTietTH: "",
      valueSelToaNha: "",
      valueSelTang: "",
      valueSelPhongMay: "",
    });
  };
  //
  const handleChangeNgayTH = (e) => {
    let { value } = e.target;

    objCaThucHanh.current.txtNgayTH = value;
    let text_err = "";

    if (checkDataTrungCa(objCaThucHanh.current, arrCaThucHanh)) {
      text_err = "Buổi học đang trùng với một ca khác!";
    }
    setErrCaTH({
      txtNgayTH: text_err,
      valueSelGiaoVien: "",
      valueSelCaTH: "",
      txtTietTH: "",
      valueSelToaNha: "",
      valueSelTang: "",
      valueSelPhongMay: "",
    });
  };
  //

  // render
  //
  const renderSelectPhongMay = () => {
    let { valueSelToaNha, valueSelTang, valueSelPhongMay, valueSelMonHoc } =
      objCaThucHanh.current;
    // <option value={-1}>Tất cả</option>

    if (valueSelMonHoc != -1 && valueSelPhongMay == -1) {
      return <option value={-1}>Không có phòng thỏa mãn</option>;
    }
    if (valueSelToaNha == -1) {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha khong co giatri
        return arrPhongByMonHoc.map((item, index) => {
          return (
            <option
              key={index}
              selected={valueSelPhongMay == item.maPhong ? 1 : 0}
              value={item.maPhong}
            >
              {item.tenPhong} - {item.tang.tenTang} -{" "}
              {item.tang.toaNha.tenToaNha}
            </option>
          );
        });
      } else {
        // select tang co gia tri
        // toa nha khong co giatri
        return arrPhongByMonHoc.map((item, index) => {
          if (item.tang.maTang == valueSelTang) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.toaNha.tenToaNha}
              </option>
            );
          }
          return <></>;
        });
      }
    } else {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha co giatri
        return arrPhongByMonHoc.map((item, index) => {
          if (item.tang.toaNha.maToaNha == valueSelToaNha) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.tenTang}
              </option>
            );
          }
          return <></>;
        });
      } else {
        // select tang co gia tri
        // toa nha co giatri
        return arrPhongMay.map((item, index) => {
          if (
            item.tang.maTang == valueSelTang &&
            item.tang.toaNha.maToaNha == valueSelToaNha
          ) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong}
              </option>
            );
          }
          return <></>;
        });
      }
    }
  };
  //
  const renderSelectTang = () => {
    let { valueSelToaNha, valueSelTang } = objCaThucHanh.current;

    return arrTang?.map((item, index) => {
      if (valueSelToaNha == -1) {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang} - {item.toaNha.tenToaNha}
          </option>
        );
      } else {
        if (item.toaNha.maToaNha == valueSelToaNha) {
          if (item.maTang == valueSelTang) {
            return (
              <option key={index} selected value={item.maTang}>
                {item.tenTang}
              </option>
            );
          }
          return (
            <option key={index} value={item.maTang}>
              {item.tenTang}
            </option>
          );
        } else return <></>;
      }
    });
  };
  //
  const renderSelctToaNha = () => {
    let { valueSelToaNha } = objCaThucHanh.current;

    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == valueSelToaNha) {
        return (
          <option key={index} selected value={item.maToaNha}>
            {item.tenToaNha}
          </option>
        );
      }
      return (
        <option key={index} value={item.maToaNha}>
          {item.tenToaNha}
        </option>
      );
    });
  };
  //
  const renderChangeSelectCaTH = () => {
    let { valueSelCaTH } = objCaThucHanh.current;

    return (
      <>
        <option selected={valueSelCaTH.includes("sáng") ? 1 : 0} value={"sáng"}>
          Sáng
        </option>
        <option
          selected={valueSelCaTH.includes("chiều") ? 1 : 0}
          value={"chiều"}
        >
          Chiều
        </option>
        <option selected={valueSelCaTH.includes("tối") ? 1 : 0} value={"tối"}>
          Tối
        </option>
      </>
    );
  };
  //
  const renderSelectGiaoVien = () => {
    let { valueSelGiaoVien } = objCaThucHanh.current;

    return arrGiaoVien.map((item, index) => {
      return (
        <option
          key={index}
          selected={valueSelGiaoVien == item.maGiaoVien ? 1 : 0}
          value={item.maGiaoVien}
        >
          {item.maGiaoVien} - {item.hoTen}
        </option>
      );
    });
  };
  //

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Phân công lịch thực hành", link: "/phan-cong/lich-thuc-hanh" },
  ];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        <div className="d-flex flex-column justify-content-between h-100">
          <div style={{ height: "80vh" }}>
            {/*  */}
            <div style={{ height: "8vh" }}>
              <NavTab itemLink={{ arrLinkNavTab, chucNang: "Chỉnh sửa" }} />
            </div>
            {/*  */}
            <div
              className="bg-white rounded p-4 px-5"
              style={{ height: "82vh" }}
            >
              {/* Form add */}
              <form
                // onSubmit={handleSubmit}
                className="d-flex h-100 justify-content-between flex-column"
              >
                {/* body */}
                <div className="">
                  <h2 className="mx-3 mb-3 ">Chỉnh sửa lịch thực hành</h2>
                  <div className="row">
                    <div className="col-md-4">
                      {/* MOn hoc */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelMonHoc" className="form-label">
                          Môn học
                          <small className="form-text text-muted mx-2">*</small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="txtTenMonHoc"
                          aria-describedby="helpId"
                          value={objCaThucHanh.current.txtMonHoc}
                          disabled
                        />
                      </div>
                      {/* so buoi */}
                      <div className="mb-3 col-10">
                        <label htmlFor className="form-label">
                          Buổi Thực hành số
                          <small
                            id="helpId"
                            className="form-text text-muted mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="soBuoi"
                          aria-describedby="helpId"
                          placeholder="2"
                          value={objCaThucHanh.current.txtSoBuoiTH}
                          disabled
                        />
                      </div>
                      {/* Ngay TH */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtNgayTH" className="form-label">
                          Ngày thực hành
                          <small
                            id="helpId"
                            className="form-text text-danger mx-2"
                          >
                            *{errCaTH.txtNgayTH}
                          </small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="txtNgayTH"
                          id="txtNgayTH"
                          value={objCaThucHanh.current.txtNgayTH}
                          min={formatStringDate2(new Date(regex_date_min))}
                          max={formatStringDate2(new Date(regex_date_max))}
                          aria-describedby="helpId"
                          onChange={handleChangeNgayTH}
                        />
                      </div>

                      {/*  */}
                    </div>
                    <div className="col-md-4">
                      {/* Giáo viên */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelGiaovien" className="form-label">
                          Giảng viên dạy
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.valueSelGiaoVien}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="valSelGiaovien"
                          id="valSelGiaovien"
                          onChange={handleChangeSelectGiaoVien}
                        >
                          {renderSelectGiaoVien()}
                        </select>
                      </div>
                      {/* Buổi TH */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelCaTH" className="form-label">
                          Ca thực hành
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.valueSelCaTH}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="valSelCaTH"
                          id="valSelCaTH"
                          onChange={handleChangeSelectCaTH}
                        >
                          {renderChangeSelectCaTH()}
                        </select>
                      </div>
                      {/* Tiết TH */}
                      <div className="mb-3 col-10">
                        <label>
                          Tiết thực hành:
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.txtTietTH}
                          </small>
                        </label>
                        <div className="py-1">
                          {/* <div style={{display:'flex'}}> */}
                          <div className="d-flex align-items-center">
                            Từ:
                            <input
                              type="number"
                              className="form-control mx-1"
                              name="txtTietHocForm"
                              id="txtTietHocForm"
                              value={objCaThucHanh.current.txtTietBD}
                              onChange={handleChangTietHocFrom}
                              max={
                                objCaThucHanh.current.valueSelCaTH.includes(
                                  "sáng"
                                )
                                  ? 5
                                  : objCaThucHanh.current.valueSelCaTH.includes(
                                      "chiều"
                                    )
                                  ? 10
                                  : 15
                              }
                              min={
                                objCaThucHanh.current.valueSelCaTH.includes(
                                  "sáng"
                                )
                                  ? 1
                                  : objCaThucHanh.current.valueSelCaTH.includes(
                                      "chiều"
                                    )
                                  ? 6
                                  : 13
                              }
                            />
                            Đến:
                            <input
                              type="number"
                              className="form-control mx-1"
                              name="txtTietHocTo"
                              id="txtTietHocTo"
                              value={objCaThucHanh.current.txtTietKT}
                              onChange={handleChangTietHocTo}
                              max={
                                objCaThucHanh.current.valueSelCaTH.includes(
                                  "sáng"
                                )
                                  ? 5
                                  : objCaThucHanh.current.valueSelCaTH.includes(
                                      "chiều"
                                    )
                                  ? 10
                                  : 15
                              }
                              min={
                                objCaThucHanh.current.valueSelCaTH.includes(
                                  "sáng"
                                )
                                  ? 2
                                  : objCaThucHanh.current.valueSelCaTH.includes(
                                      "chiều"
                                    )
                                  ? 7
                                  : 14
                              }
                            />
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                    {/* right */}
                    <div className="col-md-4">
                      {/* tòa nhà */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelToaNha" className="form-label">
                          Chọn tòa nhà
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelToaNha}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelToaNha"
                          id="valSelToaNha"
                          onChange={handleChangeSelectToaNha}
                        >
                          <option
                            selected={
                              objCaThucHanh.current.valueSelToaNha == -1 ? 1 : 0
                            }
                            value={-1}
                          >
                            Tất cả
                          </option>
                          {renderSelctToaNha()}
                        </select>
                      </div>
                      {/* tầng */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelTang" className="form-label">
                          Chọn tầng
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelTang}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelTang"
                          id="valSelTang"
                          onChange={handleChangeSelectTang}
                        >
                          <option
                            selected={
                              objCaThucHanh.current.valueSelTang == -1 ? 1 : 0
                            }
                            value={-1}
                          >
                            Tất cả
                          </option>
                          {renderSelectTang()}
                        </select>
                      </div>
                      {/* phòng */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelPhongMay" className="form-label">
                          Chọn phòng máy
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelPhongMay}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelPhongMay"
                          id="valSelPhongMay"
                          onChange={handleChangeSelectPhongMay}
                        >
                          {renderSelectPhongMay()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="reset" className="btn btn-danger mx-3">
                    Chỉnh sửa
                  </button>
                  <button type="submit" className="btn btn-success mx-3">
                    Tạo mới
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/*  */}
          <Footer />
        </div>
      </div>
    </>
  );
}

/// function
/**
 *
 * @param {data dang co trong form} objCaTH
 * @param {ds caThucHanh} arrCaThucHanh
 * @returns true: timf tháy trùng | false : không trùng
 */
const checkDataTrungCa = (objCaTH, arrCaThucHanh) => {
  let check = 0;
  let {
    // txtSoBuoiTH,
    txtTietBD,
    txtTietKT,
    // txtMonHoc,
    valueSelGiaoVien,
    // valueSelTang,
    valueSelPhongMay,
    // valueSelToaNha,
    // valueSelCaTH,
    txtNgayTH,
  } = objCaTH;

  let day_objCaTH = new Date(txtNgayTH);
  let sum_TietHoc = parseInt(txtTietKT) - parseInt(txtTietBD);

  //
  arrCaThucHanh.forEach((e) => {
    let {
      // maCa,
      ngayThucHanh,
      // tenCa,
      tietBatDau,
      tietKetThuc,
      // buoiSo,
      giaoVien,
      phongMay,
      monHoc,
    } = e;
    let date_item_CaTH = new Date(ngayThucHanh);
    let sum_TietHoc_item = parseInt(tietKetThuc) - parseInt(tietBatDau);
    console.log(
      date_item_CaTH.getTime() === day_objCaTH.getTime() &&
        tietBatDau == txtTietBD &&
        sum_TietHoc_item === sum_TietHoc &&
        giaoVien.maGiaoVien.includes(valueSelGiaoVien) &&
        phongMay.maPhong === parseInt(valueSelPhongMay)
    );
    if (
      date_item_CaTH.getTime() === day_objCaTH.getTime() &&
      tietBatDau == txtTietBD &&
      sum_TietHoc_item === sum_TietHoc &&
      giaoVien.maGiaoVien.includes(valueSelGiaoVien) &&
      phongMay.maPhong === parseInt(valueSelPhongMay)
    ) {
      check = 1;
    }
  });

  // data chinh sửa
  let date_item_CaTH_old = new Date(objData_old.ngayThucHanh);
  let sum_TietHoc_item_old =
    parseInt(objData_old.tietKetThuc) - parseInt(objData_old.tietBatDau);

  if (
    date_item_CaTH_old.getTime() === day_objCaTH.getTime() &&
    objData_old.tietBatDau == txtTietBD &&
    sum_TietHoc_item_old === sum_TietHoc &&
    objData_old.giaoVien.maGiaoVien.includes(valueSelGiaoVien) &&
    objData_old.phongMay.maPhong === parseInt(valueSelPhongMay)
  ) {
    check = 0;
  }

  return check;
};
//
