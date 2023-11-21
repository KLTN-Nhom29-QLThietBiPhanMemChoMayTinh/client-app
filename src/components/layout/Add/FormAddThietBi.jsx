import React, { useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";

let date = new Date();
let dateYear = date.getFullYear();
let dateYearMin = date.getFullYear() - 5;
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;
let strDateMin = `${dateYearMin}-${dateMonth}-${dateDay}`;

export default function FormAddThietBi() {

    
  let objThietBi = useRef({
    tenTBi: "",
    valSelLoaiTBi: "",
    ngaySD: date,
    status: true,
    tgianBaoHanh: 1,
    ngayKT: "00/00/0000",
  });
  let [errTbi, setErrTBi] = useState({
    tenTBi: "",
    valSelLoaiTBi: "",
    ngaySD: "",
    tgianBaoHanh: "",
  });

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
                        <label htmlFor="txtTenTbi" className="form-label">
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
                          name="txtTenTbi"
                          id="txtTenTbi"
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
                        >
                          <option value>New Delhi</option>
                          <option value>Istanbul</option>
                          <option value>Jakarta</option>
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
                          value={
                            objThietBi.current.tgianBaoHanh == 1
                              ? "Sắp hết hạn"
                              : "Đang sử dụng"
                          }
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
                          value={strDate}
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
                          defaultValue={1}
                          max={50}
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
