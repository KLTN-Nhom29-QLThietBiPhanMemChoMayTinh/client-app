import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import NavTab from "../../components/common/NavTab/NavTab";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
import { formatStringDate } from "../../util/config";
import { useDispatch, useSelector } from "react-redux";
import { getAllMonHoc } from "../../redux/reducers/monHocReducer";

export default function PageQlMonHoc() {
  const dispatch = useDispatch();

  let [txtSearch, setTxtSearch] = useState("");

  let { arrMonHoc } = useSelector((state) => state.monHocReducer);

  // useEffect -- call data mon hoc
  useEffect(() => {
    const action = getAllMonHoc;
    dispatch(action);
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    setTxtSearch(e.target.value);
  };

  //render
  const renderDataMon = () => {

    return arrMonHoc?.map((item, index) => {
      console.log("🚀 ~ file: PageQlMonHoc.jsx:38 ~ returnarrMonHoc?.map ~ item:", item)
      let ngayBD = item?.ngayBatDau;
      let ngayKT = new Date(ngayBD);

      ngayKT.setDate(ngayKT.getDate() + item?.soBuoi * 7);

      // render
      const renderTrangThai = () => {
        let day = new Date();
        if (day > ngayKT) {
          return <td style={{ backgroundColor: "#ff6666" }}>Kết thúc</td>;
        }
        if (ngayBD > day) {
          
          return <td style={{ backgroundColor: "#fff563" }}>Chờ mở lớp</td>;
        }
        return <td style={{ backgroundColor: "#4dff7c" }}>Đang học</td>;
      };
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.idCode}</td>
          <td>{item?.name}</td>
          <td>{item?.soBuoi}</td>
          <td>{formatStringDate(item?.ngayBatDau)}</td>
          <td>{formatStringDate(ngayKT)}</td>
          {renderTrangThai()}

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
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
            </NavLink>
            <button
              onClick={() => {
                alert(`Del -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
            <NavLink
              // to={`../quan-ly/phong`}
              onClick={() => {
                alert(`Chi tiết -- ${item.id} -- dang cập nhật!`);
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

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý môn học", link: "" }];
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
              <h2 style={{ margin: "0" }}>Danh sách môn học</h2>
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* {renderSelectTheoRouterMon()}
                {renderSelectTheoRouterMon()} */}

                <div>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder="tìm kiếm..."
                    // value={txtSearch}
                    onChange={handleChangeSearch}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  // to="/quan-ly/tang/add"
                  onClick={() => {
                    alert(`tạo mới -- dang cập nhật!`);
                  }}
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
