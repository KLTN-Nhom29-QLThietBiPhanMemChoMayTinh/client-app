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



/**
 * giả đỉnh data tren server chua lấy về
 */
const dataServer = Database.dataPhongMay; 
/**
 *lưu trữ data get tu API
 */
let dataLocal = [];

const getAllPhongMayApi = () => {
  dataLocal = [...dataServer];
};


function PageQLPhongMay() {

  
  let [arrPhongMay, setArrPhongMay] = useState([]); // lưu trữ data sẽ thay đổi theo txtsearch
  let [txtSearch, setTxtSearch] = useState("");

  useEffect(() => {
    if (dataLocal.length === 0) {
      getAllPhongMayApi();
    }
    filterData();
  }, [txtSearch]);

  //search
  const handleSearchChange = (event) => {
    console.log('numberOfMachines -44 ()');
    setTxtSearch(event.target.value);
  };
  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filterData = () => {
    console.log('filterData -49()');

    const arrNew = dataLocal.filter((item) => {
      const search = txtSearch.toLowerCase();
      return (
        item.roomCode.toLowerCase().includes(search) ||
        (item.numberOfMachines + "").toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) 
      );
    });
    setArrPhongMay([...arrNew]);
  };
  //
  const renderDataPhongMay = () => {
    return arrPhongMay.map((item, index) => {
      return (
        <tr class="" key={index}>
          <td scope="row" style={{ fontWeight: 600, justifyItems: "center" }}>
            {item.roomCode}
          </td>
          <td>{item.description}</td>
          <td>{item.numberOfMachines}</td>
          <td>{item.soThietBi}</td>
          <td>{item.soPhanMem}</td>
          {item.status===1 ? <td className="bg-success">Đang sử dụng</td> : item.status===0 ? <td>Phòng trống</td> : <td className="bg-danger">Đang bảo trì</td>}
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              to={"/quan-ly/phong/update"}
              onClick={() => {
                alert(`Update -- ${item.id} - dang cập nhật.`);
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
                height: "6vh"
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách phòng học</h2>
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
                  to="/quan-ly/phong/add"
                  type="button"
                  className="btn btn-success ms-5 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div class="table-responsive" style={{ height: "69vh" }} >
              <table class="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">Mã phòng</th>
                    <th scope="col">Tên phòng</th>
                    <th scope="col">Số máy</th>
                    <th scope="col">Số thiết bị</th>
                    <th scope="col">Số ứng dụng PM</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col" style={{width:'220px'}}>Hành động</th>
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
  )
}

export default PageQLPhongMay
