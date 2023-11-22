import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNhanVienApi,
  insertNhanVienApi,
} from "../../../redux/reducers/nhanVienReducer";
import { getAllTaiKhoanApi } from "../../../redux/reducers/taiKhoanReducer";
import { getAllChucVuApi } from "../../../redux/reducers/chucVuReducer";

export default function FormAddNhanVien() {
  const dispatch = useDispatch();
  //
  let { arrTaiKhoan } = useSelector((state) => state.taiKhoanReducer);
  let { arrChucVu } = useSelector((state) => state.chucVuReducer);
  let { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  //
  let objNhanVien = useRef({
    tenNV: "",
    sDT: "",
    email: "",
    txtTaiKhoan: "",
    chucVu: {},
  });
  let [errNhanVien, setErrNhanVien] = useState({
    tenNV: "",
    sDT: "",
    email: "",
    chucVu: "",
    taiKhoan: "",
  });

  useEffect(() => {
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }
    if (arrTaiKhoan.length === 0) {
      dispatch(getAllTaiKhoanApi);
    }
    if (arrChucVu.length === 0) {
      dispatch(getAllChucVuApi);
    } else {
      objNhanVien.current = {
        tenNV: "",
        sDT: "",
        email: "",
        txtTaiKhoan: "",
        chucVu: arrChucVu[0],
      };
    }
  }, []);

  const checkData = () => {
    let result = 1;
    let err_tenNV = "";
    let err_sDT = "";
    let err_email = "";
    let err_chucVu = "";
    let err_taiKhoan = "";

    let regexEmail = new RegExp(
      /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    );
    let regexPhone = new RegExp(/^\d{9,12}$/);

    let { tenNV, sDT, email, txtTaiKhoan, chucVu } = objNhanVien.current;

    if (txtTaiKhoan.trim().length === 0) {
      err_taiKhoan = "Hãy nhập thông tin!";
      result = false;
    }
    //
    if (chucVu == null || Object.keys(chucVu).length === 0) {
      err_chucVu = "Hãy chọn thông tin!";
      result = false;
    }
    //
    if (email.trim().length === 0) {
      result = false;
      err_email = "Hãy nhập thông tin!";
    } else if (!regexEmail.test(email)) {
      err_email = "Hãy nhập đúng định danh của email!";
      result = false;
    }
    //
    if (sDT.trim().length === 0) {
      err_sDT = "Hãy nhập thông tin!";
      result = false;
    } else if (sDT.trim().length < 9 || sDT.trim().length > 15) {
      err_sDT = "Số điện thoại có trên 9 số và nhỏ hơn 15 số!";
      result = false;
    } else if (!regexPhone.test(sDT)) {
      err_sDT = "Hãy nhập các ký tự số!";
      result = false;
    }
    //
    if (tenNV.trim().length === 0) {
      err_tenNV = "Hãy nhập thông tin!";
      result = false;
    }

    setErrNhanVien({
      tenNV: err_tenNV,
      sDT: err_sDT,
      email: err_email,
      chucVu: err_chucVu,
      taiKhoan: err_taiKhoan,
    });

    return result;
  };

  // handle
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkData()) {
      return;
    }
    //true
    // check trung Tai khoan
    let objTaiKhoan = arrTaiKhoan.find(
      (item) => item.tenDangNhap == objNhanVien.current.txtTaiKhoan
    );

    if (objTaiKhoan != null) {
      alert("Trùng tài khoản!");
      return;
    }
    //
    let maNhanVien = getRandomMaNV(arrNhanVien);
    //
    let { txtTaiKhoan, chucVu } = objNhanVien.current;

    let quyen = {};

    if (chucVu.tenCV.includes("Nhân viên quản lý")) {
      quyen = {
        maQuyen: 1,
        tenQuyen: "Người quản lý",
      };
    } else {
      quyen = {
        maQuyen: 3,
        tenQuyen: "Nhân viên",
      };
    }

    let taiKhoan = {
      maTK: maNhanVien,
      tenDangNhap: txtTaiKhoan,
      matKhau: "123456A",
      quyen,
    };

    objNhanVien.current = { ...objNhanVien.current, maNhanVien, taiKhoan };

    dispatch(insertNhanVienApi(objNhanVien.current));
  };
  //
  const handleChangeText = (e) => {
    let { id, value } = e.target;

    objNhanVien.current[id] = value;

    if (value.trim().length === 0) {
      setErrNhanVien({ ...errNhanVien, [id]: "Hãy nhập thông tin!" });
    } else {
      setErrNhanVien({ ...errNhanVien, [id]: "" });
    }
  };
  //
  const handleChangeTextTaiKhoan = (e) => {
    let { id, value } = e.target;

    objNhanVien.current[id] = value;

    if (value.trim().length === 0) {
      setErrNhanVien({ ...errNhanVien, taiKhoan: "Hãy nhập thông tin!" });
    } else {
      setErrNhanVien({ ...errNhanVien, taiKhoan: "" });
    }
  };
  //
  const handleChangeChucVu = (e) => {
    let idChucvu = e.target.value;

    let objData = arrChucVu.find((item) => {
      return item.maCV == idChucvu;
    });

    objNhanVien.current.chucVu = { ...objData };
    setErrNhanVien({ ...errNhanVien, chucVu: "" });
  };

  //render
  const renderSelectChucVu = () => {
    if (Object.keys(objNhanVien.current.chucVu).length === 0) {
      return (
        <>
          <option value={-1} selected>
            Tất cả
          </option>
          {arrChucVu.map((item, index) => {
            return (
              <option key={index} value={item.maCV}>
                {item.tenCV}
              </option>
            );
          })}
        </>
      );
    }
    return arrChucVu.map((item, index) => {
      return (
        <option key={index} value={item.maCV}>
          {item.tenCV}
        </option>
      );
    });
  };
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý nhân viên", link: "/quan-ly/nhan-vien" },
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
                {/* body */}
                <div>
                  <h2 className="mx-3 mb-3 ">Thêm nhân viên</h2>
                  <div className="row">
                    {/* left */}
                    <div className="col-md-6">
                      {/* input ten NV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="tenNV" className="form-label ms-2">
                          Họ và tên
                          <small
                            id="errTenNV"
                            className="form-text text-danger mx-2"
                          >
                            *{errNhanVien.tenNV}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control p-2"
                          name="tenNV"
                          id="tenNV"
                          aria-describedby="errTenNV"
                          placeholder="Nguyễn Văn A..."
                          onChange={handleChangeText}
                        />
                      </div>

                      {/* input email NV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="email" className="form-label ms-2">
                          Địa chỉ email
                          <small
                            id="errEmail"
                            className="form-text text-danger mx-2"
                          >
                            *{errNhanVien.email}
                          </small>
                        </label>
                        <input
                          type="email"
                          className="form-control p-2"
                          name="email"
                          id="email"
                          aria-describedby="errEmail"
                          placeholder="AVan@gmail.com"
                          onChange={handleChangeText}
                        />
                      </div>

                      {/* input phone NV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="sDT" className="form-label ms-2">
                          Số điện thoại
                          <small
                            id="errSoDT"
                            className="form-text text-danger mx-2"
                          >
                            *{errNhanVien.sDT}
                          </small>
                        </label>
                        <input
                          type="tel"
                          className="form-control p-2"
                          name="sDT"
                          id="sDT"
                          aria-describedby="errSoDT"
                          placeholder="0951753001"
                          onChange={handleChangeText}
                        />
                      </div>
                    </div>
                    {/* right */}
                    <div className="col-md-6">
                      {/* select KHoa */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="selChucVu" className="form-label ms-2">
                          Chức vụ công tác
                          <small className="form-text text-danger mx-2">
                            *{errNhanVien.chucVu}
                          </small>
                        </label>
                        <select
                          className="form-select p-2 form-select-ms"
                          name="selChucVu"
                          id="selChucVu"
                          onChange={handleChangeChucVu}
                        >
                          {renderSelectChucVu()}
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
                            *{errNhanVien.taiKhoan}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control p-2"
                          name="txtTaiKhoan"
                          id="txtTaiKhoan"
                          aria-describedby="errTaiKhoan"
                          placeholder="nhanvien1..."
                          onChange={handleChangeTextTaiKhoan}
                        />
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

          <Footer />
        </div>
      </div>
    </>
  );
}

const getRandomMaNV = (arrData) => {
  if (arrData.length === 0) {
    return "NV001";
  }
  let idNext = "";
  let objDataLast = arrData[arrData.length - 1];

  let strId = objDataLast.maNV.slice(2);

  let intId = parseInt(strId) + 1;

  if (intId < 10) {
    idNext = "NV00" + intId;
  } else if (intId < 100) {
    idNext = "NV0" + intId;
  } else {
    idNext = "NV" + intId;
  }
  return idNext;
};
