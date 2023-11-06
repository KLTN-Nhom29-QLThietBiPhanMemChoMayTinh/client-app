import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi, setArrToaNhaByValSearchAction } from "../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../redux/reducers/tangReducer";

const PageQlKhuVuc = (props) => {
  /**
   * navigate chuyển trang(component)
   */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  let { arrToaNha, arrToaNhaSearch } = useSelector(
    (state) => state.toaNhaReducer
  );


  useEffect(() => {
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }

  }, []);

  //search
  const handleSearchChange = (event) => {
    dispatch(setArrToaNhaByValSearchAction(event.target.value));
  };

  //
  const renderDataKhuVuc = () => {
    return arrToaNhaSearch.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item.maToaNha}</td>
          <td>{item.tenToaNha}</td>
          <td>{item.soTang}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              type="button"
              className="btn btn-primary mx-2 px-2"
              style={{ padding: "2px" }}
              onClick={() => {
                navigate(`/quan-ly/khu-vuc/update/${item.id}`);
              }}
            >
              <FaPencilAlt color="white" size={16} />
            </button>
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
            {/* <NavLink
              to={`../quan-ly/tang`}
              className="btn bg-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </NavLink> */}
          </td>
        </tr>
      );
    });
  };
  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý tòa nhà", link: "" }];
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column justify-content-between "
        style={{ height: "100vh" }}
      >
        <div style={{ height: "100vh" }}>
          {/*  */}
          <div style={{ height: "8vh" }}>
            <NavTab
              itemLink={{ arrLinkNavTab: arrLinkNavTab, chucNang: "Danh sách" }}
            />
          </div>
          {/* table data */}
          <div className="bg-white rounded p-3 " style={{ height: "82vh" }}>
            {/* Phần top với tiêu đề và thanh tìm kiếm - btn thêm */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                height: "5vh",
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách tòa nhà</h2>
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
                  to="/quan-ly/khu-vuc/add"
                  type="button"
                  className="btn btn-success ms-5 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table
                className="table bg-white table-hover table-striped table-bordered 
          "
              >
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Mã tòa nhà</th>
                    <th scope="col">Tên tòa nhà</th>
                    <th scope="col">Số tầng</th>
                    <th scope="col" style={{ width: "220px" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataKhuVuc()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PageQlKhuVuc;
