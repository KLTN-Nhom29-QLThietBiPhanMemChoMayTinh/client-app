import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import NavTab from "../../components/common/NavTab/NavTab";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
import { formatStringDate, formatStringDate3 } from "../../util/config";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMonHocApi,
  getAllMonHoc,
  getDSPhanmem_idMonhoc,
  setValueSelectAction,
  setValueTxtSearchAction,
  setdetailMonHocAction,
} from "../../redux/reducers/monHocReducer";
import ModalDetailMonHoc from "../../components/layout/Detail/DetailMonHoc/ModalDetailMonHoc";

export default function PageQlMonHoc() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { arrMonHocSearch, valueTxtSearch, valueSelect } = useSelector(
    (state) => state.monHocReducer
  );

  // useEffect -- call data mon hoc
  useEffect(() => {
    const action = getAllMonHoc;
    dispatch(action);
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    dispatch(setValueTxtSearchAction(e.target.value.trim()));
  };
  const handleChangeSelectAction = (e) => {
    dispatch(setValueSelectAction(e.target.value.trim()));
  };

  //render
  const renderDataMon = () => {
    return arrMonHocSearch?.map((item, index) => {
      let ngayBD = new Date(item?.ngayBatDau);
      let ngayKT = new Date(item?.ngayBatDau);

      ngayKT.setDate(ngayKT.getDate() + (item?.soBuoi + 1) * 7);

      // render
      const renderTrangThai = (item) => {
        let { dsCaThucHanh, soBuoi, ngayBatDau } = item;
        let ngayBD = new Date(ngayBatDau);
        let ngayKT = new Date(ngayBatDau);
        ngayKT.setDate(ngayKT.getDate() + (soBuoi + 1) * 7);
        let day = new Date();

        if (dsCaThucHanh.length === 0) {
          if (day > ngayKT) {
            return <td style={{ backgroundColor: "#ff6666" }}>Kết thúc</td>;
          }
          return <td style={{ backgroundColor: "#fff563" }}>Chờ mở lớp</td>;
        }
        //
        if (day > ngayBD && day < ngayKT) {
          return <td style={{ backgroundColor: "#4dff7c" }}>Đang học</td>;
        }
        if (ngayBD > day) {
          return <td style={{ backgroundColor: "#fff563" }}>Chờ mở lớp</td>;
        }

        return <td style={{ backgroundColor: "#ff6666" }}>Kết thúc</td>;
      };
      // render btn sua
      const renderBtnSua = (item) => {
        let { soBuoi, ngayBatDau } = item;
        let ngayKT = new Date(ngayBatDau);
        ngayKT.setDate(ngayKT.getDate() + (soBuoi + 1) * 7);
        let day = new Date();
        if (day > ngayKT) {
          return (
            <button
              onClick={() => {
                alert("Môn học đã kết thúc! không thể chỉnh sửa.");
              }}
              type="button"
              className="btn btn-primary mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <FaPencilAlt color="white" size={16} />
            </button>
          );
        }

        return (
          <NavLink
            onClick={() => {
              dispatch(getDSPhanmem_idMonhoc(item.maMon));

              setTimeout(() => {
                navigate(`/quan-ly/mon/update?id=${item.maMon}`);
              }, 200);
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
        );
      };
      // render btnXoa
      const renderBtnXoa = (item) => {
        let { dsCaThucHanh } = item;

        if (dsCaThucHanh.length !== 0) {
          return <></>;
        } else {
          return (
            <button
              onClick={() => {
                if (window.confirm("Bấm vào nút OK để xóa " + item.tenMon)) {
                  dispatch(deleteMonHocApi(item.maMon));
                }
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
          );
        }
      };
      // render btnChitiet
      const renderBtnChiTiet = (item) => {
        let { dsCaThucHanh } = item;

        if (dsCaThucHanh.length === 0) {
          return (
            <button
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
              onClick={() => {
                alert("Chưa có lịch thực hành!");
              }}
            >
              <BiSolidDetail color="white" size={16} />
            </button>
          );
        } else {
          return (
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalIdDetailMonHoc"
              type="button"
              onClick={() => {
                dispatch(setdetailMonHocAction(item));
              }}
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </button>
          );
        }
      };
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.maMon}</td>
          <td>{item?.tenMon}</td>
          <td>{item?.soBuoi}</td>
          <td>{formatStringDate3(ngayBD)}</td>
          <td>{formatStringDate3(ngayKT)}</td>
          {renderTrangThai(item)}

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            {renderBtnSua(item)}
            {/* <NavLink
              // to={"/quan-ly/phan-mem/update"}
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
            {renderBtnXoa(item)}

            {/* <button
              onClick={() => {
                alert(`Del -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button> */}
            {renderBtnChiTiet(item)}
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
  const renderSelectTrangThai = () => {
    return (
      <div className=" col-2 m-2 ">
        <select className="form-select " onChange={handleChangeSelectAction}>
          <option selected={valueSelect == -1 ? 1 : 0} value="-1">
            Toàn bộ
          </option>
          <option selected={valueSelect == 1 ? 1 : 0} value="1">
            Kết thúc
          </option>
          <option selected={valueSelect == 2 ? 1 : 0} value="2">
            Chờ mở lớp
          </option>
          <option selected={valueSelect == 3 ? 1 : 0} value="3">
            Đang học
          </option>
        </select>
      </div>
    );
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý môn học", link: "" }];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>

      {/*  */}
      <ModalDetailMonHoc />

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
              <h2 style={{ margin: "0" }}>Danh sách môn học</h2>
              <div></div>

              {/* select - option */}
              {renderSelectTrangThai()}
              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={valueTxtSearch}
                  placeholder="tìm kiếm..."
                  // value={txtSearch}
                  onChange={handleChangeSearch}
                />
              </div>

              {/* Btn them */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <NavLink
                  to="/quan-ly/mon/add"
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
                    <th style={{ minWidth: "90px" }}>Mã môn học</th>
                    <th style={{ minWidth: "120px" }}>Tên môn học</th>
                    <th style={{ minWidth: "90px" }}>Số buổi</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th style={{ minWidth: "100px" }}>Trạng thái</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataMon()}
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
