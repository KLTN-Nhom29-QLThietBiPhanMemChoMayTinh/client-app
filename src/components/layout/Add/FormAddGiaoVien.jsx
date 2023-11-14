import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllKhoaApi } from "../../../redux/reducers/khoaReducer";

export default function FormAddGiaoVien() {
  const dispatch = useDispatch();
  //
  let { arrKhoa } = useSelector((state) => state.khoaReducer);

  //
  let objGiaoVien = useRef({
    hoTen: "",
    soDienThoai: "",
    email: "",
    hocVi: "Thạc sĩ",
    taiKhoan: {},
    khoa: {},
  });
  let [errGiaoVien, setErrGiaoVien] = useState({
    hoTen: "",
    soDienThoai: "",
    email: "",
    khoa: "",
  });

  //
  useEffect(() => {
    if (arrKhoa.length === 0) {
      dispatch(getAllKhoaApi);
    } else {
      objGiaoVien.current = {
        hoTen: "",
        soDienThoai: "",
        email: "",
        hocVi: "Thạc sĩ",
        taiKhoan: {},
        khoa: arrKhoa[0],
      };
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
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(objGiaoVien.current);
    if (checkData()) {
      // true
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

    let regexEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    let regexPhone = new RegExp(
      "\d{9,12}"
    );

    let { hoTen, soDienThoai, email, khoa } = objGiaoVien.current;

    console.log(regexPhone.test(soDienThoai));

    if (hoTen.trim().length === 0) {
      errhoTen = "Hãy nhập thông tin!";
    }
    if (soDienThoai.trim().length === 0) {
      errsoDienThoai = "Hãy nhập thông tin!";
    } else if (soDienThoai.trim().length < 9 || soDienThoai.trim().length > 15) {
      errsoDienThoai = "Số điện thoại có trên 9 số và nhỏ hơn 15 số!";
    }
    
    
    // if(regexPhone.test(soDienThoai)) {
    // }

    setErrGiaoVien({
      hoTen: errhoTen,
      soDienThoai: errsoDienThoai,
      email: erremail,
      khoa: errkhoa,
    })

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
                  <h2 className="mx-3 mb-3 ">Thêm giáo viên</h2>
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
                          <option value="Thạc sĩ">Thạc sĩ</option>
                          <option value="Tiến sĩ">Tiến sĩ</option>
                          <option value="Giáo sư">Giáo sư</option>
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
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="reset" class="btn btn-danger mx-3">
                    Khôi phục
                  </button>
                  <button type="submit" class="btn btn-success mx-3">
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
