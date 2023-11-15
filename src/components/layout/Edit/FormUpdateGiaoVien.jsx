import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllKhoaApi } from "../../../redux/reducers/khoaReducer";
import {
  getAllGiaoVienApi,
  insertGiaoVienApi,
  updateGiaoVienApi,
} from "../../../redux/reducers/giaoVienReducer";
import {
  getAllTaiKhoanApi,
  insertTaiKhoanApi,
} from "../../../redux/reducers/taiKhoanReducer";
import { useLocation, useNavigate } from "react-router-dom";

let objData_old = {};

export default function FormUpdateGiaoVien() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  let { arrTaiKhoan } = useSelector((state) => state.taiKhoanReducer);
  let { arrKhoa } = useSelector((state) => state.khoaReducer);
  const { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  //
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //
  let objGiaoVien = useRef({
    hoTen: "",
    soDienThoai: "",
    email: "",
    hocVi: "Thạc sĩ",
    taiKhoan: {},
    txtTaiKhoan: "",
    khoa: {},
  });
  let [errGiaoVien, setErrGiaoVien] = useState({
    hoTen: "",
    soDienThoai: "",
    email: "",
    khoa: "",
    taiKhoan: "",
  });

  //3
  useEffect(() => {
    if (objParam.id == null) {
      navigate("/quan-ly/giao-vien");
    }
    if (arrGiaoVien.length === 0) {
      navigate("/quan-ly/giao-vien");
    } else {
      objData_old = arrGiaoVien.find((item) => item.maGiaoVien == objParam.id);
      objGiaoVien.current = {
        ...objData_old,
        txtTaiKhoan: objData_old.taiKhoan.tenDangNhap,
      };
      objData_old = {...objData_old,txtTaiKhoan: objData_old.taiKhoan.tenDangNhap }
      setErrGiaoVien({ ...errGiaoVien });
    }
    if (arrTaiKhoan.length === 0) {
      dispatch(getAllTaiKhoanApi);
    }
  }, []);

  // handle
  const handleChangeText = (e) => {
    let { id, value } = e.target;

    objGiaoVien.current[id] = value;

    if (value.trim().length === 0) {
      setErrGiaoVien({ ...errGiaoVien, [id]: "Hãy nhập thông tin!" });
    } else {
      setErrGiaoVien({ ...errGiaoVien, [id]: "" });
    }
  };
  //
  const handleChangeHocVi = (e) => {
    objGiaoVien.current.hocVi = e.target.value;
  };
  //
  const handleChangeKhoa = (e) => {
    let idKhoa = e.target.value;

    let arrdata = arrKhoa.filter((item) => item.maKhoa == idKhoa);

    objGiaoVien.current.khoa = arrdata[0];

    setErrGiaoVien({ ...errGiaoVien, khoa: "" });
  };
  //
  const handleChangeTextTaiKhoan = (e) => {
    let { id, value } = e.target;

    objGiaoVien.current[id] = value;

    if (value.trim().length === 0) {
      setErrGiaoVien({ ...errGiaoVien, taiKhoan: "Hãy nhập thông tin!" });
    } else {
      setErrGiaoVien({ ...errGiaoVien, taiKhoan: "" });
    }
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkData()) {
      // true
      //
      dispatch(updateGiaoVienApi(objGiaoVien.current));
    }
    // false
  };

  //
  const checkData = () => {
    let result = 1;

    let errhoTen = "";
    let errsoDienThoai = "";
    let erremail = "";
    let errkhoa = "";
    let errTaiKhoan = "";

    let regexEmail = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    let regexPhone = new RegExp(/^\d{9,12}$/);

    let { hoTen, soDienThoai, email, khoa, txtTaiKhoan } = objGiaoVien.current;

    if (hoTen.trim().length === 0) {
      errhoTen = "Hãy nhập thông tin!";
      result = false;
    }
    //
    if (soDienThoai.trim().length === 0) {
      errsoDienThoai = "Hãy nhập thông tin!";
      result = false;
    } else if (
      soDienThoai.trim().length < 9 ||
      soDienThoai.trim().length > 15
    ) {
      errsoDienThoai = "Số điện thoại có trên 9 số và nhỏ hơn 15 số!";
      result = false;
    } else if (!regexPhone.test(soDienThoai)) {
      errsoDienThoai = "Hãy nhập các ký tự số!";
      result = false;
    }
    //
    if (email.trim().length === 0) {
      result = false;
      erremail = "Hãy nhập thông tin!";
    } else if (!regexEmail.test(email)) {
      erremail = "Hãy nhập đúng định danh của email!";
      result = false;
    }
    //
    if (khoa == null || Object.keys(khoa).length === 0) {
      errkhoa = "Hãy chọn một khoa!";
      result = false;
    }
    //

    if (txtTaiKhoan.trim().length === 0) {
      errTaiKhoan = "Hãy nhập thông tin!";
      result = false;
    }

    //
    setErrGiaoVien({
      hoTen: errhoTen,
      soDienThoai: errsoDienThoai,
      email: erremail,
      khoa: errkhoa,
      taiKhoan: errTaiKhoan,
    });

    return result;
  };

  // render
  const renderSelectKhoa = () => {
    if (Object.keys(objGiaoVien.current.khoa).length === 0) {
      return (
        <>
          <option value={-1} selected>
            Tất cả
          </option>
          {arrKhoa.map((item, index) => {
            return (
              <option key={index} value={item.maKhoa}>
                {item.tenKhoa}
              </option>
            );
          })}
        </>
      );
    }

    return arrKhoa.map((item, index) => {
      let { khoa } = objGiaoVien.current;
      if (khoa.maKhoa == item.maKhoa) {
        return (
          <option key={index} selected value={item.maKhoa}>
            {item.tenKhoa}
          </option>
        );
      }
      return (
        <option key={index} value={item.maKhoa}>
          {item.tenKhoa}
        </option>
      );
    });
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khoa", link: "../quan-ly/khoa" },
    { name: "Quản lý giáo viên", link: "/quan-ly/giao-vien" },
  ];
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
                <div className="">
                  <h2 className="mx-3 mb-3 ">Chỉnh sửa giáo viên</h2>
                  <div className="row">
                    {/* left */}
                    <div className="col-md-6">
                      {/* input ten GV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="hoTen" className="form-label ms-2">
                          Họ và tên
                          <small
                            id="errTenGV"
                            className="form-text text-danger mx-2"
                          >
                            *{errGiaoVien.hoTen}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control p-2"
                          name="hoTen"
                          id="hoTen"
                          value={objGiaoVien.current.hoTen}
                          aria-describedby="errTenGV"
                          placeholder="Nguyễn Văn A..."
                          onChange={handleChangeText}
                        />
                      </div>

                      {/* input email GV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="email" className="form-label ms-2">
                          Địa chỉ email
                          <small
                            id="errEmail"
                            className="form-text text-danger mx-2"
                          >
                            *{errGiaoVien.email}
                          </small>
                        </label>
                        <input
                          type="email"
                          className="form-control p-2"
                          name="email"
                          id="email"
                          value={objGiaoVien.current.email}
                          aria-describedby="errEmail"
                          placeholder="AVan@gmail.com"
                          onChange={handleChangeText}
                        />
                      </div>

                      {/* input phone GV */}
                      <div className="mb-3 col-md-9">
                        <label
                          htmlFor="soDienThoai"
                          className="form-label ms-2"
                        >
                          Số điện thoại
                          <small
                            id="errSoDT"
                            className="form-text text-danger mx-2"
                          >
                            *{errGiaoVien.soDienThoai}
                          </small>
                        </label>
                        <input
                          type="tel"
                          className="form-control p-2"
                          name="soDienThoai"
                          id="soDienThoai"
                          value={objGiaoVien.current.soDienThoai}
                          aria-describedby="errSoDT"
                          placeholder="0951753001"
                          onChange={handleChangeText}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* select Học vị */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="selHocVi" className="form-label ms-2">
                          Học vị
                          <small className="form-text text-danger mx-2">
                            *
                          </small>
                        </label>
                        <select
                          className="form-select p-2 form-select-ms"
                          name="selHocVi"
                          id="selHocVi"
                          onChange={handleChangeHocVi}
                        >
                          <option
                            selected={
                              objGiaoVien.current.hocVi == "Thạc sĩ" ? 1 : 0
                            }
                            value="Thạc sĩ"
                          >
                            Thạc sĩ
                          </option>
                          <option
                            selected={
                              objGiaoVien.current.hocVi == "Tiến sĩ" ? 1 : 0
                            }
                            value="Tiến sĩ"
                          >
                            Tiến sĩ
                          </option>
                          <option
                            selected={
                              objGiaoVien.current.hocVi == "Giáo sư" ? 1 : 0
                            }
                            value="Giáo sư"
                          >
                            Giáo sư
                          </option>
                        </select>
                      </div>

                      {/* select KHoa */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="selKhoa" className="form-label ms-2">
                          Khoa công tác
                          <small className="form-text text-danger mx-2">
                            *{errGiaoVien.khoa}
                          </small>
                        </label>
                        <select
                          className="form-select p-2 form-select-ms"
                          name="selKhoa"
                          id="selKhoa"
                          onChange={handleChangeKhoa}
                        >
                          {renderSelectKhoa()}
                        </select>
                      </div>

                      {/* input Tai khoan GV */}
                      <div className="mb-3 col-md-9">
                        <label
                          htmlFor="txtTaiKhoan"
                          className="form-label ms-2"
                        >
                          Tài khoản
                          <small
                            id="errTaiKhoan"
                            className="form-text text-danger mx-2"
                          >
                            *{errGiaoVien.taiKhoan}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control p-2"
                          name="txtTaiKhoan"
                          id="txtTaiKhoan"
                          value={objGiaoVien.current.txtTaiKhoan}
                          aria-describedby="errTaiKhoan"
                          placeholder="giaovien1"
                          // onChange={handleChangeTextTaiKhoan}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button
                    type="reset"
                    onClick={() => {
                      objGiaoVien.current = {
                        ...objData_old,
                        txtTaiKhoan: objData_old.taiKhoan.tenDangNhap,
                      };
                      setErrGiaoVien({
                        hoTen: "",
                        soDienThoai: "",
                        email: "",
                        khoa: "",
                        taiKhoan: "",
                      });
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
                  </button>
                  <button type="submit" className="btn btn-success mx-3">
                    Chỉnh sửa
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

const getRandomMaGV = (arrData) => {
  let idNext = "";
  let objDataLast = arrData[arrData.length - 1];

  let strId = objDataLast.maGiaoVien.slice(2);

  let intId = parseInt(strId) + 1;

  if (intId < 10) {
    idNext = "GV00" + intId;
  } else if (intId < 100) {
    idNext = "GV0" + intId;
  } else {
    idNext = "GV" + intId;
  }
  return idNext;
};
