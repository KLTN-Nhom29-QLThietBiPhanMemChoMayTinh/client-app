import React from "react";
import { useSelector } from "react-redux";

export default function ModalDetailTaiKhoan() {
  const { objUser } = useSelector((state) => state.taiKhoanReducer);
  //
  const renderUserModal = () => {
    if (Object.keys(objUser).length === 0)
      return <>Chưa có thông tin hãy quay lại sau.</>;

    let { quyen } = objUser.taiKhoan;

    if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
      let { maGiaoVien, taiKhoan, hoTen, soDienThoai, khoa } = objUser;
      return (
        <div className="p-3">
          <h3 className="text-center">Thông tin tài khoản</h3>
          <p>
            <strong>Tài khoản: </strong> {taiKhoan.tenDangNhap} (
            <span className="text-primary text-decoration-underline btn_moune">
              Sửa
            </span>
            )
          </p>
          <p>
            <strong>Mật khẩu: </strong> ********** (
            <span className="text-primary text-decoration-underline btn_moune">
              Sửa
            </span>
            )
          </p>
          <p>
            <strong>Mã giáo viên: </strong> {maGiaoVien}
          </p>
          <p>
            <strong>Tên giáo viên: </strong> {hoTen}
          </p>
          <p>
            <strong>Số điện thoại: </strong> {soDienThoai}
          </p>
          <p>
            <strong>Khoa: </strong> {khoa.tenKhoa}39
          </p>
        </div>
      );
    } else {
      let { maNV, taiKhoan, tenNV, sDT, chucVu } = objUser;
      return (
        <div className="p-3">
          <h3 className="text-center">Thông tin tài khoản</h3>
          <p>
            <strong>Tài khoản: </strong> {taiKhoan.tenDangNhap} (
            <input type="button"
              className="text-primary text-decoration-underline btn_moune"
            >
              Sửa
            </input>
            )
          </p>
          <p>
            <strong>Mật khẩu: </strong> ********** (
            <span className="text-primary text-decoration-underline btn_moune">
              Sửa
            </span>
            )
          </p>
          <p>
            <strong>Mã nhân viên: </strong> {maNV}
          </p>
          <p>
            <strong>Tên nhân viên: </strong> {tenNV}
          </p>
          <p>
            <strong>Số điện thoại: </strong> {sDT}
          </p>
          <p>
            <strong>Công việc: </strong> {chucVu.tenCV}
          </p>
        </div>
      );
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade "
        id="modalDetail"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        {/*  */}
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-body">
              {/*  */}
              {renderUserModal()}

              {/*  */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

