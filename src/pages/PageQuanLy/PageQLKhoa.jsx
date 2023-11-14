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
  deleteKhoaApi,
  getAllKhoaApi,
  setObjUpdateKhoaAction,
  setValueSearchKhoa,
} from "../../redux/reducers/khoaReducer";
import { formatNameByHocVi } from "../../util/config";
import FormAddKhoaModal from "../../components/layout/Add/FormAddKhoaModal";
import FormUpdateKhoaModal from "../../components/layout/Edit/FormUpdateKhoaModal";

export default function PageQLKhoa() {
  const dispatch = useDispatch();

  let { arrKhoa, arrKhoaSearch } = useSelector((state) => state.khoaReducer);

  useEffect(() => {
    if (arrKhoa.length === 0) {
      dispatch(getAllKhoaApi);
    }
  }, []);

  //handle
  const handleChangeSearch = (e) => {
    dispatch(setValueSearchKhoa(e.target.value));
  };
  //render
  const renderDataNhanVien = () => {
    return arrKhoaSearch?.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{item?.maKhoa}</td>
          <td>{item?.tenKhoa}</td>
          <td>{item?.soGiaoVien}</td>

          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            {/* btnUpdate */}
            <FormUpdateKhoaModal
              arrKhoa={arrKhoa}
              objKhoa={item}
              keyModal={`khoaModal_${item.maKhoa}`}
            />

            <button
              onClick={() => {
                if(window.confirm("Bấm vào nút OK để xóa " + item.tenKhoa)){
                  dispatch(deleteKhoaApi(item.maKhoa));
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

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý khoa", link: "" }];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>
      {/* Modal */}
      <FormAddKhoaModal arrKhoa={arrKhoa} />

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
              <h2 style={{ margin: "0" }}>Danh sách khoa</h2>
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
                  // to="/quan-ly/khoa/add"

                  type="button"
                  className="btn btn-success ms-4 view_center_vertical"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddKhoa"
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
                    <th style={{ minWidth: "90px" }}>Mã khoa</th>
                    <th style={{ minWidth: "180px" }}>Tên khoa</th>
                    <th style={{ minWidth: "90px" }}>Số giáo viên</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataNhanVien()}
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
