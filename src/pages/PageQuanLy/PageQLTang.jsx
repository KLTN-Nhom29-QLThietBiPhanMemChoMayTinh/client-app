import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
import { BiSolidDetail } from "react-icons/bi";

const dataServer = Database.dataTang; // giả đỉnh data tren server chua lấy về
/**
 *lưu trữ data get tu API
 */
let dataLocal = [];

const getAllTangApi = () => {
  dataLocal = [...dataServer];
};

const PageQLTang = (props) => {

  let [arrTang, setArrTang] = useState([]); // lưu trữ data sẽ thay đổi theo txtsearch
  let [txtSearch, setTxtSearch] = useState("");

  useEffect(() => {
    // setArrTang(dataTang);
    if (dataLocal.length === 0) {
      getAllTangApi();
    }
    filterData();
  }, [txtSearch]);

  //search
  const handleSearchChange = (event) => {
    setTxtSearch(event.target.value);
  };
  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filterData = () => {
    const arrNew = dataLocal.filter((item) => {
      const search = txtSearch.toLowerCase();
      return (
        (item.id + "").toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (item.soPhong + "").toLowerCase().includes(search)
      );
    });
    setArrTang([...arrNew]);
  };
  //
  const renderDataTang = () => {
    return arrTang.map((item, index) => {
      return (
        <tr class="" key={index}>
          <td scope="row" style={{ fontWeight: 600, justifyItems: "center" }}>
            {item.id}
          </td>
          <td>{item.name}</td>
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
                class="btn btn-primary mx-2 px-2"
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
              to={`../quan-ly/tang/detail/${item.id}`}
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
    { name: "Quản lý tầng", link: "" },
  ];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
          {/*  */}
          <NavTab itemLink={{ arrLinkNavTab, chucNang: "Danh sách" }} />
          {/* table data */}
          <div className="bg-white p-3">
            {/* Phần top với tiêu đề và thanh tìm kiếm - btn thêm */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách tầng</h2>
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder="tìm kiếm..."
                    value={txtSearch}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  to="/quan-ly/tang/add"
                  type="button"
                  className="btn btn-success ms-5 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>
          </div>
          {/* Bảng danh sách data */}

          <div class="table-responsive">
            <table
              class="table bg-white table-hover table-striped table-bordered 
          "
            >
              <thead>
                <tr>
                  <th scope="col">Mã tầng</th>
                  <th scope="col">Tên tầng</th>
                  <th scope="col">Số phòng</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/*  */}
                {renderDataTang()}
              </tbody>
            </table>
          </div>
        </div>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
};

export default PageQLTang;
