import React, { useEffect } from "react";
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllMayTinhApi } from "../../redux/reducers/mayTinhReducer";
import { formatStringDate } from "../../util/config";
import { formatToaNhaAndTang } from "../../util/formatString";
//

export default function PageQlMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { arrMayTinh } = useSelector((state) => state.mayTinhReducer);

  useEffect(() => {
    if (arrMayTinh.length === 0) {
      dispatch(getAllMayTinhApi);
    }
  }, []);

  // render
  const renderDataMayTinh = () => {
    return arrMayTinh?.map((item, index) => {
      let ngaySD = new Date(item.ngayLapDat);
      let textColor_TrangThai = "black";

      if (item.trangThai.toLowerCase().includes("bị hỏng".toLowerCase())) {
        textColor_TrangThai = "red";
      }

      
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600 }}>
            <div className="d-flex justify-content-center">
              {index < 9 ? `0${index + 1}` : index + 1}
            </div>
          </td>
          <td>{item.moTa}</td>
          <td className="text-end">{item.thietBiMays.length}</td>
          <td>{item.phongMay.tenPhong}</td>
          <td>{formatToaNhaAndTang(item.phongMay.tang)}</td>
          <td>{formatStringDate(ngaySD)}</td>
          <td style={{ color: `${textColor_TrangThai}` }}>{item.trangThai}</td>

          {/*  */}
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
            // to={`/quan-ly/tang/update?id=${item.maTang}`}
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
                if (window.confirm("Bấm vào nút OK để xóa " + item.tenTang)) {
                  // dispatch(deleteTangApi(item.maTang));
                }
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
            <button
              // `../quan-ly/phong`
              onClick={() => {
                // navigate(`/home-detail?id=${item.maTang}&key=tang`)
              }}
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </button>
          </td>
        </tr>
      );
    });
  };

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
                <h2 style={{ margin: "0" }}>Danh sách máy tính</h2>
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
                      <th scope="col">Mô tả</th>
                      <th scope="col" style={{ width: "100px" }}>
                        Số thiết bị
                      </th>
                      <th scope="col">Tên phòng</th>
                      <th scope="col">Tòa nhà</th>
                      <th scope="col">Ngày lắp đặt </th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col" style={{ width: "150px" }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="over_flow_auto">
                    {/*  */}
                    {renderDataMayTinh()}
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
