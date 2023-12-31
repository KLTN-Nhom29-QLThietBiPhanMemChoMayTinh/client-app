import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/common/Footer/Footer";
import NavTab from "../../components/common/NavTab/NavTab";
import ModalChangePass from "./ModalChangePass";

//
import {MdOutlineCached} from 'react-icons/md'

export default function PageProfile() {
  let { userLogin } = useSelector((state) => state.userReducer);

  //
  let [btnReloadImg, setBtnReloadImg] = useState(true);

  //Render
  const renderThongTin = () => {
    if (Object.keys(userLogin).length === 0) {
      return <></>;
    }

    let { quyen } = userLogin.taiKhoan;

    if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
      return (
        <>
          <table className="w-100">
            <tbody>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  <span>Họ và tên:</span>
                </td>
                <td className="col-md-9 px-2 text-capitalize">
                  <span>{userLogin.hoTen}</span>
                </td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Email:
                </td>
                <td className="col-md-9 px-2">{userLogin.email}</td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Phone:
                </td>
                <td className="col-md-9 px-2">{userLogin.soDienThoai}</td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Tài khoản:
                </td>
                <td className="col-md-9 px-2">
                  {userLogin.taiKhoan.tenDangNhap}
                </td>
              </tr>
              <tr className="p-2 row d-flex align-items-center">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Mật khẩu:
                </td>
                <td className="col-md-9 px-2 row">
                  <span className="col-8 pt-2 ">****************</span>
                  <span
                    className="col-1 btn_moune"
                    data-bs-toggle="modal"
                    data-bs-target="#modalId"
                  >
                    <img src="./img/icon_changepass.png" width={25} alt="..." />
                  </span>
                </td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Quyền:
                </td>
                <td className="col-md-9 px-2">
                  {userLogin.taiKhoan.quyen.tenQuyen}
                </td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Khoa:
                </td>
                <td className="col-md-9 px-2">{userLogin.khoa.tenKhoa}</td>
              </tr>
              <tr className="p-2 row">
                <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
                  Học vị:
                </td>
                <td className="col-md-9 px-2">{userLogin.hocVi}</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    }

    return (
      <table className="w-100">
        <tbody>
          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Họ và tên:
            </td>
            <td className="col-md-9 px-2 text-capitalize">{userLogin.tenNV}</td>
          </tr>
          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Email:
            </td>
            <td className="col-md-9 px-2">{userLogin.email}</td>
          </tr>
          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Phone:
            </td>
            <td className="col-md-9 px-2">{userLogin.sDT}</td>
          </tr>
          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Tài khoản:
            </td>
            <td className="col-md-9 px-2">{userLogin.taiKhoan.tenDangNhap}</td>
          </tr>
          <tr className="p-2 row d-flex align-items-center">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Mật khẩu:
            </td>
            <td className="col-md-9 px-2 row">
              <span className="col-8 pt-2 ">****************</span>
              <span
                className="col-1 btn_moune"
                data-bs-toggle="modal"
                data-bs-target="#modalId"
              >
                <img src="./img/icon_changepass.png" width={25} alt="..." />
              </span>
            </td>
          </tr>
          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Quyền:
            </td>
            <td className="col-md-9 px-2">
              {userLogin.taiKhoan.quyen.tenQuyen}
            </td>
          </tr>

          <tr className="p-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Chức vụ:
            </td>
            <td className="col-md-9 px-2">{userLogin.chucVu.tenCV}</td>
          </tr>
          <tr className="px-2 row">
            <td className="col-md-3 fs-6" style={{ fontWeight: "550" }}>
              Mô tả công việc:
            </td>
            <td className="col-md-9 px-2">Không có</td>
          </tr>
        </tbody>
      </table>
    );
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [];
  //
  return (
    <>
      <ModalChangePass />
      <div className="container " style={{ height: "100vh" }}>
        <div
          className="d-flex flex-column justify-content-between "
          style={{ height: "100vh" }}
        >
          <div style={{ height: "80vh" }}>
            {/*  */}
            <div style={{ height: "8vh" }}>
              <NavTab
                itemLink={{ arrLinkNavTab, chucNang: "Thông tin tài khoản" }}
              />
            </div>

            {/*  */}
            <div className="bg-white rounded p-3" style={{ height: "82vh" }}>
              <div className="row px-5 py-3">
                <div className="col-sm-4 d-flex justify-content-center" >
                  {/* image */}
                  <div style={{ maxWidth: "250px", paddingTop: "50px", position:'relative' }}>
                    {/* https://media.giphy.com/media/Q5KSkuAJtAPAGrfE0o/giphy.gif */}
                    <img
                      src={btnReloadImg?"https://media.giphy.com/media/MXuv4E0gstVysWzBOq/giphy.gif":"https://media.giphy.com/media/Q5KSkuAJtAPAGrfE0o/giphy.gif"}
                      alt="..."
                      width={"100%"}
                    >
                    </img>
                    {/*  */}
                      <MdOutlineCached 
                      onClick={() => {setBtnReloadImg(!btnReloadImg)}} 
                      style={{position:'absolute', top:55, left:0, cursor:'pointer'}} 
                      size={26} 
                       />
                  </div>
                </div>
                {/*  */}
                <div className="col-sm-8 p-2 ps-4">
                  <h2 className="text-center mb-3">Thông tin người dùng</h2>
                  {renderThongTin()}
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
