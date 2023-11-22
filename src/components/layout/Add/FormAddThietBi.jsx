import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLoaiThietBiApi,
  getAllThietBiApi,
  insertThietBiApi,
} from "../../../redux/reducers/thietBiReducer";
import { formatStringDate, formatStringDate2 } from "../../../util/config";

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
    ngaySD: formatStringDate2(),
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
    //
    let { tgianBaoHanh, ngaySD } = objThietBi.current;
    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objThietBi.current = {
      tenTBi: "",
      valSelLoaiTBi: 1,
      ngaySD,
      status,
      tgianBaoHanh: 1,
      ngayKT,
    };
    setErrTBi({ ...errTbi });
  }, []);

  // handle
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkData()) {
      // false
      return;
    }
    // true

    let { tenTBi, valSelLoaiTBi, ngaySD, tgianBaoHanh, ngayKT } =
      objThietBi.current;

    let loaiThietBi = arrLoaiTBi.find((item) => item.maLoai == valSelLoaiTBi);

    let thietBiNew = {
      tenThietBi: tenTBi,
      tuoiTho: tgianBaoHanh,
      ngayCaiDat: new Date(ngaySD),
      status: true,
      loaiThietBi,
    };
    //
    dispatch(insertThietBiApi(thietBiNew));
  };
  const checkData = () => {
    let check = 1;
    let err_tenTBi = "";
    let { tenTBi } = objThietBi.current;

    if (tenTBi.trim().length === 0) {
      err_tenTBi = "Hãy nhập thông tin!";
      check = 0;
    }

    setErrTBi({
      ...errTbi,
      tenTBi: err_tenTBi,
    });

    return check;
  };
  //

  const handleChangeTgianBH = (e) => {
    let value = e.target.value;

    let errTgianBH = "";
    if (value == 0) {
      errTgianBH = "Thời gian bảo hành phải lớn hơn 0";
      value = 1;
    }
    if (value >= 50) {
      console.log("1");
      errTgianBH = "Thời gian bảo hành phải nhỏ hơn 50";
      value = 50;
    }

    let ngaySD = objThietBi.current.ngaySD;
    let tgianBaoHanh = parseInt(value);

    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objThietBi.current = {
      ...objThietBi.current,
      tgianBaoHanh,
      status,
      ngayKT,
    };

    setErrTBi({ ...errTbi, tgianBaoHanh: errTgianBH });
  };

  //
  const handleChangeNgaySD = (e) => {
    let ngaySD = e.target.value;

    let tgianBaoHanh = objThietBi.current.tgianBaoHanh;
    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objThietBi.current = {
      ...objThietBi.current,
      ngaySD,
      status,
      ngayKT,
    };

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
                onSubmit={handleSubmit}
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
                        <label className="form-label">
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
                          Thời gian bảo hảnh ( tháng )
                          <small
                            id="helpIdtgian"
                            className="form-text text-danger mx-2"
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
                        <label className="form-label">
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

const getCheckTgianKT = ({ tgianBaoHanh, ngaySD }) => {
  let ngayKT = new Date(ngaySD);

  ngayKT.setMonth(ngayKT.getMonth() + parseInt(tgianBaoHanh));

  let status = "";
  let day = new Date();
  let day2 = new Date(ngayKT);

  day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay

  if (day > ngayKT) {
    status = "Đang sử dụng - hết hạn bảo hành";
  } else if (day > day2 && day < ngayKT) {
    status = "Đang sử dụng, sắp hết hạn bảo hành";
  } else {
    status = "Đang sử dụng";
  }

  return { status, ngayKT: formatStringDate(ngayKT) };
};
