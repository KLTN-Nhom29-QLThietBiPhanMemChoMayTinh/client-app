import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink } from "react-router-dom";
import Footer from "../../components/common/Footer/Footer";

const PageQlKhuVuc = (props) => {
  const dataKhuVuc = [
    { id: 1, name: "Tòa nhaa A", soTang: 5 },
    { id: 2, name: "Tòa nhà B", soTang: 2 },
    { id: 3, name: "Tòa nhà C", soTang: 4 },
    { id: 4, name: "Tòa nhà D", soTang: 5 },
  ];

  let [arrKhuVuc, setArrKhuVuc] = useState([]);
  let [txtSearch, setTxtSearch] = useState("");

  useEffect(() => {
    // setArrKhuVuc(dataKhuVuc);

    filterData();
  }, [txtSearch]);

  //search
  const handleSearchChange = (event) => {
    setTxtSearch(event.target.value);
  };
  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filterData = () => {
    const arrNew = dataKhuVuc.filter((item) => {
      const search = txtSearch.toLowerCase();
      return (
        (item.id + "").toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (item.soTang + "").toLowerCase().includes(search)
      );
    });
    setArrKhuVuc([...arrNew]);
  };
  //
  const renderDataKhuVuc = () => {
    return arrKhuVuc.map((item, index) => {
      return (
        <tr class="" key={item.id}>
          <td scope="row" style={{ fontWeight: 600, justifyItems: "center" }}>
            {item.id}
          </td>
          <td>{item.name}</td>
          <td>{item.soTang}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              to={"/quan-ly/khu-vuc/update"}
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
            </button>{" "}
            <NavLink
              onClick={() => {
                alert(`Chi tiet -- item`);
              }}
              to={"../quan-ly/tang"}
              className="btn bg-info mx-2 px-2"
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
  let arrLinkNavTab = [{ name: "Quản lý khu vực", link: "" }];
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
          {/*  */}
          <NavTab
            itemLink={{ arrLinkNavTab: arrLinkNavTab, chucNang: "Danh sách" }}
          />
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
              <h2 style={{ margin: "0" }}>Danh sách khu vực</h2>
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
                  to="/quan-ly/khu-vuc/add"
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
                  <th scope="col">Mã khu vực</th>
                  <th scope="col">Tên khu vực</th>
                  <th scope="col">Số tầng</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/*  */}
                {renderDataKhuVuc()}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PageQlKhuVuc;
