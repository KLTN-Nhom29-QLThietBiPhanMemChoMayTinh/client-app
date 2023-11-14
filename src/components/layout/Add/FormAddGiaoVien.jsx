import React, { useEffect } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { useSelector } from "react-redux";

export default function FormAddGiaoVien() {

  let {arrKhoa } = useSelector(state => state.khoaReducer);

  

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
              <form className="d-flex h-100 justify-content-between flex-column">
                <div className="">
                  <h2 className="mx-3 mb-3 text-center">Thêm giáo viên</h2>
                  <div className="row">
                    {/* left */}
                    <div className="col-md-6">
                      {/* input ten GV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="txtTenGV" className="form-label ms-2">
                          Họ và tên
                          <small
                            id="errTenGV"
                            className="form-text text-danger mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control p-2"
                          name="txtTenGV"
                          id="txtTenGV"
                          aria-describedby="errTenGV"
                          placeholder="Nguyễn Văn A..."
                        />
                      </div>

                      {/* input email GV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="txtEmail" className="form-label ms-2">
                          Địa chỉ email
                          <small
                            id="errEmail"
                            className="form-text text-danger mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="email"
                          className="form-control p-2"
                          name="txtEmail"
                          id="txtEmail"
                          aria-describedby="errEmail"
                          placeholder="AVan@gmail.com"
                        />
                      </div>

                      {/* input phone GV */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="txtSoDT" className="form-label ms-2">
                          Số điện thoại
                          <small
                            id="errSoDT"
                            className="form-text text-danger mx-2"
                          >
                            *
                          </small>
                        </label>
                        <input
                          type="tel"
                          className="form-control p-2"
                          name="txtSoDT"
                          id="txtSoDT"
                          aria-describedby="errSoDT"
                          placeholder="0951753001"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {/* select Học vị */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="selHocVi ms-2" className="form-label">
                          Học vị
                          <small className="form-text text-danger mx-2">
                            *
                          </small>
                        </label>
                        <select
                          className="form-select p-2 form-select-ms"
                          name="selHocVi"
                          id="selHocVi"
                        >
                          <option value>Thạc sĩ</option>
                          <option value>Tiến sĩ</option>
                          <option value>Giáo sư</option>
                        </select>
                      </div>

                      {/* select KHoa */}
                      <div className="mb-3 col-md-9">
                        <label htmlFor="selKhoa" className="form-label ms-2">
                          Khoa công tác
                          <small className="form-text text-danger mx-2">
                            *
                          </small>
                        </label>
                        <select
                          className="form-select p-2 form-select-ms"
                          name="selKhoa"
                          id="selKhoa"
                        >
                          <option value={-1} selected>Tất cả</option>
                          <option value>New Delhi</option>
                          <option value>Istanbul</option>
                          <option value>Jakarta</option>
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
