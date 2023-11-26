import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { formatStringDate, formatStringDate2 } from "../../../util/config";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPhanMemApi,
  insertPhanMemApi,
  updatePhanMemApi,
} from "../../../redux/reducers/phanMemReducer";
import { useLocation, useNavigate } from "react-router-dom";

let date = new Date();
let dateYear = date.getFullYear();
let dateYearMin = date.getFullYear() - 5;
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;
let strDateMin = `${dateYearMin}-${dateMonth}-${dateDay}`;

//
let objData_old = {};
//
export default function FormUpdatePhanMem() {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //
  let { arrPhanMem } = useSelector((state) => state.phanMemReducer);
  //
  let objPhanMem = useRef({
    tenPhanMem: "",
    status: true, //thể hiện trang thai của phần mêm
    moTa: "",
    ngaySD: formatStringDate2(),
    tgianBaoHanh: 1,
    ngayKT: "00/00/0000",
    phienBan: "",
  });
  let [errPhanMem, setErrPhanMem] = useState({
    tenPhanMem: "",
    moTa: "",
    ngaySD: "",
    tgianBaoHanh: "",
    phienBan: "",
  });
  //
  useEffect(() => {
    if (objParam.id == null) {
      navigate("/quan-ly/phan-mem");
    }
    //
    if (arrPhanMem.length === 0) {
      // get all PM
      // dispatch(getAllPhanMemApi);
      //
      //tim theo api idPM
      navigate("/quan-ly/phan-mem");
    } else {
      objData_old = arrPhanMem.find((item) => item.maPhanMem == objParam.id);
    }
    //
    let { tenPhanMem, trangThai, moTa, phienBan, tuoiTho, ngayCaiDat } =
      objData_old;

    //
    let ngaySD = formatStringDate2(new Date(ngayCaiDat));
    let tgianBaoHanh = tuoiTho;
    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objPhanMem.current = {
      tenPhanMem,
      moTa,
      ngaySD,
      tgianBaoHanh,
      ngayKT,
      status: trangThai,
      phienBan,
    };
    setErrPhanMem({ ...errPhanMem });
  }, []);

  // handle
  //
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkData()) {
      // false
      return;
    }
    // true

    let { tenPhanMem, moTa, ngaySD, phienBan, tgianBaoHanh, ngayKT } =
      objPhanMem.current;

    let phanMemNew = {
      maPhanMem: objData_old.maPhanMem,
      tenPhanMem,
      trangThai: true,
      moTa,
      phienBan,
      tuoiTho: tgianBaoHanh,
      ngayCaiDat: new Date(ngaySD),
    };
    //
    dispatch(updatePhanMemApi(phanMemNew));
  };
  const checkData = () => {
    let check = 1;
    let err_tenTBi = "";
    let err_phienBan = "";
    let { tenPhanMem, phienBan } = objPhanMem.current;

    //
    if (tenPhanMem.trim().length === 0) {
      err_tenTBi = "Hãy nhập thông tin!";
      check = 0;
    }
    //
    if (phienBan.trim().length === 0) {
      err_phienBan = "Hãy nhập thông tin!";
      check = 0;
    }

    setErrPhanMem({
      ...errPhanMem,
      tenPhanMem: err_tenTBi,
      phienBan: err_phienBan,
    });

    return check;
  };
  //
  const handleChangeTrangThai = (e) => {
    let value = e.target.value;
    if (value == 1) {
      objPhanMem.current.status = true;
    } else {
      let tgianBaoHanh = objData_old.tuoiTho;
      let ngaySD = objPhanMem.current.ngaySD;
      let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });
      objPhanMem.current = {
        ...objPhanMem.current,
        status: false,
        tgianBaoHanh,
        ngayKT,
      };
    }

    setErrPhanMem({ ...errPhanMem });
  };
  //
  const handleChangeTgianBH = (e) => {
    let value = e.target.value;

    if (value == 0) {
      value = 1;
      setErrPhanMem({
        ...errPhanMem,
        tgianBaoHanh: "Thời gian bảo hành phải lớn hơn 0",
      });
      return;
    }
    if (value >= 50) {
      value = 50;
      setErrPhanMem({
        ...errPhanMem,
        tgianBaoHanh: "Thời gian bảo hành phải nhỏ hơn 50",
      });
      return;
    }

    let ngaySD = objPhanMem.current.ngaySD;
    let tgianBaoHanh = parseInt(value);

    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objPhanMem.current = {
      ...objPhanMem.current,
      tgianBaoHanh,
      status,
      ngayKT,
    };

    setErrPhanMem({
      ...errPhanMem,
      tgianBaoHanh: "",
    });
  };

  //
  const handleChangeNgaySD = (e) => {
    let ngaySD = e.target.value;

    let tgianBaoHanh = objPhanMem.current.tgianBaoHanh;
    let { status, ngayKT } = getCheckTgianKT({ tgianBaoHanh, ngaySD });

    objPhanMem.current = {
      ...objPhanMem.current,
      ngaySD,
      status,
      ngayKT,
    };

    setErrPhanMem({ ...errPhanMem });
  };
  //
  const handleChangeText = (e) => {
    let { value, id } = e.target;
    objPhanMem.current[id] = value;

    if (value.length === 0) {
      setErrPhanMem({ ...errPhanMem, [id]: "Hãy nhập thông tin!" });
    } else {
      setErrPhanMem({ ...errPhanMem, [id]: "" });
    }
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý phần mềm", link: "/quan-ly/phan-mem" }];
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
              <NavTab itemLink={{ arrLinkNavTab, chucNang: "Chỉnh sửa" }} />
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
                  <h2 className="mx-3 mb-3 ">Chỉnh sửa phần mềm</h2>
                  <div className="row">
                    <div className="col-6">
                      {/* left */}
                      {/* ten Tbi */}
                      <div className="mb-3 col-10">
                        <label htmlFor="tenPhanMem" className="form-label">
                          Tên phần mềm
                          <small
                            id="helpIdTenPM"
                            className="form-text text-danger mx-2"
                          >
                            *{errPhanMem.tenPhanMem}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="tenPhanMem"
                          id="tenPhanMem"
                          value={objPhanMem.current.tenPhanMem}
                          onChange={handleChangeText}
                          aria-describedby="helpIdTenPM"
                          placeholder="Phần mềm Excel..."
                        />
                      </div>
                      {/* phien bản */}
                      <div className="mb-3 col-10">
                        <label htmlFor="phienBan" className="form-label">
                          Phiên bản
                          <small
                            id="helpIdPhienban"
                            className="form-text text-danger mx-2"
                          >
                            *{errPhanMem.phienBan}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="phienBan"
                          id="phienBan"
                          value={objPhanMem.current.phienBan}
                          onChange={handleChangeText}
                          aria-describedby="helpIdPhienban"
                          placeholder="2023..."
                        />
                      </div>
                      {/* Mota */}
                      <div className="mb-3 col-10">
                        <label htmlFor="moTa" className="form-label">
                          Mô tả{" "}
                          <span className="form-text text-danger">
                            *{errPhanMem.moTa}
                          </span>
                        </label>
                        <textarea
                          className="form-control"
                          name="moTa"
                          id="moTa"
                          value={objPhanMem.current.moTa}
                          onChange={handleChangeText}
                          rows={5}
                        />
                      </div>

                      {/*  */}
                    </div>
                    <div className="col-6">
                      {/* Ngay su dung */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtNgay" className="form-label">
                          Ngày sử dụng
                          <small
                            id="helpIdNgaySD"
                            className="form-text text-muted mx-2"
                          >
                            *{errPhanMem.ngaySD}
                          </small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="txtNgay"
                          id="txtNgay"
                          onChange={handleChangeNgaySD}
                          value={objPhanMem.current.ngaySD}
                          max={strDate}
                          min={strDateMin}
                          aria-describedby="helpIdNgaySD"
                          placeholder="01/01/2023"
                          disabled={true}
                        />
                      </div>

                      {/* tgian bao hanh */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtTgianBaoHanh" className="form-label">
                          Thời hạn sử dụng ( tháng )
                          <small
                            id="helpIdtgian"
                            className="form-text text-danger mx-2"
                          >
                            *{errPhanMem.tgianBaoHanh}
                          </small>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="txtTgianBaoHanh"
                          id="txtTgianBaoHanh"
                          min={1}
                          value={objPhanMem.current.tgianBaoHanh}
                          disabled={!objPhanMem.current.status}
                          max={50}
                          onChange={handleChangeTgianBH}
                          aria-describedby="helpIdtgian"
                        />
                      </div>

                      {/* Ngay het han */}
                      <div className="mb-3 col-10">
                        <label className="form-label">
                          Ngày hết hạn
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
                          value={objPhanMem.current.ngayKT}
                        />
                      </div>

                      {/* Trang thai */}
                      <div className="mb-3 col-10">
                        <label className="form-label">
                          Trạng thái
                          <small
                            id="helpId"
                            className="form-text text-danger mx-2"
                          >
                            *
                          </small>
                        </label>

                        <select
                          onChange={handleChangeTrangThai}
                          className="form-select "
                        >
                          <option
                            selected={objPhanMem.current.status == 1 ? 1 : 0}
                            value={1}
                          >
                            Đang sử dụng
                          </option>
                          <option
                            selected={objPhanMem.current.status == 0 ? 1 : 0}
                            value={0}
                          >
                            Bị hỏng
                          </option>
                        </select>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="submit" className="btn btn-success mx-3">
                    Chỉnh sửa
                  </button>
                  <button
                    type="reset"
                    onClick={() => {}}
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
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
