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
  getAllTangApi,
  setArrTangAction,
  setValueSearchTangAction,
  setValueSelectTangAction,
} from "../../redux/reducers/tangReducer";
import { getAllToaNhaApi } from "../../redux/reducers/toaNhaReducer";
import { getAllPhongMayApi } from "../../redux/reducers/phongMayReducer";

/**
 * giả đỉnh data tren server chua lấy về
 */
const dataServer = Database.dataTang;
const dataKhuVuc = Database.dataKhuVuc;
/**
 *lưu trữ data get tu API
 */
let dataLocal = [];
let dataLocalKV = [];

const PageQLTang = (props) => {
  // 2. navigate -- dung de chuyeenr trang(component)
  const dispatch = useDispatch();

  let { arrTang, arrTangSearch } = useSelector((state) => state.tangReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);


  useEffect(() => {
    if (arrTangSearch.length === 0) {
      dispatch(getAllTangApi);
    }

    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }

    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
  }, []);

  //handle
  //search
  const handleSearchChange = (e) => {
    dispatch(setValueSearchTangAction(e.target.value));
  };
  const handleChangeSelect = (e) => {
    let { value } = e.target; // value == name cua obj khuvuc
    dispatch(setValueSelectTangAction(value))

  };

  //
  const renderDataTang = () => {
    return arrTangSearch.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600 }}>
            <div className="d-flex justify-content-center">
              {index < 9 ? `0${index + 1}` : index + 1}
            </div>
          </td>
          <td>{item.maTang}</td>
          <td>{item.tenTang}</td>
          <td>{item.soPhong}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              to={"/quan-ly/tang/update"}
              onClick={() => {
                alert(`Update -- ${item.id}`);
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
                alert(`Del -- ${item.id}`);
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
            <NavLink
              to={`../quan-ly/phong`}
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
  //
  const renderSelectTheoKhuVuc = () => {
    return (
      <div className="col-2 m-2">
        <select
          className="form-select"
          onChange={handleChangeSelect}
        >
          <option value="-1" selected>
            tất cả
          </option>
          {arrToaNha?.map((item, index) => {
            return (
              <option key={index} value={item.maToaNha}>
                {item.tenToaNha}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tòa nhà", link: "../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "" },
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                height: "6vh",
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách tầng</h2>
              {renderSelectTheoKhuVuc()}
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="tìm kiếm..."
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  to="/quan-ly/tang/add"
                  type="button"
                  onClick={() => {
                    dispatch(setArrTangAction(arrTang))
                  }}
                  className="btn btn-success ms-5 view_center_vertical"
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
                    <th scope="col">Mã tầng</th>
                    <th scope="col">Tên tầng</th>
                    <th scope="col">Số phòng</th>
                    <th scope="col" style={{ width: "220px" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataTang()}
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
};

export default PageQLTang;
