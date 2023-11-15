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
  getAllQuyenSDApi,
  getAllTaiKhoanApi,
  getUserbyIdApi,
  setValueSearchTaiKhoan,
  setValueSelectTaiKhoan,
} from "../../redux/reducers/taiKhoanReducer";
import ModalDetailTaiKhoan from "../../components/layout/Modal/ModalTaiKhoan/ModalDetailTaiKhoan";

export default function PageQLTaiKhoan() {
  const dispatch = useDispatch();

  const { arrTaiKhoan, arrTaiKhoanSearch, arrQuyen, valueSearch, valueSelect } =
    useSelector((state) => state.taiKhoanReducer);

  useEffect(() => {
    if (arrTaiKhoan.length === 0) {
      dispatch(getAllTaiKhoanApi);
    }
    if (arrQuyen.length === 0) {
      dispatch(getAllQuyenSDApi);
    }
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    dispatch(setValueSearchTaiKhoan(e.target.value.trim()));
  };
  const handleChangeSelectQuyen = (e) => {
    dispatch(setValueSelectTaiKhoan(e.target.value.trim()));
  };

  //render
  const renderDataTaiKhoan = () => {
    return arrTaiKhoanSearch?.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.maTK}</td>
          <td>{item.tenDangNhap}</td>
          <td>{item.quyen.tenQuyen}</td>
          {/* <td>{strNameQuyen}</td>
          <td>{item.mota.idCode}</td>
          <td>{item.mota.name}</td> */}

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            {/* <NavLink
              // to={"/quan-ly/tai-khoan/update"}
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
            </NavLink> */}

            <button
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
              data-bs-toggle="modal"
              data-bs-target="#modalDetail"
              onClick={() => {
                dispatch(getUserbyIdApi(item));
              }}
            >
              <BiSolidDetail color="white" size={16} />
            </button>

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
          </td>
        </tr>
      );
    });
  };

  const renderSelectQuyenSD = () => {
    return (
      <div className="col-2 mx-2">
        <select className="form-select " onChange={handleChangeSelectQuyen}>
          <option selected={valueSelect == -1 ? 1 : 0} value="-1">
            Tất cả
          </option>
          {arrQuyen.map((item, index) => {
            return (
              <option
                selected={valueSelect == item.maQuyen ? 1 : 0}
                value={item.maQuyen}
                key={index}
              >
                {item.tenQuyen}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý tài khoản", link: "" }];
  //

  return (
    <div className="container " style={{ height: "100vh" }}>
      {/*  */}
      <ModalDetailTaiKhoan />
      {/*  */}
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
              <h2 style={{ margin: "0" }}>Danh sách tài khoản</h2>
              <div></div>
              <div></div>

              {/* select - option */}
              {renderSelectQuyenSD()}
              {/* <div></div> */}

              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  id
                  value={valueSearch}
                  placeholder="tìm kiếm..."
                  onChange={handleChangeSearch}
                />
              </div>

              {/* <div style={{ display: "flex", alignItems: "center" }}>
                <NavLink
                  // to="/quan-ly/tai-khoan/add"
                  onClick={() => {
                    alert(`tạo mới -- dang cập nhật!`);
                  }}
                  type="button"
                  className="btn btn-success ms-4 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div> */}
              <div className="px-3 mx-3"></div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "110px" }}>Mã tài khoản</th>
                    <th style={{ minWidth: "125px" }}>Tên đăng nhập</th>
                    <th style={{ minWidth: "160px" }}>Quyền sử dụng</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataTaiKhoan()}
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
