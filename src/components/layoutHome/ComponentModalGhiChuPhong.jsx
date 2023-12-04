import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  insertGhiChuApi,
  setObjThongTinGhiChu,
} from "../../redux/reducers/home2Reducer";
import {
  formatNameByHocVi,
  formatStringDate3,
  formatStringDate4,
} from "../../util/config";

export default function ComponentModalGhiChuPhong() {
  //
  const dispatch = useDispatch();
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);
  let { objThongTinGhiChu } = useSelector((state) => state.home2Reducer);
  let { userLogin } = useSelector((state) => state.userReducer);
  //
  let { arrPhanMem, arrThietBi, mayTinh } = objThongTin;

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
    let txtTextGhiChu_PM = setTextShow_PM(objThongTinGhiChu, userLogin);
    // alert(txtTextGhiChu_PM + " \n " + txtTextGhiChu_Tbi);

    let objTTGhiChu = {
      ...objThongTinGhiChu,
      txtTextGhiChu_PM,
    };

    dispatch(insertGhiChuApi({ userLogin, objThongTin, objTTGhiChu }));

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
  const handleChangSelectPM = (e) => {
    let { checked, value } = e.target;

    let arrUpdate = [...arrPM];

    if (checked) {
      arrUpdate.push(
        arrPhanMem.find((item) => {
          return item.maPhanMem == value;
        })
      );
    } else {
      arrUpdate = arrUpdate.filter((item) => item.maPhanMem != value);
    }
    let objData = {
      arrPM: [...arrUpdate],
      arrTbi,
      txtGhiChu,
    };

    dispatch(setObjThongTinGhiChu(objData));
    //
    setErrGhiChu({ ...errGhiChu, arrPM: "" });
  };
  //
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
  const renderCheckBoxPhanMem = () => {
    if (arrPhanMem.length === 0) {
      return <span className="mx-2">Không có thông tin.</span>;
    }
    return arrPhanMem?.map((item, index) => {
      let check1 = arrPM.findIndex((e) => e.maPhanMem === item.maPhanMem);
      let check_status = 0;
      if (check1 >= 0) {
        check_status = 1;
      }
      return (
        <div className="form-check ms-2" key={index}>
          <input
            className="form-check-input "
            type="checkbox"
            value={item.maPhanMem}
            id={`${item.maPhanMem}_PM`}
            checked={check_status}
            onChange={handleChangSelectPM}
          />
          <label
            className="form-check-label"
            style={{ paddingTop: "2px" }}
            htmlFor={`${item.maPhanMem}_PM`}
          >
            {item.tenPhanMem} ( {item.phienBan} )
          </label>
        </div>
      );
    });
  };

  //
  if (
    Object.keys(objThongTin).length === 0 ||
    Object.keys(objThongTin.phong).length === 0
  ) {
    return (
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="modalIdGhiChuPhong"
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
                  <h4> Hãy chọn một phòng học.</h4>
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
        id="modalIdGhiChuPhong"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog  modal-lg" role="document">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h3 className="modal-title text-center w-100" id="modalTitleId">
                Ghi chú thông tin {objThongTin.phong.tenPhong}
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
                  <strong>Danh sách ứng dụng phần mềm:</strong>
                  <span className="text-danger mx-2">* {errGhiChu.arrPM}</span>
                  <br />
                  <div
                    className="over_flow_auto"
                    style={{ maxHeight: "200px" }}
                  >
                    {renderCheckBoxPhanMem()}
                  </div>
                </div>

                {/* TextArea */}

                <div className="mb-3 mt-2">
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
const setTextShow_PM = (objData, userLogin) => {
  let { arrPM, arrTbi, txtGhiChu } = objData;
  let strGhiChu = "";
  let str_TaiKhoan = thongtinTaiKhoan(userLogin);
  let str_PM = "";
  if (arrPM.length !== 0) {
    str_PM += "\n  +\t Phần mềm lỗi: \n \t";

    for (let i = 0; i < arrPM.length; i++) {
      let { tenPhanMem, phienBan } = arrPM[i];
      str_PM += `${tenPhanMem} ( ${phienBan} )`;

      if (i < arrPM.length - 1) {
        str_PM += "\n \t";
      } else {
        str_PM += "";
      }
    }
  }

  let str_Mota = "";
  if (txtGhiChu.length !== 0) {
    str_Mota += "\n  +\t Mô tả: " + txtGhiChu;
  }

  strGhiChu = `- ${formatStringDate4()} - ${str_TaiKhoan}: ${str_PM} ${str_Mota}`;
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
