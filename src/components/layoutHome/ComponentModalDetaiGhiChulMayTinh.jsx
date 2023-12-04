import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  formatNameByHocVi,
  formatStringDate3,
  formatStringDate4,
} from "../../util/config";
import { updateGhiChu_MayTinh_Tbi } from "../../redux/reducers/home2Reducer";

//
let arrGhiChu = [];
//
export default function ComponentModalDetaiGhiChulMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);
  let { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  let { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  let { userLogin } = useSelector((state) => state.userReducer);
  //
  let [rowArrGhiChu, setRowArrGhiChu] = useState(0);
  let value_check_sua = 0; // check data da sửa chua: 1 đã sửa -- 0 chưa
  if (
    objThongTin == null ||
    Object.keys(objThongTin).length === 0 ||
    objThongTin.mayTinh == null ||
    Object.keys(objThongTin.mayTinh).length === 0 ||
    objThongTin.mayTinh.dsGhiChu == null ||
    objThongTin.mayTinh.dsGhiChu.length === 0
  ) {
    return <></>;
  } else {
    arrGhiChu = [...objThongTin.mayTinh.dsGhiChu];
    arrGhiChu.sort((a, b) => {
      let val_a = new Date(a.ngayBaoLoi);
      let val_b = new Date(b.ngayBaoLoi);
      return val_b.getTime() - val_a.getTime();
    });
  }

  // handle
  const handle_btnSuaXong = () => {
    let objData = arrGhiChu[rowArrGhiChu];
    let maTk = userLogin.taiKhoan.maTK;
    let noiDungNew = objData.noiDung;
    //
    let str_TaiKhoan = thongtinTaiKhoan(userLogin);
    noiDungNew += `\n- ${formatStringDate4()} - ${str_TaiKhoan}:  Đã sửa.`;
    objData = {
      ...objData,
      nguoiSuaLoi: maTk,
      ngaySua: new Date(),
      noiDung: noiDungNew,
    };
    let {phong} = objThongTin;

    dispatch(updateGhiChu_MayTinh_Tbi(objData,phong));
  };

  // render thonog tin
  const renderThongtinGhiChuMayTinh = () => {
    let objData = arrGhiChu[rowArrGhiChu];

    let { noiDung, mayTinh, ngayBaoLoi, ngaySua, maTKBaoLoi, nguoiSuaLoi } =
      objData;

    let txtTenUser_BaoLoi = "";
    let txtTenUser_SuaLoi = "Chưa sửa";
    let txtNgay_BaoLoi = formatStringDate3(new Date(ngayBaoLoi));
    let txtNgay_SuaLoi = "Chưa sửa";

    // tim user bao loi
    for (let i = 0; i < arrNhanVien.length; i++) {
      let maNV = arrNhanVien[i].maNV;
      if (maTKBaoLoi.includes(maNV)) {
        txtTenUser_BaoLoi = arrNhanVien[i].tenNV + "( " + maNV + " )";
      }
    }
    if (txtTenUser_BaoLoi.length === 0) {
      for (let i = 0; i < arrGiaoVien.length; i++) {
        let maGiaoVien = arrGiaoVien[i].maGiaoVien;
        if (maTKBaoLoi.includes(maGiaoVien)) {
          txtTenUser_BaoLoi = arrGiaoVien[i].hoTen + "( " + maGiaoVien + " )";
        }
      }
    }
    // check xem da sua chua
    if (ngaySua !== null) {
      // check đã sửa
      value_check_sua = 1;
      //tim user sua
      for (let i = 0; i < arrNhanVien.length; i++) {
        let maNV = arrNhanVien[i].maNV;
        if (nguoiSuaLoi.includes(maNV)) {
          txtTenUser_SuaLoi = arrNhanVien[i].tenNV + "( " + maNV + " )";
        }
      }
      if (txtTenUser_BaoLoi.length === 0) {
        for (let i = 0; i < arrGiaoVien.length; i++) {
          let maGiaoVien = arrGiaoVien[i].maGiaoVien;
          if (nguoiSuaLoi.includes(maGiaoVien)) {
            txtTenUser_SuaLoi = arrGiaoVien[i].hoTen + "( " + maGiaoVien + " )";
          }
        }
      }

      // tim ngay sửa
      txtNgay_SuaLoi = formatStringDate3(new Date(ngaySua));
    }

    return (
      <>
        <div>
          <span style={{ fontWeight: 600 }}>- Máy tính: </span>
          <span>{mayTinh.moTa}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>- Người báo lỗi: </span>
          <span>{txtTenUser_BaoLoi}</span>
        </div>

        <div>
          <span style={{ fontWeight: 600 }}>- Thời gian báo lỗi: </span>
          <span>{txtNgay_BaoLoi}</span>
        </div>

        <div>
          <span style={{ fontWeight: 600 }}>- Nhân viên sửa: </span>
          <span>{txtTenUser_SuaLoi}</span>
        </div>

        <div>
          <span style={{ fontWeight: 600 }}>- Thời gian sửa lỗi: </span>
          <span>{txtNgay_SuaLoi}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>- Mô tả: </span>
          <div className="mb-3">
            <label htmlFor="txtArea" className="form-label" />
            <textarea
              className="form-control"
              name="txtArea"
              id="txtArea"
              rows={8}
              value={noiDung}
              disabled
            />
          </div>
        </div>
      </>
    );
  };
  //
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdDetailDSGhiChu"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center w-100" id="modalTitleId">
                Danh sách ghi chú
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                {renderThongtinGhiChuMayTinh()}
              </div>
            </div>
            <div className="modal-footer ">
              <div className="d-flex justify-content-between w-100">
                <div>
                  {/* btn chuyển page cho Tang */}
                  <div className="row m-2">
                    <button
                      type="button"
                      className="btn btn-primary col p-0 mx-1"
                      onClick={() => {
                        if (rowArrGhiChu == 0) return;

                        setRowArrGhiChu(rowArrGhiChu - 1);
                      }}
                    >
                      <MdKeyboardDoubleArrowLeft size={28} />
                    </button>
                    {rowArrGhiChu + 1}
                    <button
                      type="button"
                      className="btn btn-primary col p-0 mx-1"
                      onClick={() => {
                        if (rowArrGhiChu + 1 >= arrGhiChu.length) return;

                        setRowArrGhiChu(rowArrGhiChu + 1);
                      }}
                    >
                      <MdOutlineKeyboardDoubleArrowRight size={28} />
                    </button>
                  </div>
                </div>
                <button
                  disabled={value_check_sua}
                  type="button"
                  className="btn btn-primary"
                  onClick={handle_btnSuaXong}
                  data-bs-dismiss="modal"
                >
                  Sửa xong
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//
const thongtinTaiKhoan = (userLogin) => {
  let { quyen, maTK } = userLogin.taiKhoan;
  let str_TaiKhoan = "";

  if (quyen.tenQuyen.toLowerCase().includes("Giáo viên".toLowerCase())) {
    let gv = {
      hocVi: userLogin.hocVi,
      name: userLogin.hoTen,
    };
    str_TaiKhoan = formatNameByHocVi(gv);
  } else {
    if (
      userLogin.chucVu.tenCV.toLowerCase().includes("quản lý".toLowerCase())
    ) {
      str_TaiKhoan = "QL. " + userLogin.tenNV;
    } else {
      str_TaiKhoan = "NV. " + userLogin.tenNV;
    }
  }

  return `${str_TaiKhoan} (${maTK})`;
};
