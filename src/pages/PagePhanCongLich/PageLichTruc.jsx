import React, { useEffect } from "react";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink } from "react-router-dom";

export default function PageLichTruc() {
  //render 
  const renderDataGiaoVien = () => {
    const item = {
      maLich: 1,
      tgian: "2023-10-30T17:00:00.000+00:00",
      thoiGianBatDau: 6,
      thoiGianKetThuc: 14,
      soNgayNghi: 0,
      nhanVien: {
        maNV: "NV003",
        tenNV: "Nhân văn Viên 3",
        email: "email3@example.com",
        sDT: "0951753002",
        chucVu: {
          maCV: 2,
          tenCV: "Nhân viên hỗ trợ",
        },
      },
      tang: {
        maTang: 2,
        tenTang: "Tầng 2",
      },
    };
    let index =1 ;
    //  ===============

    let tgian  = new Date(item.tgian)

    let strTgian = `${tgian.getMonth()+1} - ${tgian.getFullYear()}`
    let strCaTruc = `${item.thoiGianBatDau}h - ${item.thoiGianKetThuc}h`;
    return (
      <>
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.tang.tenTang}</td>
          <td>{item.nhanVien.tenNV}</td>
          <td>{item.nhanVien.sDT}</td>
          <td>{strTgian}</td>
          <td>{strCaTruc}</td>
          <td>{item.soNgayNghi}</td>

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              // to={"/quan-ly/giao-vien/update"}
              onClick={() => {
                alert(`Update -- ${item.id} -- dang cập nhật!`);
                // co the truyển data len redux từ đây rồi sang trang kia lấy về sau
              }}
            >
              <button
                type="button"
                className="btn btn-primary mx-2 px-2"
                style={{ padding: "2px" }}
              >
                <FaPencilAlt color="white" size={16} />
              </button>
            </NavLink>
            <button
              onClick={() => {
                alert(`Del -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
            {/* <NavLink
              // to={`../quan-ly/phong`}
              onClick={() => {
                alert(`Chi tiết -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </NavLink> */}
          </td>
        </tr>
      </>
    )
  }

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Phân công lịch trực", link: "" }];
  //

  return (
    <div className="container " style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column justify-content-between "
        style={{ height: "100vh" }}
      >
        <div style={{ height: "80vh" }}>
          {/*  */}
          <div style={{ height: "8vh" }}>
            <NavTab itemLink={{ arrLinkNavTab, chucNang: "Phân công" }} />
          </div>
          {/* table data */}
          <div className="bg-white rounded p-3" style={{ height: "82vh" }}>
            {/* Phần top với tiêu đề và thanh tìm kiếm - btn thêm */}
            <div
              style={{
                marginBottom: "20px",
                height: "6vh",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <h2 style={{ margin: "0" }}>Phân công lịch trực</h2>
              <div></div>

              {/* select - option */}
              {/* {renderSelectTrangThai()} */}
              <div></div>
              <div></div>

              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  id
                  placeholder="tìm kiếm..."
                  // onChange={handleChangeSearch}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Btn them */}
                <NavLink
                  to="/phan-cong/lich-truc/add"
                  type="button"
                  className="btn btn-success ms-4 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "100px" }}>Tầng trực</th>
                    <th style={{ minWidth: "180px" }}>Tên nhân viên</th>
                    <th style={{ minWidth: "80px" }}>Số liên lạc </th>
                    <th style={{ minWidth: "120px" }}>
                      Thời gian trực( tháng )
                    </th>
                    <th style={{ minWidth: "120px" }}>Ca trực(giờ)</th>
                    <th style={{ minWidth: "180px" }}>Số ngày nghỉ</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {renderDataGiaoVien()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

const lichTruc1 = {
  maLich: 1,
  tgian: 10,
  thoiGianBatDau: 6,
  thoiGianKetThuc: 14,
  soNgayNghi: 0,
  nhanVien: {
    maNV: "NV003",
    tenNV: "Nhân văn Viên 3",
    email: "email3@example.com",
    sDT: "0951753002",
    chucVu: {
      maCV: 2,
      tenCV: "Nhân viên hỗ trợ",
    },
  },
  tang: {
    maTang: 2,
    tenTang: "Tầng 2",
  },
};
