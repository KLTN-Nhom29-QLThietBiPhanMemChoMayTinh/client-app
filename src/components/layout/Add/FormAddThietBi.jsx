import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoaiThietBiApi,
  getAllThietBiApi,
} from "../../../redux/reducers/thietBiReducer";

let date = new Date();
let dateYear = date.getFullYear();
let dateYearMin = date.getFullYear() - 5;
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;
let strDateMin = `${dateYearMin}-${dateMonth}-${dateDay}`;

export default function FormAddThietBi() {
  //
  const dispatch = useDispatch();
  //
  let { arrLoaiTBi, arrThietBi } = useSelector((state) => state.thietBiReducer);

  let objThietBi = useRef({
    tenTBi: "",
    valSelLoaiTBi: 1,
    ngaySD: strDate,
    status: "Đang sử dụng",
    tgianBaoHanh: 1,
    ngayKT: "00/00/0000",
  });
  let [errTbi, setErrTBi] = useState({
    tenTBi: "",
    valSelLoaiTBi: "",
    ngaySD: "",
    tgianBaoHanh: "",
  });
  //
  useEffect(() => {
    if (arrLoaiTBi.length === 0) {
      dispatch(getAllLoaiThietBiApi);
    }
    //
    if (arrThietBi.length === 0) {
      const action = getAllThietBiApi;
      dispatch(action);
    }
  }, []);

  // handle
  //
  const getCheckTgianKT = (objCheck) => {
    let { tgianBaoHanh, ngaySD } = objCheck;
    let day = new Date(); // ngay hien taij
    let ngayKT = new Date(ngaySD);
    ngayKT.setMonth(ngayKT.getMonth() + tgianBaoHanh);

    let day2 = new Date(ngayKT);
    let status = "";
    day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay

    if (day > ngayKT) {
      status = "Đang sử dụng - hết hạn bảo hành";
    } else if (day > day2 && day < ngayKT) {
      status = "Đang sử dụng, sắp hết hạn bảo hành";
    } else {
      status = "Đang sử dụng";
      return <td style={{ backgroundColor: "#4dff7c" }}>Đang sử dụng</td>;
    }
    return { ...objCheck, status, ngayKT };
  };
  const handleChangeTgianBH = (e) => {
    let { value } = e.target;
    console.log(
      "🚀 ~ file: FormAddThietBi.jsx:75 ~ handleChangeTgianBH ~ value:",
      value
    );
    objThietBi.current.tgianBaoHanh = e.target.value;
    console.log(
      "🚀 ~ file: FormAddThietBi.jsx:77 ~ handleChangeTgianBH ~ objThietBi.current:",
      objThietBi.current
    );
    objThietBi.current = getCheckTgianKT(objThietBi.current);

    setErrTBi({ ...errTbi });
  };
  //
  const handleChangeNgaySD = (e) => {
    objThietBi.current.ngaySD = e.target.value;

    setErrTBi({ ...errTbi });
  };
  //
  const handleChangeLoaiTbi = (e) => {
    objThietBi.current.valSelLoaiTBi = e.target.value;

    setErrTBi({ ...errTbi });
  };
  //
  const handleChangeTenTbi = (e) => {
    let { value } = e.target;
    objThietBi.current.tenTBi = value;

    if (value.trim().length === 0) {
      setErrTBi({ ...errTbi, tenTBi: "Hãy nhập thông tin!" });
    } else {
      setErrTBi({ ...errTbi, tenTBi: "" });
    }
  };

  // render
  //
  const renderLoaithietBi = () => {
    return arrLoaiTBi?.map((item, index) => {
      if (item.maLoai == objThietBi.current.valSelLoaiTBi) {
        return (
          <option key={index} selected value={item.maLoai}>
            {item.tenLoai}
          </option>
        );
      }
      return (
        <option key={index} value={item.maLoai}>
          {item.tenLoai}
        </option>
      );
    });
  };
  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý thiết bị", link: "/quan-ly/thiet-bi" }];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        <div
          className="d-flex flex-column justify-content-between "
          style={{ height: "100vh" }}
        >
          <div style={{ height: "80vh" }}>
            <div style={{ height: "8vh" }}>
              <NavTab itemLink={{ arrLinkNavTab, chucNang: "Tạo mới" }} />
            </div>
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
                <div>
                  <h2 className="mx-3 mb-3 ">Thêm thiết bị</h2>
                  <div className="row">
                    <div className="col-6">
                      {/* left */}
                      {/* ten Tbi */}
                      <div className="mb-3 col-10">
                        <label htmlFor="tenTbi" className="form-label">
                          Tên thiết bị
                          <small
                            id="helpIdTenTbi"
                            className="form-text text-danger mx-2"
                          >
                            *{errTbi.tenTBi}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="tenTbi"
                          id="tenTbi"
                          onChange={handleChangeTenTbi}
                          aria-describedby="helpIdTenTbi"
                          placeholder="Dell ADG..."
                        />
                      </div>
                      {/* Loại thiết bị */}
                      <div className="mb-3 col-10">
                        <label htmlFor="selLoaiThieBi" className="form-label">
                          Loại thiết bị
                          <small className="form-text text-danger mx-2">
                            *{errTbi.valSelLoaiTBi}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="selLoaiThieBi"
                          id="selLoaiThieBij"
                          onChange={handleChangeLoaiTbi}
                        >
                          {renderLoaithietBi()}
                        </select>
                      </div>

                      {/* Trang thai */}
                      <div className="mb-3 col-10">
                        <label htmlFor className="form-label">
                          Trạng thái
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
                          disabled
                          value={objThietBi.current.status}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      {/* Ngay su dung */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtNgay" className="form-label">
                          Ngày sử dụng{" "}
                          <small
                            id="helpIdNgaySD"
                            className="form-text text-danger mx-2"
                          >
                            *{errTbi.ngaySD}
                          </small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="txtNgay"
                          id="txtNgay"
                          onChange={handleChangeNgaySD}
                          value={objThietBi.current.ngaySD}
                          max={strDate}
                          min={strDateMin}
                          aria-describedby="helpIdNgaySD"
                          placeholder="01/01/2023"
                        />
                      </div>

                      {/* tgian bao hanh */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtTgianBaoHanh" className="form-label">
                          Thời gian bảo hảnh
                          <small
                            id="helpIdtgian"
                            className="form-text text-muted mx-2"
                          >
                            *{errTbi.tgianBaoHanh}
                          </small>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="txtTgianBaoHanh"
                          id="txtTgianBaoHanh"
                          min={1}
                          value={objThietBi.current.tgianBaoHanh}
                          max={50}
                          onChange={handleChangeTgianBH}
                          aria-describedby="helpIdtgian"
                        />
                      </div>

                      {/* Trang thai */}
                      <div className="mb-3 col-10">
                        <label htmlFor className="form-label">
                          Ngày hết hạn
                          <small
                            id="helpId"
                            className="form-text text-danger mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          value={objThietBi.current.ngayKT}
                        />
                      </div>

                      {/*  */}
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="submit" className="btn btn-success mx-3">
                    Tạo mới
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      objThietBi.current = {
                        tenTBi: "",
                        valSelLoaiTBi: "",
                        ngaySD: date,
                        status: true,
                        tgianBaoHanh: 1,
                        ngayKT: "00/00/0000",
                      };

                      setErrTBi({
                        tenTBi: "",
                        valSelLoaiTBi: "",
                        ngaySD: "",
                        tgianBaoHanh: "",
                      });
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
                  </button>
                </div>
              </form>
            </div>

            {/*  */}
          </div>

          {/*  */}
          <Footer />
        </div>
      </div>
    </>
  );
}
