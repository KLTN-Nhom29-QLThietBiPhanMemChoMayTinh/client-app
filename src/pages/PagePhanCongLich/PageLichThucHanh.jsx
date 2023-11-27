import React, { useEffect } from "react";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCaThucHanhApi,
  setObjDetailCaThucHanh,
  setValueSelSearchCaTHAction,
} from "../../redux/reducers/lichThucHanhReducer";
import ModalDetailLichThucHanh from "../../components/layout/Detail/ModalDetailLichThucHanh/ModalDetailLichThucHanh";
import { formatStringDate } from "../../util/config";
import ModalSearchLichThucHanh from "../../components/layout/Modal/ModalSearchLichThucHanh";

//
export default function PageLichThucHanh() {
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  let { arrCaThucHanh, arrCaThucHanhSearch, valueSearch } = useSelector(
    (state) => state.lichThucHanhReducer
  );

  //
  useEffect(() => {
    if (arrCaThucHanh.length === 0) {
      dispatch(getAllCaThucHanhApi);
    }
  }, []);
  //
  //hanle 
  //
  const handleChangeSearch = (e) => {
    dispatch(setValueSelSearchCaTHAction(e.target.value))
  }
  //
  //render
  //
  const renderDataLichThucHanh = () => {
    //  ===============
    return arrCaThucHanhSearch?.map((item, index) => {
      let tgian = new Date(item.ngayThucHanh);

      let strTietTH = `${item.tietBatDau} - ${item.tietKetThuc}`;

      return (
        <>
          <tr key={index}>
            <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
              {index < 9 ? `0${index + 1}` : index + 1}
            </td>
            <td>{item.monHoc.tenMon}</td>
            <td>{formatStringDate(tgian)}</td>
            <td>{item.tenCa}</td>
            <td>{strTietTH}</td>
            <td>{item.giaoVien.maGiaoVien}</td>
            <td>{item.phongMay.tenPhong}</td>

            <td style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button
                type="button"
                onClick={() => {
                  alert("Đang cập nhật!");
                  // navigate(`/phan-cong/lich-thuc-hanh/update/${item.maLich}`);
                }}
                className="btn btn-primary mx-2 px-2"
                style={{ padding: "2px" }}
              >
                <FaPencilAlt color="white" size={16} />
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Bấm vào nút OK để xóa lịch thực hành có số thứ tự là: ${
                        index < 9 ? `0${index + 1}` : index + 1
                      } - ${item.monHoc.tenMon}`
                    )
                  ) {
                    alert("Lỗi api xóa lịch trực.");
                    return;
                    // dispatch(deleteLichTrucApi(item.maLich));
                  }
                }}
                type="button"
                className="btn btn-danger mx-2 px-2"
                style={{ padding: "2px" }}
              >
                <ImBin2 color="white" size={16} />
              </button>
              <button
                onClick={() => {
                  dispatch(setObjDetailCaThucHanh(item));
                }}
                type="button"
                className="btn btn-info mx-2 px-2"
                style={{ padding: "2px" }}
                data-bs-toggle="modal"
                data-bs-target="#modalIdDetailLichTH"
              >
                <BiSolidDetail color="white" size={16} />
              </button>
            </td>
          </tr>
        </>
      );
    });
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Phân công lịch thực hành", link: "/phan-cong/lich-thuc-hanh" },
  ];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        {/*  */}
        <ModalDetailLichThucHanh />
        <ModalSearchLichThucHanh />

        {/*  */}
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
                <h2 style={{ margin: "0" }}>Phân công lịch thực hành</h2>
                <div></div>

                {/* select - option */}

                <div></div>
                <div>
                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn btn-primary "
                    data-bs-toggle="modal"
                    data-bs-target="#modalIdSearchLichTH"
                  >
                    Tìm kiếm
                  </button>
                </div>

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
                    to="/phan-cong/lich-thuc-hanh/add"
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
                      <th style={{}}>Môn học</th>
                      <th style={{}}>Ngày TH</th>
                      <th style={{}}>Buổi TH</th>
                      <th style={{}}>Tiết TH</th>
                      <th style={{}}>Giáo viên</th>
                      <th style={{}}>Phòng máy</th>
                      <th style={{ minWidth: "120px" }}>Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="over_flow_auto">
                    {renderDataLichThucHanh()}
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
