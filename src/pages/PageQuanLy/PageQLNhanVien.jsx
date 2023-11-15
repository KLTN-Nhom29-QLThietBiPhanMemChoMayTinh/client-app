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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNhanVienApi,
  getAllNhanVienApi,
  setValueSearchNhanVien,
  setValueSelectNhanVienAction,
} from "../../redux/reducers/nhanVienReducer";
import { getAllChucVuApi } from "../../redux/reducers/chucVuReducer";

export default function PageQLNhanVien() {
  const dispatch = useDispatch();

  const { arrNhanVien, arrNhanVienSearch, valueSelect, valueSearch } =
    useSelector((state) => state.nhanVienReducer);
  const { arrChucVu } = useSelector((state) => state.chucVuReducer);

  useEffect(() => {
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }

    if (arrChucVu.length === 0) {
      dispatch(getAllChucVuApi);
    }
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    dispatch(setValueSearchNhanVien(e.target.value));
  };
  //
  const handleChangeSelectChucVu = (e) => {
    dispatch(setValueSelectNhanVienAction(e.target.value));
  };
  //render
  const renderDataNhanVien = () => {
    return arrNhanVienSearch?.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.maNV}</td>
          <td>{item?.tenNV}</td>
          <td>{item?.sDT}</td>
          <td>{item?.email}</td>
          <td>{item.chucVu.tenCV}</td>

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              to={`/quan-ly/nhan-vien/update?id=${item.maNV}`}
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
                if (window.confirm("Bấm vào nút OK để xóa " + item.tenNV)) {
                  dispatch(deleteNhanVienApi(item.maNV));
                }
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
      );
    });
  };
  //
  const renderSelectChucVu = () => {
    return arrChucVu?.map((item, index) => {
      return (
        <option
          key={index}
          selected={item.maCV == valueSelect ? 1 : 0}
          value={item.maCV}
        >
          {item.tenCV}
        </option>
      );
    });
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý nhân viên", link: "" }];
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
            <NavTab itemLink={{ arrLinkNavTab, chucNang: "Danh sách" }} />
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
              <h2 style={{ margin: "0" }}>Danh sách nhân viên</h2>
              <div></div>
              <div></div>
              {/* select - option */}

              <div className="col-2 m-2">
                <select
                  className="form-select"
                  onChange={handleChangeSelectChucVu}
                >
                  <option value="-1" selected>
                    tất cả
                  </option>
                  {renderSelectChucVu()}
                </select>
              </div>

              <div></div>

              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="tìm kiếm..."
                  value={valueSearch}
                  onChange={handleChangeSearch}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Btn them */}
                <NavLink
                  to="/quan-ly/nhan-vien/add"
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
              <table className="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Mã nhân viên</th>
                    <th style={{ minWidth: "150px" }}>Tên nhân viên</th>
                    {/* <th>Năm sinh</th> */}
                    <th style={{ minWidth: "90px" }}>Số điện thoại</th>
                    <th style={{ minWidth: "120px" }}>Email</th>
                    <th style={{ minWidth: "90px" }}>Chức vụ</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataNhanVien()}
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
