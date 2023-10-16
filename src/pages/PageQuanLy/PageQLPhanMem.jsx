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

const dataServerPM = Database.dataPhanMem;

let dataLocalArrPM = [];

const getCallApiDataPM = () => {
  dataLocalArrPM = [...dataServerPM];
};

/**
 * môn học - phòng máy
 * 4.	Phần mềm (mã phần mềm, tên phần mềm, trạng thái, ngay bd, tuoitho )
 */
export default function PageQLPhanMem() {
  let [arrPhanMem, setArrPhanMem] = useState([]);

  let [txtSearch, setTxtSearch] = useState("");

  // useEffect lay data khoi dau
  useEffect(() => {
    if (dataLocalArrPM.length === 0) {
      getCallApiDataPM();
    }
  }, []);
  useEffect(() => {
    filterData();
  }, [txtSearch]);

  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filterData = () => {
    const arrNew = dataLocalArrPM.filter((item) => {
      const search = txtSearch.toLowerCase();
      return (
        (item.id + "").toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (item.soPhong + "").toLowerCase().includes(search)
      );
    });
    setArrPhanMem([...arrNew]);
  };
  //handle
  const handleChangeSearch = (e) => {
    setTxtSearch(e.target.value);
  };
  //Render
  const renderSelectTheoRouterMon = () => {
    return <></>;
  };
  const renderDataPM = () => {
    return arrPhanMem.map((item, index) => {
      let ngaySuDung = item.ngaySuDung;
      let ngayHetHan = new Date(ngaySuDung);

      ngayHetHan.setMonth(ngayHetHan.getMonth() + item.tuoiTho);

      let strNgaySuDung = `${item.ngaySuDung.getDate()}/${
        item.ngaySuDung.getMonth() + 1
      }/${item.ngaySuDung.getYear() + 1900}`;
      let strNgatHethan = `${ngayHetHan.getDate()}/${
        ngayHetHan.getMonth() + 1
      }/${ngayHetHan.getYear() + 1900}`;
      const strTrangThai = () => {
        let date = new Date();
        if (date <= ngayHetHan) {
          date.setDate(date.getDate() + 30);

          if (ngayHetHan <= date) {
            return <td style={{backgroundColor:'#fff563'}}>Sắp hết hạn</td>;
          }
          return <td style={{backgroundColor:'#4dff7c'}}>Còn hạn sử dụng</td>;
        }
        return <td style={{backgroundColor:'#ff6666'}}>Hết hạn</td>;
        // return <td className="bg-danger">Hết hạn sử dụng</td>
        // return <td className="bg-success text-white ">Còn hạn sử dụng</td>
      };

      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item.idCode}</td>
          <td>{item.name}</td>
          <td>{item.mota}</td>
          <td>{strNgaySuDung}</td>
          <td>{strNgatHethan}</td>
          <td>{item.tuoiTho}</td>
          {strTrangThai()}

          {/* <td style={{ display: "flex", justifyContent: "space-evenly" }}> */}
          <td className=" ">
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
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderSelectTheoRouterMon()}
                {renderSelectTheoRouterMon()}

                <div>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder="tìm kiếm..."
                    value={txtSearch}
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
                    <th style={{ minWidth: "90px" }}>Mã phần mềm</th>
                    <th style={{ minWidth: "120px" }}>Tên phần mềm</th>
                    <th style={{ minWidth: "200px" }}>Mô tả</th>
                    <th>Ngày cài đặt</th>
                    <th>Ngày hết hạn </th>
                    <th style={{ minWidth: "90px" }}>Hạn sử dụng(tháng)</th>
                    <th style={{ minWidth: "100px" }}>Trạng thái</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
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
