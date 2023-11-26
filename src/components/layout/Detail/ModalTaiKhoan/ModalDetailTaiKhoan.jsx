import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaiKhoan2 } from "../../../../redux/reducers/taiKhoanReducer";
import { REGEX_PASSWORD } from "../../../../util/config";

export default function ModalDetailTaiKhoan() {
  //
  const dispatch = useDispatch();
  //
  const { objUser, arrTaiKhoan } = useSelector(
    (state) => state.taiKhoanReducer
  );
  let { taiKhoan } = objUser;

  let [taiKhoanNew, setTaiKhoanNew] = useState({
    taiKhoan: {
      userName: "",
      pass0: "",
      pass1: "",
      pass2: "",
    },
    err: {
      userName: "",
      pass0: "",
      pass1: "",
      pass2: "",
    },
  });
  //
  /**
   * 0 - Gia tri ban dau
   * 1 - update tai khoan
   * -1 - update pass
   */
  let [status, setStatus] = useState(0);
  //handle
  const handleSubmitChangeTaiKhoan = (e) => {
    e.preventDefault();
    let userNameNew = taiKhoanNew.taiKhoan.userName;

    //
    if (userNameNew === taiKhoan.tenDangNhap) {
      alert("Trùng tài khoản!");
      return;
    }
    //
    let z1 = false;
    arrTaiKhoan.forEach((e) => {
      if (e.tenDangNhap === userNameNew) {
        z1 = true;
        return;
      }
    });

    if (z1) {
      alert(`Tài khoản ${userNameNew} đã được sử dụng!`);
      return;
    }
    //
    let taiKhoanZ = { ...taiKhoan, tenDangNhap: userNameNew };

    dispatch(updateTaiKhoan2(taiKhoanZ));
    setStatus(0);
  };
  //
  const handleSubmitChangePass = (e) => {
    e.preventDefault();
     // 
      if (!checkPass()) {
      //false
      return;
    }
    //
    let { pass0, pass1 } = taiKhoanNew.taiKhoan;

    if(pass0 === pass1){
      alert("Mật khẩu mới trùng với mật khẩu cũ!")
      setTaiKhoanNew({ ...taiKhoanNew, taiKhoan: {
        pass1: "",
        pass2: "",
      } });
    }
    //
    console.log('Chua kieem tra duoc co dung mk cũ khog');
    
    //
    let taiKhoanZ = { ...taiKhoan, matKhau: pass1 };
    dispatch(updateTaiKhoan2(taiKhoanZ));
    setStatus(0);
  };
  //
  const checkPass = () => {
    const regex = new RegExp(REGEX_PASSWORD);
    let result = true;
    let booleanRegex = false;
    let err_pass0 = "";
    let err_pass1 = "";
    let err_pass2 = "";

    let { pass0, pass1, pass2 } = taiKhoanNew.taiKhoan;

    if (pass0.length === 0) {
      err_pass0 = "Hãy nhập dữ liệu!";
      result = false;
    } else {
      booleanRegex = regex.test(pass0);
      if (!booleanRegex) {
        err_pass0 = "Mật khẩu trên 6 ký tự có ít nhất một chữ cái hoắc chữ số!";
        result = false;
      } else {
        err_pass0 = "";
      }
    }
    //
    if (pass1.length === 0) {
      err_pass1 = "Hãy nhập dữ liệu!";
      result = false;
    } else {
      booleanRegex = regex.test(pass1);
      if (!booleanRegex) {
        err_pass1 = "Mật khẩu trên 6 ký tự có ít nhất một chữ cái hoắc chữ số!";
        result = false;
      } else {
        err_pass1 = "";
      }
    }
    //
    if (pass2.length === 0) {
      err_pass2 = "Hãy nhập dữ liệu!";
      result = false;
    } else {
      if (pass2 === pass1) {
        err_pass2 = "";
      } else {
        err_pass2 = "Hai mật khẩu mới phải giống nhau!";
        result = false;
      }
    }

    //

    let err = {
      ...taiKhoanNew.err,
      pass0: err_pass0,
      pass1: err_pass1,
      pass2: err_pass2,
    };

    setTaiKhoanNew({ ...taiKhoanNew, err });

    return result;
  };
  //
  const handleChangeTaiKhoan = (e) => {
    let value = e.target.value;
    let { taiKhoan, err } = taiKhoanNew;
    taiKhoan = { ...taiKhoan, userName: value };
    if (value.trim().length === 0) {
      err = { ...err, userName: "Hãy nhập giá trị!" };
    } else {
      err = { ...err, userName: "" };
    }
    setTaiKhoanNew({ taiKhoan, err });
  };
  const handleChangePass = (e) => {
    let { id, value } = e.target;
    let { taiKhoan, err } = taiKhoanNew;
    taiKhoan = { ...taiKhoan, [id]: value };

    if (value.trim().length === 0) {
      err = { ...err, [id]: "Hãy nhập giá trị!" };
    } else {
      err = { ...err, [id]: "" };
    }
    setTaiKhoanNew({ taiKhoan, err });
  };

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
            <span
              onClick={() => {
                setStatus(1);
              }}
              className="text-primary text-decoration-underline btn_moune"
            >
              Sửa
            </span>
            )
          </p>
          <p>
            <strong>Mật khẩu: </strong> ********** (
            <span
              onClick={() => {
                setStatus(-1);
              }}
              className="text-primary text-decoration-underline btn_moune"
            >
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
            <span
              onClick={() => {
                setStatus(1);
              }}
              type="button"
              className="text-primary text-decoration-underline btn_moune"
            >
              Sửa
            </span>
            )
          </p>
          <p>
            <strong>Mật khẩu: </strong> ********** (
            <span
              onClick={() => {
                setStatus(-1);
              }}
              className="text-primary text-decoration-underline btn_moune"
            >
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
  // 1
  const renderCenterMOdal = () => {
    if (status === 0) {
      return (
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
              Đóng
            </button>
          </div>
        </div>
      );
    }
    //update TaiKhoan
    if (status == 1) {
      return (
        <div className="modal-content">
          <div className="modal-body p-3">
            {/*  */}
            <h3 className="text-center">Thay đổi tài khoản</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="txtTaiKhoan1" className="form-label">
                  Tài khoản cũ
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="txtTaiKhoan1"
                  id="txtTaiKhoan1"
                  value={taiKhoan.tenDangNhap}
                  placeholder="username..."
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtTaiKhoan" className="form-label">
                  Tài khoản mới
                  <small
                    id="errTaiKhoan"
                    className="form-text  mx-2 text-danger"
                  >
                    *{taiKhoanNew.err.userName}
                  </small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="txtTaiKhoan"
                  id="txtTaiKhoan"
                  aria-describedby="errTaiKhoan"
                  placeholder="username..."
                  onChange={handleChangeTaiKhoan}
                />
              </div>
            </form>

            {/*  */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setStatus(0);
              }}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitChangeTaiKhoan}
            >
              Thay đổi
            </button>
          </div>
        </div>
      );
    }

    // update Passs
    if (status == -1) {
      return (
        <div className="modal-content">
          <div className="modal-body">
            {/*  */}
            <h3 className="text-center">Thay đổi tài khoản</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="pass0" className="form-label">
                  Mật khẩu cũ
                  <small
                    id="errTaiKhoan"
                    className="form-text  mx-2 text-danger"
                  >
                    *{taiKhoanNew.err.pass0}
                  </small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="pass0"
                  id="pass0"
                  placeholder={"password"}
                  onChange={handleChangePass}
                />
              </div>
              {/* pass new */}
              <div className="mb-3">
                <label htmlFor="pass1" className="form-label">
                  Mật khẩu mới
                  <small
                    id="errTaiKhoan"
                    className="form-text  mx-2 text-danger"
                  >
                    *{taiKhoanNew.err.pass1}
                  </small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="pass1"
                  id="pass1"
                  onChange={handleChangePass}
                  placeholder={"password"}
                />
              </div>
              {/* pass new  2*/}
              <div className="mb-3">
                <label htmlFor="pass2" className="form-label">
                  Nhập lại mật khẩu
                  <small
                    id="errTaiKhoan"
                    className="form-text  mx-2 text-danger"
                  >
                    *{taiKhoanNew.err.pass2}
                  </small>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="pass2"
                  id="pass2"
                  onChange={handleChangePass}
                  placeholder={"password"}
                />
              </div>
            </form>

            {/*  */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setStatus(0);
              }}
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmitChangePass}
            >
              Thay đổi
            </button>
          </div>
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
          {renderCenterMOdal()}
        </div>
      </div>
    </>
  );
}
