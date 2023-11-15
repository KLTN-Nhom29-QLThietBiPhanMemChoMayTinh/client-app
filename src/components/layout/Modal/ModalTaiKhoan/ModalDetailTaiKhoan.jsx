import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaiKhoan2 } from "../../../../redux/reducers/taiKhoanReducer";

export default function ModalDetailTaiKhoan() {

  //
  const dispatch = useDispatch();
  //
  const { objUser,arrTaiKhoan } = useSelector((state) => state.taiKhoanReducer);
  let {taiKhoan} = objUser;

  let [taiKhoanNew, setTaiKhoanNew ] =useState ({
    taiKhoan:{
      userName:'',
      pass1:'',
      pass2:''
    },
    err: {
      userName:'',
      pass1:'',
      pass2:''
    }
  })
  //
  /**
   * 0 - Gia tri ban dau
   * 1 - update tai khoan
   * -1 - update pass
   */
  let [status, setStatus] = useState(0);
  //handle 
  const handleSubmitChangeTaiKhoan = (e) =>{
    e.preventDefault();
    console.log(taiKhoanNew);
    let userNameNew = taiKhoanNew.taiKhoan.userName;
    
// 
    if (userNameNew === taiKhoan.tenDangNhap) {
      alert('Trùng tài khoản!')
      return 
    }
    //
    let z1 = false;
    arrTaiKhoan.forEach(e => {
      if(e.tenDangNhap === userNameNew) {
        z1 = true;
        return 
      }
    });
    
    if(z1) {
      alert(`Tài khoản ${userNameNew} đã được sử dụng!`)
      return 
    }
// 
    let taiKhoanZ ={...taiKhoan, tenDangNhap: userNameNew}
    
    console.log("🚀 ~ file: ModalDetailTaiKhoan.jsx:51 ~ handleSubmitChangeTaiKhoan ~ taiKhoanZ:", taiKhoanZ)
    
    dispatch(updateTaiKhoan2(taiKhoanZ))
    setStatus(0);
  }
  //
  const handleChangeTaiKhoan = (e) => {
    let value = e.target.value;
    let {taiKhoan, err} = taiKhoanNew;
    taiKhoan = {...taiKhoan, userName:value}
    if(value.trim().length === 0){
      err = {...err, userName:'Hãy nhập giá trị!'}
    }
    else {
      err = {...err, userName:''}
    }
    setTaiKhoanNew({taiKhoan, err})

  }
  
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
              Close
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
                  <small id="errTaiKhoan" className="form-text  mx-2 text-danger">
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
            <>pass</>

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
