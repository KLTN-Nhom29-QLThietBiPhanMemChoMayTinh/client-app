import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { formatStringDate, formatStringDate2 } from "../../../util/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhanMemApi } from "../../../redux/reducers/phanMemReducer";
import { insertMonHocApi } from "../../../redux/reducers/monHocReducer";

let date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let dateMonthMin = date.getMonth();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;
let strDateMin_BD = `${dateYear}-${dateMonthMin}-${dateDay}`;

export default function FormAddMonHoc() {
  //
  const dispatch = useDispatch();
  //
  let { arrPhanMem } = useSelector((state) => state.phanMemReducer);
  let { arrMonHoc } = useSelector((state) => state.monHocReducer);
  //
  let objMon = useRef({
    tenMon: "",
    ngayBatDau: formatStringDate2(),
    soBuoi: 1,
    phanMems: [],
    ngayKetThuc: "",
    status: "Đang học",
  });
  let [errMon, setErrMon] = useState({
    tenMon: "",
    ngayBatDau: "",
    soBuoi: "",
    phanMems: "",
  });
  //
  useEffect(() => {
    //
    if (arrPhanMem.length === 0) {
      const action = getAllPhanMemApi;
      dispatch(action);
    }
    //
    let { soBuoi, ngayBatDau } = objMon.current;
    let { status, ngayKetThuc } = getCheckTgianKT({ soBuoi, ngayBatDau });

    objMon.current = {
      ...objMon.current,
      status,
      ngayKetThuc,
    };

    setErrMon({ ...errMon });
  }, []);
  //
  // handle
  //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkData()) {
      // false
      console.log(false);
      return;
    }
    //true

    console.log("🚀 ~ file: FormAddMonHoc.jsx:70 ~ handleSubmit ~ objMon.current:", objMon.current)
    
    dispatch(insertMonHocApi(objMon.current))
  };
  const checkData = () => {
    let check = 1;

    let err_tenMon = "";
    let err_ngayBatDau = "";
    let err_soBuoi = "";
    let err_phanMems = "";

    let { tenMon, phanMems } = objMon.current;

    if (tenMon.trim().length === 0) {
      err_tenMon = "Hãy nhập thông tin!";
      check = 0;
    }
    if (phanMems.length === 0) {
      err_phanMems = "Hãy chọn thông tin!";
      check = 0;
    }

    setErrMon({
      tenMon: err_tenMon,
      ngayBatDau: err_ngayBatDau,
      soBuoi: err_soBuoi,
      phanMems: err_phanMems,
    });

    return check;
  };
  //
  const handleCheckPM = (e) => {
    let { checked, value } = e.target;
    var updateList = objMon.current.phanMems;
    if (checked) {
      updateList.push(arrPhanMem.find((item) => item.maPhanMem == value));
    } else {
      updateList = updateList.filter((item) => item.maPhanMem != value);
    }

    objMon.current.phanMems = updateList;

    if (objMon.current.phanMems.length === 0) {
      setErrMon({ ...errMon, phanMems: "Hãy chọn ứng dụng" });
    } else {
      setErrMon({ ...errMon, phanMems: "" });
    }
  };
  //
  const handleChangeNgayBD = (e) => {
    let { id, value } = e.target;
    objMon.current[id] = value;
    //
    let ngayBatDau = objMon.current.ngayBatDau;
    let soBuoi = parseInt(objMon.current.soBuoi);
    let { status, ngayKetThuc } = getCheckTgianKT({ soBuoi, ngayBatDau });

    objMon.current = {
      ...objMon.current,
      status,
      ngayKetThuc,
    };

    setErrMon({ ...errMon });
  };
  //
  const handleChangeSoBuoi = (e) => {
    let { id, value } = e.target;
    objMon.current[id] = value;
    //
    let ngayBatDau = objMon.current.ngayBatDau;
    let soBuoi = parseInt(objMon.current.soBuoi);
    let { status, ngayKetThuc } = getCheckTgianKT({ soBuoi, ngayBatDau });

    objMon.current = {
      ...objMon.current,
      status,
      ngayKetThuc,
    };

    setErrMon({ ...errMon });
  };
  //
  const handleChangeTenMon = (e) => {
    let { id, value } = e.target;

    objMon.current[id] = value;
    if (value.trim().length === 0) {
      setErrMon({ ...errMon, tenMon: "Hãy nhập dữ liệu!" });
    } else {
      setErrMon({ ...errMon, tenMon: "" });
    }
  };
  //

  //render
  //
  const renderCheckBox_PM = () => {
    return arrPhanMem?.map((item, index) => {
      if (!item.trangThai) {
        // trang thai hong se khogn hien owr day
        return <></>;
      }
      return (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.maPhanMem}
            id={`${item.maPhanMem}_PM`}
            onChange={handleCheckPM}
          />
          <label className="form-check-label" htmlFor={`${item.maPhanMem}_PM`}>
            {item.tenPhanMem}
          </label>
        </div>
      );
    });
  };
  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý môn học", link: "/quan-ly/mon" }];
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
                {/* header */}
                <div className="">
                  <h2 className="mx-3 mb-3 ">Thêm môn học</h2>
                  <div className="row">
                    <div className="col-md-6 ">
                      {/* ten mon */}
                      <div className="mb-3 col-10">
                        <label htmlFor="tenMon" className="form-label">
                          Tên môn
                          <small
                            id="helpIdtenMon"
                            className="form-text text-danger mx-2"
                          >
                            *{errMon.tenMon}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="tenMon"
                          id="tenMon"
                          aria-describedby="helpIdtenMon"
                          placeholder="Hệ thống thông tin"
                          onChange={handleChangeTenMon}
                        />
                      </div>
                      {/* só buổi */}
                      <div className="mb-3 col-10">
                        <label htmlFor="soBuoi" className="form-label">
                          Số buổi học
                          <small
                            id="helpIdsoBuoi"
                            className="form-text text-danger mx-2"
                          >
                            *{errMon.soBuoi}
                          </small>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="soBuoi"
                          id="soBuoi"
                          min={1}
                          defaultValue={1}
                          max={50}
                          aria-describedby="helpIdsoBuoi"
                          onChange={handleChangeSoBuoi}
                        />
                      </div>
                      {/* ngayd BD */}
                      <div className="mb-3 col-10">
                        <label htmlFor="ngayBatDau" className="form-label">
                          Ngày bắt đầu
                          <small
                            id="helpIDngayBatDau"
                            className="form-text text-danger mx-2"
                          >
                            *{errMon.ngayBatDau}
                          </small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="ngayBatDau"
                          id="ngayBatDau"
                          value={objMon.current.ngayBatDau}
                          min={strDateMin_BD}
                          aria-describedby="helpIDngayBatDau"
                          onChange={handleChangeNgayBD}
                        />
                      </div>

                      {/* ngayd KT */}
                      <div className="mb-3 col-10">
                        <label htmlFor="ngayKT" className="form-label">
                          Ngày kết thúc
                          <small
                            id="helpIDngayKT"
                            className="form-text text-muted mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="ngayKT"
                          id="ngayKT"
                          value={objMon.current.ngayKetThuc}
                          disabled
                          aria-describedby="helpIDngayKT"
                        />
                      </div>
                      {/*  */}
                      <div className="mb-3 col-10">
                        Trạng thái: <strong>{objMon.current.status}</strong>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-10">
                        <label htmlFor="soPhanMem" className="form-label">
                          Chọn ứng dụng phần mềm cho môn học
                          <small
                            id="errSoPhanMem"
                            className="form-text  mx-2 text-danger"
                          >
                            *{errMon.phanMems}
                          </small>
                        </label>
                        <div
                          className="over_flow_auto"
                          style={{
                            height: "300px",
                            paddingLeft: "10px",
                            paddingBottom: "15px",
                          }}
                        >
                          {renderCheckBox_PM()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="reset" className="btn btn-danger mx-3">
                    Khôi phục
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

const getCheckTgianKT = ({ soBuoi, ngayBatDau }) => {
  let ngayBD = new Date(ngayBatDau);
  let ngayKT = new Date(ngayBatDau);

  ngayKT.setDate(ngayKT.getDate() + (soBuoi + 0) * 7);

  let status = "";
  let day = new Date();

  if (day > ngayKT) {
    status = "Kết thúc";
  } else if (ngayBD > day) {
    status = "Chờ mở lớp";
  } else {
    status = "Đang học";
  }

  return { status, ngayKetThuc: formatStringDate2(ngayKT) };
};
