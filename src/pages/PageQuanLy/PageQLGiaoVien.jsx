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
import { getAllGiaoVienApi, setValueSearchGiaoVien } from "../../redux/reducers/giaoVienReducer";
import { formatNameByHocVi } from "../../util/config";

export default function PageQLGiaoVien() {

  const dispatch = useDispatch();

  const { arrGiaoVienSearch } = useSelector((state) => state.giaoVienReducer);

  useEffect(() => {
    dispatch(getAllGiaoVienApi);
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    dispatch(setValueSearchGiaoVien(e.target.value))
  };
  //render
  const renderDataGiaoVien = () => {

    return arrGiaoVienSearch?.map((item, index) => {
      let ngaySinh = new Date(item.ngaySinh);
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.idCode}</td>
          <td>{formatNameByHocVi(item)}</td>
          <td>{ngaySinh.getYear() + 1900}</td>
          <td>{item?.sdt}</td>
          <td>{item?.email}</td>
          <td>{item?.tenKhoa}</td>
          <td>{item?.chucVu}</td>

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
    { name: "Quản lý khoa", link: "../quan-ly/khoa" },
    { name: "Quản lý giáo viên", link: "" },
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
              <h2 style={{ margin: "0" }}>Danh sách giáo viên</h2>
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
                  // to="/quan-ly/giao-vien/add"
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
              <table className="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Mã giáo viên</th>
                    <th style={{ minWidth: "200px" }}>Tên giáo viên</th>
                    <th style={{ minWidth: "80px" }}>Năm sinh</th>
                    <th style={{ minWidth: "110px" }}>Số điện thoại</th>
                    <th style={{ minWidth: "120px" }}>Email</th>
                    <th style={{ minWidth: "180px" }}>Tên khoa</th>
                    <th style={{ minWidth: "120px" }}>Chức vụ</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataGiaoVien()}
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
