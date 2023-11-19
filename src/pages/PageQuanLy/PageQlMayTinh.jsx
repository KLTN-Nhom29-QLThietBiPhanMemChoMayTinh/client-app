import React from "react";
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
//

export default function PageQlMayTinh() {
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tòa nhà", link: "/quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "/quan-ly/tang" },
    { name: "Quản lý phòng", link: "/quan-ly/phong" },
    { name: "Quản lý máy tính", link: "" },
  ];
  //
  return (
    <>
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
                {/* {renderSelectTheoKhuVuc()} */}
                {/* input tim kiem */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="tìm kiếm..."
                      // onChange={handleSearchChange}
                    />
                  </div>

                  {/* Btn them */}
                  <button
                    to="/quan-ly/tang/add"
                    type="button"
                    className="btn btn-success ms-5 view_center_vertical"
                  >
                    <MdAdd color="white" size={25} />
                    Tạo mới
                  </button>
                </div>
              </div>

              {/* Bảng danh sách data */}
              <div className="table-responsive" style={{ height: "69vh" }}>
                <table className="table bg-white table-hover table-striped table-bordered ">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th scope="col">Tên tầng</th>
                      <th scope="col">Tên tòa nhà</th>
                      <th scope="col">Số phòng</th>
                      <th scope="col" style={{ width: "220px" }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="over_flow_auto">
                    {/*  */}
                    {/* {renderDataTang()} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/*  */}
          <Footer />
        </div>
      </div>
    </>
  );
}
