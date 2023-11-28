import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
//
import NavTab from "../../components/common/NavTab/NavTab";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePhanMemApi,
  getAllPhanMemApi,
  setValueSearchPhanMemAction,
  setValueSelectPhanMemAction,
} from "../../redux/reducers/phanMemReducer";
import { formatStringDate } from "../../util/config";

/**
 * môn học - phòng máy
 * 4.	Phần mềm (mã phần mềm, tên phần mềm, trạng thái, ngay bd, tuoitho )
 */
export default function PageQLPhanMem() {
  const dispatch = useDispatch();
  //
  let { arrPhanMemSearch, valueSelect, valueSearch } = useSelector(
    (state) => state.phanMemReducer
  );

  // useEffect lay data khoi dau
  useEffect(() => {
    if (arrPhanMemSearch.length === 0) {
      dispatch(getAllPhanMemApi);
    }
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    // setTxtSearch(e.target.value);
    dispatch(setValueSearchPhanMemAction(e.target.value));
  };
  //
  const handleChangeSelect = (e) => {
    dispatch(setValueSelectPhanMemAction(e.target.value));
  };
  //Render
  const renderSelectTheoRouterMon = () => {
    return <></>;
  };
  const renderDataPM = () => {
    return arrPhanMemSearch.map((item, index) => {
      let ngaySD = new Date(item?.ngayCaiDat);
      let ngayKT = new Date(item?.ngayCaiDat);

      ngayKT.setMonth(ngayKT.getMonth() + item?.tuoiTho);

      let ngaySuDung = item.ngayCaiDat;
      let ngayHetHan = new Date(ngaySuDung);

      ngayHetHan.setMonth(ngayHetHan.getMonth() + item.tuoiTho);

      const strTrangThai = () => {
        let day = new Date();
        let day2 = new Date(ngayKT);
        day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay
        if (item.trangThai) {
          if (day > ngayKT) {
            return (
              <td style={{ backgroundColor: "#fff563" }}>Hết hạn sử dụng</td>
            );
          } else if (day > day2 && day < ngayKT) {
            return (
              <td style={{ backgroundColor: "#4dff7c" }}>
                Đang sử dụng, sắp hết hạn
              </td>
            );
          } else {
            return <td style={{ backgroundColor: "#4dff7c" }}>Đang sử dụng</td>;
          }
        } else {
          return <td style={{ backgroundColor: "#ff6666" }}>Bị hỏng</td>;
        }

        // return <td className="bg-danger">Hết hạn sử dụng</td>
        // return <td className="bg-success text-white ">Còn hạn sử dụng</td>
      };

      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, textAlign: "center" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item.maPhanMem}</td>
          <td>{item.tenPhanMem}</td>
          <td>{item.moTa}</td>
          <td>{formatStringDate(ngaySD)}</td>
          <td>{item.tuoiTho}</td>
          <td>{formatStringDate(ngayKT)}</td>
          {strTrangThai()}

          {/* <td style={{ display: "flex", justifyContent: "space-evenly" }}> */}
          <td className=" text-center">
            <NavLink to={`/quan-ly/phan-mem/update?id=${item.maPhanMem}`}>
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
                if (window.confirm("Bấm vào nút OK để xóa " + item.tenPhanMem + " - phiên bản: " + item.phienBan)) {
                  dispatch(deletePhanMemApi(item.maPhanMem));
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
  const renderSelectTrangThai = () => {
    return (
      <div className=" col-2 m-2 ">
        <select className="form-select " onChange={handleChangeSelect}>
          <option selected={valueSelect == -1 ? 1 : 0} value="-1">
            Toàn bộ
          </option>
          <option selected={valueSelect == 1 ? 1 : 0} value="1">
            Bị hỏng
          </option>
          <option selected={valueSelect == 2 ? 1 : 0} value="2">
            Đang sử dụng
          </option>
          <option selected={valueSelect == 3 ? 1 : 0} value="3">
            Hết hạn
          </option>
          <option selected={valueSelect == 4 ? 1 : 0} value="4">
            Sắp hết hạn
          </option>
        </select>
      </div>
    );
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý thiết bị phần mềm", link: "" }];
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                height: "6vh",
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách phần mềm</h2>
              <div></div>
              {renderSelectTheoRouterMon()}
              {renderSelectTrangThai()}
              {/* input tim kiem */}
              <div
                className="col-2 m-2"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="tìm kiếm..."
                  value={valueSearch}
                  onChange={handleChangeSearch}
                />
              </div>
              {/* Btn them */}
              <NavLink
                to="/quan-ly/phan-mem/add"
                type="button"
                className="btn btn-success ms-5 view_center_vertical"
              >
                <MdAdd color="white" size={25} />
                Tạo mới
              </NavLink>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Mã phần mềm</th>
                    <th style={{ minWidth: "120px" }}>Tên phần mềm</th>
                    <th style={{ minWidth: "200px" }}>Mô tả</th>
                    <th>Ngày cài đặt</th>
                    <th style={{ minWidth: "90px" }}>Hạn sử dụng(tháng)</th>
                    <th>Ngày hết hạn </th>
                    <th style={{ minWidth: "100px" }}>Trạng thái</th>
                    <th style={{ minWidth: "150px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataPM()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
}
