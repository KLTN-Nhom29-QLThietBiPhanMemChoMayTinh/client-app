import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  insertGhiChuApi,
  insertGhiChuApi_MayTinh_Tbi,
  setObjThongTinGhiChu,
} from "../../redux/reducers/home2Reducer";
import {
  formatNameByHocVi,
  formatStringDate3,
  formatStringDate4,
} from "../../util/config";

export default function ComponentModalGhiChuMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);
  let { objThongTinGhiChu } = useSelector((state) => state.home2Reducer);
  let { userLogin } = useSelector((state) => state.userReducer);
  //
  let { arrPhanMem, arrThietBi } = objThongTin;

  let { arrTbi, arrPM, txtGhiChu } = objThongTinGhiChu;
  //
  // const objGhiChu = useRef({
  //   arrTbi: [],
  //   arrPM: [],
  //   txtGhiChu: "",
  // });

  // del
  const [errGhiChu, setErrGhiChu] = useState({
    arrTbi: "",
    arrPM: "",
    txtGhiChu: "",
  });
  //
  //handle
  const handleSubmit = (e) => {
    e.preventDefault();

    // kiểm tra arrPhanmem co data khong
    if (arrPhanMem.length === 0) {
      alert(
        "Chưa có thông tin. Hãy chọn một phòng học khác hoặc một phòng máy khác!"
      );
      return;
    }

    if (!checkData()) {
      //false
      return;
    }

    // true
    let txtTextGhiChu_Tbi = setTextShow_Tbi(objThongTinGhiChu, userLogin);
    // alert(txtTextGhiChu_PM + " \n " + txtTextGhiChu_Tbi);

    let objTTGhiChu = {
      ...objThongTinGhiChu,
      txtTextGhiChu_Tbi,
    };

    dispatch(
      insertGhiChuApi_MayTinh_Tbi({ userLogin, objThongTin, objTTGhiChu })
    );

    // $('#modalIdGhiChu').modal('hide');
    // document.querySelector("#modalIdGhiChu").modal("hide");
  };
  //
  const checkData = () => {
    let result = 1;
    let err_arrTbao = "";
    let err_txtGhiChu = "";
    let err_arrTbi = "";
    let err_arrPM = "";

    let { arrPM, arrTbi, txtGhiChu } = objThongTinGhiChu;
    //
    if (arrTbi.length === 0 && arrPM.length === 0) {
      err_arrTbi = "Hãy chọn thiết bị";
      err_arrPM = "Hãy chọn thiết bị";
      result = 0;
    } else {
      err_arrTbi = "";
      err_arrPM = "";
    }

    //
    if (txtGhiChu.trim().length === 0) {
      err_txtGhiChu = "Hãy nhập thông tin!";
      result = 0;
    } else {
      err_txtGhiChu = "";
    }

    //
    setErrGhiChu({
      arrTbi: err_arrTbi,
      arrPM: err_arrPM,
      txtGhiChu: err_txtGhiChu,
    });

    return result;
  };

  //
  const handleChangSelectTbi = (e) => {
    let { checked, value } = e.target;

    let arrUpdate = [...arrTbi];

    if (checked) {
      arrUpdate.push(
        arrThietBi.find((item) => {
          return item.maThietBi == value;
        })
      );
    } else {
      arrUpdate = arrUpdate.filter((item) => item.maThietBi != value);
    }
    let objData = {
      arrPM,
      arrTbi: [...arrUpdate],
      txtGhiChu,
    };

    dispatch(setObjThongTinGhiChu(objData));

    //

    setErrGhiChu({ ...errGhiChu, arrTbi: "" });
  };
  //
  const handleChangeTextGhiChu = (e) => {
    let { id, value } = e.target;

    let objData = {
      arrPM,
      arrTbi,
      txtGhiChu: value,
    };

    dispatch(setObjThongTinGhiChu(objData));

    //
    if (value.trim().length === 0) {
      setErrGhiChu({ ...errGhiChu, [id]: "Hãy ghi chú ở đây!" });
    } else {
      setErrGhiChu({ ...errGhiChu, [id]: "" });
    }
  };

  // render

  const renderCheckBoxThietBi = () => {
    if (arrThietBi?.length !== 0 && arrThietBi != null) {
      return arrThietBi?.map((item, index) => {
        let check1 = arrTbi.findIndex((e) => e.maThietBi === item.maThietBi);
        let check_status = 0;
        if (check1 >= 0) {
          check_status = 1;
        }
        return (
          <div className="form-check ms-2" key={index}>
            <input
              className="form-check-input "
              type="checkbox"
              value={item.maThietBi}
              id={`${item.maThietBi}_Tbi`}
              checked={check_status}
              onChange={handleChangSelectTbi}
            />
            <label
              className="form-check-label"
              style={{ paddingTop: "2px" }}
              htmlFor={`${item.maThietBi}_Tbi`}
            >
              <strong>{item.loaiThietBi.tenLoai}</strong> {item.tenThietBi}
            </label>
          </div>
        );
      });
    }

    return <span className="mx-2">Không có thông tin.</span>;
  };
  //
  if (
    Object.keys(objThongTin).length === 0 ||
    objThongTin.mayTinh == null ||
    Object.keys(objThongTin.mayTinh).length === 0
  ) {
    return (
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="modalIdGhiChuMayTinh"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div className=" modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title text-center w-100" id="modalTitleId">
                  Ghi chú thông tin máy
                </h3>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="container-fluid ">
                  <h4> Hãy chọn một máy tính.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  //
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdGhiChuMayTinh"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog  modal-lg" role="document">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h3 className="modal-title text-center w-100" id="modalTitleId">
                Ghi chú thông tin {objThongTin.mayTinh.moTa}
              </h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                {/* Body */}

                <div className="">
                  <strong>Danh sách thiết bị phần cứng:</strong>
                  <span className="text-danger mx-2">* {errGhiChu.arrTbi}</span>
                  <br />
                  <div
                    className="over_flow_auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {renderCheckBoxThietBi()}
                  </div>
                </div>
                {/* TextArea */}

                <div className="mb-3">
                  <label htmlFor="txtGhiChu" className="form-label">
                    <strong>Mô tả:</strong>
                    <span className="text-danger mx-2">
                      * {errGhiChu.txtGhiChu}
                    </span>
                  </label>
                  <textarea
                    className="form-control"
                    name="txtGhiChu"
                    id="txtGhiChu"
                    rows={5}
                    value={txtGhiChu}
                    onChange={handleChangeTextGhiChu}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Ghi chú
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

///
const setTextShow_Tbi = (objData, userLogin) => {
  let { arrPM, arrTbi, txtGhiChu } = objData;
  let strGhiChu = "";
  let str_TaiKhoan = thongtinTaiKhoan(userLogin);
  let str_Tbi = "";
  if (arrTbi.length !== 0) {
    str_Tbi += "\n  +\t Thiết bị lỗi: \n \t";

    for (let i = 0; i < arrTbi.length; i++) {
      let { loaiThietBi, tenThietBi } = arrTbi[i];
      str_Tbi += `${loaiThietBi.tenLoai} ${tenThietBi}`;

      if (i < arrTbi.length - 1) {
        str_Tbi += "\n \t";
      } else {
        str_Tbi += "";
      }
    }
  }

  let str_Mota = "";
  if (txtGhiChu.length !== 0) {
    str_Mota += "\n  +\t Mô tả: " + txtGhiChu;
  }

  strGhiChu = `- ${formatStringDate4()} - ${str_TaiKhoan}: ${str_Tbi} ${str_Mota}`;
  return strGhiChu;
};
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
