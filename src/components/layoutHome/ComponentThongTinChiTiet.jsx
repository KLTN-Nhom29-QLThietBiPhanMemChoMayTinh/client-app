import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { BiEditAlt, BiSolidDetail } from "react-icons/bi";
import ComponentModalDetaiGhiChulMayTinh from "./ComponentModalDetaiGhiChulMayTinh";
import { updateGhiChu_MayTinh_Tbi_btnSuaTbi, updateGhiChu_PhongMay_PM_btnSuaPM } from "../../redux/reducers/home2Reducer";
import { formatNameByHocVi, formatStringDate4 } from "../../util/config";

export default function ComponentThongTinChiTiet() {
  //
  const dispatch = useDispatch();
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);
  let { userLogin } = useSelector((state) => state.userReducer);
  let { arrPhongMay_GhiChu } = useSelector((state) => state.phongMayReducer);
  //
  if (
    Object.keys(objThongTin).length === 0 ||
    objThongTin.tang == null ||
    Object.keys(objThongTin.tang).length === 0
  ) {
    return <></>;
  }

  let {
    phong,
    tang,
    mayTinh,
    arrPhanMem,
    arrThietBi,
    giaoVien,
    nhanVien,
    monHoc,
  } = objThongTin;

  /// handle
  const handleClick_btnSuaTbi_mayTinh = (item) => {
    let str_TaiKhoan = thongtinTaiKhoan(userLogin);
    let noiDungNew = `\n- ${formatStringDate4()} - ${str_TaiKhoan} sửa thiết bị: ${
      item.tenThietBi
    }`;
    let maTK = userLogin.taiKhoan.maTK;

    dispatch(
      updateGhiChu_MayTinh_Tbi_btnSuaTbi(maTK, noiDungNew, item, mayTinh, phong)
    );
  };
  //
  const handleClick_btnSuaPM_phongMay = (item) => {
    let str_TaiKhoan = thongtinTaiKhoan(userLogin);
    let noiDungNew = `\n- ${formatStringDate4()} - ${str_TaiKhoan} sửa phần mềm: ${
      item.tenPhanMem
    } (${item.phienBan})`;
    let maTK = userLogin.taiKhoan.maTK;
    dispatch(
      updateGhiChu_PhongMay_PM_btnSuaPM(
        maTK,
        noiDungNew,
        item,
        arrPhongMay_GhiChu,
        phong,
        tang
      )
    );
  };

  // render
  const renderThongTinTheoPhong = () => {
    if (Object.keys(phong).length === 0) {
      return <></>;
    }
    // render
    const renderArrPhanMem = () => {
      if (arrPhanMem.length === 0) {
        return <li className="ms-3">Không có.</li>;
      }
      return arrPhanMem?.map((item, index) => {
        if (!item.trangThai) {
          return <></>;
        }
        if (!item.trangThaiPM) {
          return (
            <li key={index} className="ms-3 text-danger">
              {item.tenPhanMem}
              <button
                type="button"
                className="btn btn-outline-primary mx-2 px-2"
                style={{ padding: "2px" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Bấm vào nút OK để xác nhận đã sửa. " +
                        item.tenPhanMem +
                        `( ${item.phienBan} )`
                    )
                  ) {
                    handleClick_btnSuaPM_phongMay(item);
                  }
                }}
              >
                <BiEditAlt size={20} />
              </button>
            </li>
          );
        }
        return (
          <li key={index} className="ms-3">
            {item.tenPhanMem}
          </li>
        );
      });
    };
    //
    const renderBtnDSGhiChuPM = () => {
      let { dsGhiChuPM } = phong;
      if (dsGhiChuPM == null || dsGhiChuPM.length === 0) {
        return <></>;
      }
      return (
        <div>
          <span style={{ fontWeight: 600 }}>- Danh sách ghi chú: </span>
          <button
            type="button"
            className="btn btn-outline-primary mx-2 px-2"
            style={{ padding: "2px" }}
            data-bs-toggle="modal"
            data-bs-target="#modalIdDetailDSGhiChuPM"
          >
            <BiSolidDetail size={20} />
          </button>
        </div>
      );
    };
    //
    return (
      <>
        <div className="pt-2">
          <span className="h5" style={{ fontWeight: 600 }}>
            Phòng: {phong.tenPhong}
          </span>
          {renderBtnDSGhiChuPM()}
          <div>
            <span style={{ fontWeight: 600 }}>- Số lượng máy: </span>
            <span> {phong.soMay}</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Giáo viên dạy: </span>
            <span>Đang cập nhật!</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Môn học: </span>
            <span>Đang cập nhật!</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Ứng dụng phần mềm: </span>{" "}
            <br />
            {renderArrPhanMem()}
          </div>
        </div>
      </>
    );
  };
  //
  const renderThongTinTheoMayTinh = () => {
    if (mayTinh == null || Object.keys(mayTinh).length === 0) {
      return <></>;
    }
    // render
    const renderThietBi = () => {
      if (arrThietBi?.length === 0)
        return (
          <>
            <li className="ms-3">Không có.</li>
          </>
        );
      return arrThietBi?.map((item, index) => {
        if (!item.status) {
          // thiet biij khong con sử dụng nưa
          return <></>;
        }
        let { loaiThietBi } = item;
        if (!item.trangThaiTbi) {
          return (
            <li key={index} className="ms-3 text-danger">
              <strong>{loaiThietBi.tenLoai}: </strong>
              {item.tenThietBi}
              <button
                type="button"
                className="btn btn-outline-primary mx-2 px-2"
                style={{ padding: "2px" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Bấm vào nút OK để xác nhận đã sửa. " +
                        loaiThietBi.tenLoai +
                        ": " +
                        item.tenThietBi
                    )
                  ) {
                    handleClick_btnSuaTbi_mayTinh(item);
                  }
                }}
              >
                <BiEditAlt size={20} />
              </button>
            </li>
          );
        }
        return (
          <li key={index} className="ms-3">
            <strong>{loaiThietBi.tenLoai}: </strong>
            {item.tenThietBi}
          </li>
        );
      });
    };

    //
    const renderTrangThai = () => {
      if (
        mayTinh.trangThai.toLowerCase().includes("Đang hoạt động".toLowerCase())
      ) {
        return <span>{mayTinh.trangThai}</span>;
      }
      return <span style={{ color: "red" }}>{mayTinh.trangThai}</span>;
    };
    //
    const renderBtnDSGhiChu = () => {
      let { dsGhiChu } = mayTinh;

      if (dsGhiChu == null || dsGhiChu.length === 0) {
        return <></>;
      }
      return (
        <div>
          <span style={{ fontWeight: 600 }}>- Danh sách ghi chú: </span>
          <button
            type="button"
            className="btn btn-outline-primary mx-2 px-2"
            style={{ padding: "2px" }}
            data-bs-toggle="modal"
            data-bs-target="#modalIdDetailDSGhiChu"
          >
            <BiSolidDetail size={20} />
          </button>
        </div>
      );
    };
    //
    return (
      <>
        <div className="pt-2">
          <span className="h5" style={{ fontWeight: 600 }}>
            {mayTinh.moTa}
          </span>
          {renderBtnDSGhiChu()}
          <div>
            <span style={{ fontWeight: 600 }}>- Trạng thái: </span>
            {renderTrangThai()}
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Thiết bị phần cứng: </span>{" "}
            <br />
            {renderThietBi()}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="h-100 mb-2 over_flow_auto">
      <div className="pt-2">
        <h5 style={{ fontWeight: 600 }}>
          {tang.toaNha.tenToaNha} - {tang.tenTang}{" "}
        </h5>
      </div>
      {renderThongTinTheoPhong()}

      {renderThongTinTheoMayTinh()}
    </div>
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
