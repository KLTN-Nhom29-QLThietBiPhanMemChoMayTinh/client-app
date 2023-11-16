import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
  getAllPhongMayApi,
  getAllPhongMayApi2,
  setValueSearchPhongMayAction,
  setvalueSelectTangPhongMayAction,
  setvalueSelectToaNhaPhongMayAction,
} from "../../redux/reducers/phongMayReducer";
import { getAllToaNhaApi } from "../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../redux/reducers/tangReducer";

function PageQLPhongMay() {
  //
  const dispatch = useDispatch();
  //
  let { arrPhongMay, arrPhongMaySearch, valueSelectToaNha, valueSelectTang,arrTangbyToaNha } = useSelector(
    (state) => state.phongMayReducer
  );
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  //

  useEffect(() => {
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
  }, []);

  //search
  const handleSearchChange = (event) => {
    dispatch(setValueSearchPhongMayAction(event.target.value));
  };
  //
  const handleChangeSelectToaNha = e => {
    let valSelect = e.target.value
    dispatch(setvalueSelectToaNhaPhongMayAction({valSelect, arrTang}))
  }
  //
  const handleChangeSelectTang = e => {
    let valSelect = e.target.value
    dispatch(setvalueSelectTangPhongMayAction({valSelect}))
  }

  // RENDER
  const renderToaNha = () => {
    return arrToaNha?.map((item, index) => {
      return (
        <option key={index} value={item.maToaNha}>
          {item.tenToaNha}
        </option>
      );
    })
  };
  //
  const renderTang = () => {
    if(valueSelectToaNha == -1) {
      return arrTang?.map((item, index) => {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang}
          </option>
        );
      })
    }
    else{
      return arrTangbyToaNha?.map((item, index) => {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang}
          </option>
        );
      })
    }
    
  };
  //
  const renderDataPhongMay = () => {
    return arrPhongMaySearch.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item.tenPhong}</td>
          <td>{item.moTa}</td>
          <td className="text-end">{item.mayTinhs.length}</td>
          <td className="text-end">{item.phanMems.length}</td>
          {/* {item.status===1 ? <td className="bg-success">Đang sử dụng</td> : item.status===0 ? <td>Phòng trống</td> : <td className="bg-danger">Đang bảo trì</td>} */}
          <td>{item.trangThai}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink to={`/quan-ly/phong/update/${item.id}`}>
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
              to={`../quan-ly/phong/detail/${item.id}`}
              onClick={() => {
                alert(`Add -- item`);
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
  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "../quan-ly/tang" },
    { name: "Quản lý phòng máy", link: "" },
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
              <h2 style={{ margin: "0" }}>Danh sách phòng học</h2>

              {/* select ToaNha */}
              <div className="col-2 m-2">
                <select className="form-select" onChange={handleChangeSelectToaNha}>
                  <option value="-1" selected>
                    tất cả
                  </option>
                  {renderToaNha()}
                </select>
              </div>

              {/* select Tang */}
              <div className="col-2 m-2">
                <select className="form-select" onChange={handleChangeSelectTang}>
                  <option value="-1" selected>
                    tất cả
                  </option>
                  {renderTang()}
                </select>
              </div>

              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder="tìm kiếm..."
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  to="/quan-ly/phong/add"
                  type="button"
                  className="btn btn-success ms-3 view_center_vertical"
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
                    <th style={{ minWidth: "120px" }}>Tên phòng</th>
                    <th style={{ minWidth: "150px" }}>Mô tả</th>
                    <th style={{ minWidth: "80px" }}>Số máy</th>
                    <th style={{ minWidth: "150px" }}>Số ứng dụng PM</th>
                    <th style={{ minWidth: "150px" }}>Trạng thái</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataPhongMay()}
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

export default PageQLPhongMay;
