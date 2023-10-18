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
import { getAllTaiKhoanApi } from "../../redux/reducers/taiKhoanReducer";


export default function PageQLTaiKhoan() {

  const dispatch = useDispatch();

  const { arrTaiKhoanSearch } = useSelector((state) => state.taiKhoanReducer);

  useEffect(() => {
      dispatch(getAllTaiKhoanApi);
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    // dispatch(setValueSearchTaiKhoan(e.target.value))
  };
  //render
  const renderDataTaiKhoan = () => {

    return arrTaiKhoanSearch?.map((item, index) => {

      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.idCode}</td>
          <td>{item.userName}</td>
          <td>{item.quyen.mota}</td>
          <td>{item.mota.idCode}</td>
          <td>{item.mota.name}</td>

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
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
            <NavLink
              // to={`../quan-ly/phong`}
              onClick={() => {
                alert(`Chi tiết -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </NavLink>
          </td>
        </tr>
      );
    });
  };
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tài khoản", link: "" },
  ];
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
              <h2 style={{ margin: "0" }}>Danh sách tài khoản</h2>
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
                  onChange={handleChangeSearch}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Btn them */}
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
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Mã tài khoản</th>
                    <th style={{ minWidth: "200px" }}>Tên đăng nhập</th>
                    <th style={{ minWidth: "100px" }}>Quyền sử dụng</th>
                    <th style={{ minWidth: "100px" }}>Mã người dùng</th>
                    <th style={{ minWidth: "110px" }}>Tên người dùng</th>
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
  )
}
