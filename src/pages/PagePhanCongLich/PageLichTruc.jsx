import React, { useEffect } from "react";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLichTrucApi, getAllLichTruc, setArrLichTrucSearchAction } from "../../redux/reducers/lichTrucReducer";

export default function PageLichTruc(props) {
  const dispatch = useDispatch();

  const { arrLichTruc,arrLichTrucSearch } = useSelector((state) => state.lichTrucReducer);

  useEffect(() => {
    if (arrLichTruc.length === 0) {
      dispatch(getAllLichTruc);
    }
  }, []);
  // handle 
  const handleChangeSearch = (e) => {
    dispatch(setArrLichTrucSearchAction(e.target.value.trim()))
  }
  //render
  const renderDataLichTruc = () => {
    //  ===============
    return arrLichTrucSearch?.map((item, index) => {
      let tgian = new Date(item.tgian);

      let strTgian = `${tgian.getMonth() + 1} - ${tgian.getFullYear()}`;
      let strCaTruc = `${item.thoiGianBatDau}h - ${item.thoiGianKetThuc}h`;
      return (
        <>
          <tr key={index}>
            <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
              {index < 9 ? `0${index + 1}` : index + 1}
            </td>
            <td>{item.tang.tenTang}</td>
            <td>{item.tang.toaNha.tenToaNha}</td>
            <td>{item.nhanVien.tenNV}</td>
            <td>{item.nhanVien.sDT}</td>
            <td>{strTgian}</td>
            <td>{strCaTruc}</td>
            {/* <td>{item.soNgayNghi}</td> */}

            <td style={{ display: "flex", justifyContent: "space-evenly" }}>
              <NavLink to={`/phan-cong/lich-truc/update/${item.maLich}`}>
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
                  if (window.confirm(`Bấm vào nút OK để xóa lịch trực ${item.nhanVien.tenNV} - ${item.tang.tenTang}, ${item.tang.toaNha.tenToaNha} -- Thời gian:  ${strTgian}. `)) {
                    dispatch(deleteLichTrucApi(item.maLich));
                  }
                }}
                type="button"
                className="btn btn-danger mx-2 px-2"
                style={{ padding: "2px" }}
              >
                <ImBin2 color="white" size={16} />
              </button>
              {/* <NavLink
              // to={`../quan-ly/phong`}
              onClick={() => {
                alert(`Chi tiết -- ${item.id} -- dang cập nhật!`);
              }}
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </NavLink> */}
            </td>
          </tr>
        </>
      );
    });
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Phân công lịch trực", link: "" }];
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
            <NavTab itemLink={{ arrLinkNavTab, chucNang: "Phân công" }} />
          </div>
          {/* table data */}
          <div className="bg-white rounded p-3" style={{ height: "82vh" }}>
            {/* Phần top với tiêu đề và thanh tìm kiếm - btn thêm */}
            <div
              style={{
                marginBottom: "20px",
                height: "6vh",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <h2 style={{ margin: "0" }}>Phân công lịch trực</h2>
              <div></div>

              {/* select - option */}
              {/* {renderSelectTrangThai()} */}
              <div></div>
              <div></div>

              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="tìm kiếm..."
                  onChange={handleChangeSearch}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Btn them */}
                <NavLink
                  to="/phan-cong/lich-truc/add"
                  type="button"
                  className="btn btn-success ms-4 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered align-middle">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "100px" }}>Tầng trực</th>
                    <th style={{ minWidth: "100px" }}>Tòa nhà</th>
                    <th style={{ minWidth: "180px" }}>Tên nhân viên</th>
                    <th style={{ minWidth: "80px" }}>Số liên lạc </th>
                    <th style={{ minWidth: "120px" }}>
                      Thời gian trực (tháng)
                    </th>
                    <th style={{ minWidth: "120px" }}>Ca trực(giờ)</th>
                    {/* <th style={{ minWidth: "120px" }}>Số ngày nghỉ</th> */}
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">{renderDataLichTruc()}</tbody>
              </table>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
