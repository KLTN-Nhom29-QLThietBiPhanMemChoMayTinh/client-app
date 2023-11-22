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
import {
  deleteThietBiApi,
  getAllLoaiThietBiApi,
  getAllThietBiApi,
  setValueSelectActionTBi,
  setValueSelectLoaiTbiAction,
  setValueTxtSearchAction,
} from "../../redux/reducers/thietBiReducer";
import { formatStringDate } from "../../util/config";

export default function PageQLThietBi() {
  const dispatch = useDispatch();

  let {
    arrThietBi,
    arrThietBiSearch,
    valueTxtSearch,
    arrLoaiTBi,
    valueSelect,
    valueSelectLoaiTBi,
  } = useSelector((state) => state.thietBiReducer);

  useEffect(() => {
    if (arrThietBi.length === 0) {
      const action = getAllThietBiApi;
      dispatch(action);
    }
    //
    if (arrLoaiTBi.length === 0) {
      dispatch(getAllLoaiThietBiApi);
    }
    //
  }, []);

  // handle
  //
  const handleChangeLoaiTbi = (e) => {
    dispatch(setValueSelectLoaiTbiAction(e.target.value));
  };
  //
  const handleChangeSearch = (e) => {
    dispatch(setValueTxtSearchAction(e.target.value.trim()));
  };
  const handleChangeSelect = (e) => {
    dispatch(setValueSelectActionTBi(e.target.value.trim()));
  };
  //render
  //
  const renderLoaithietBi = () => {
    return arrLoaiTBi?.map((item, index) => {
      if (item.maLoai == valueSelectLoaiTBi) {
        return (
          <option key={index} selected value={item.maLoai}>
            {item.tenLoai}
          </option>
        );
      }
      return (
        <option key={index} value={item.maLoai}>
          {item.tenLoai}
        </option>
      );
    });
  };
  //
  const renderDataThietBi = () => {
    return arrThietBiSearch?.map((item, index) => {
      let ngaySD = new Date(item?.ngayCaiDat);
      let ngayKT = new Date(item?.ngayCaiDat);

      ngayKT.setMonth(ngayKT.getMonth() + item?.tuoiTho);

      // render
      const renderTrangThai = () => {
        let day = new Date();
        let day2 = new Date(ngayKT);
        day2.setDate(day2.getDate() - 30); // day2 là tgian trước ngày kt 30 ngay
        if (item.status) {
          if (day > ngayKT) {
            return (
              <td style={{ backgroundColor: "#fff563" }}>
                Đang sử dụng - hết hạn bảo hành
              </td>
            );
          } else if (day > day2 && day < ngayKT) {
            return (
              <td style={{ backgroundColor: "#4dff7c" }}>
                Đang sử dụng, sắp hết hạn bảo hành
              </td>
            );
          } else {
            return <td style={{ backgroundColor: "#4dff7c" }}>Đang sử dụng</td>;
          }
        } else {
          return <td style={{ backgroundColor: "#ff6666" }}>Không sử dụng</td>;
        }
      };

      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.loaiThietBi.tenLoai}</td>
          <td>{item?.tenThietBi}</td>
          <td>{formatStringDate(ngaySD)}</td>
          <td>{item?.tuoiTho}</td>
          <td>{formatStringDate(ngayKT)}</td>
          {renderTrangThai()}

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink to={`/quan-ly/thiet-bi/update?id=${item.maThietBi}`}>
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
                if (
                  window.confirm(
                    "Bấm vào nút OK để xóa " +
                      item.loaiThietBi.tenLoai +
                      " - " +
                      item.tenThietBi
                  )
                ) {
                  dispatch(deleteThietBiApi(item.maThietBi));
                }
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
  const renderSelectTrangThai = () => {
    return (
      <div className=" col-2 m-2 ">
        <select className="form-select " onChange={handleChangeSelect}>
          <option selected={valueSelect == -1 ? 1 : 0} value="-1">
            Toàn bộ
          </option>
          <option selected={valueSelect == 1 ? 1 : 0} value="1">
            Không sử dụng
          </option>
          <option selected={valueSelect == 2 ? 1 : 0} value="2">
            Đang sử dụng
          </option>
          <option selected={valueSelect == 3 ? 1 : 0} value="3">
            Hết hạn
          </option>
          <option selected={valueSelect == 4 ? 1 : 0} value="4">
            Sắp hết hạn
          </option>
        </select>
      </div>
    );
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý thiết bị phần cứng", link: "" }];
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
                marginBottom: "20px",
                height: "6vh",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <h2 style={{ margin: "0" }}>Danh sách thiết bị</h2>
              <div></div>

              {/* select - option */}
              <div className=" col-2 m-2 ">
                <select className="form-select " onChange={handleChangeLoaiTbi}>
                  <option value="-1">Toàn bộ</option>
                  {renderLoaithietBi()}
                </select>
              </div>
              {renderSelectTrangThai()}

              {/* input tim kiem */}
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={valueTxtSearch}
                  placeholder="tìm kiếm..."
                  onChange={handleChangeSearch}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Btn them */}
                <NavLink
                  to="/quan-ly/thiet-bi/add"
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
              <table className="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Loại thiết bị</th>
                    <th style={{ minWidth: "180px" }}>Tên thiết bị</th>
                    <th style={{ minWidth: "120px" }}>Ngày bắt đầu sử dụng</th>
                    <th style={{ minWidth: "90px" }}>Hạn bảo hành (tháng)</th>
                    <th style={{ minWidth: "90px" }}>Ngày hết hạn </th>
                    <th style={{ minWidth: "150px" }}>Trạng thái</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataThietBi()}
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
