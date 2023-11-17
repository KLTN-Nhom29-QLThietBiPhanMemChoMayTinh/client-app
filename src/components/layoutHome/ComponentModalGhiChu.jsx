import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function ComponentModalGhiChu() {
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);

  //
  let { arrPhanMem, arrThietBi } = objThongTin;

  //
  const objGhiChu = useRef({
    arrTbi: [],
    arrPM: [],
    txtGhiChu: "",
  });

  const [errGhiChu, setErrGhiChu] = useState({
    arrTbi: "",
    arrPM: "",
    txtGhiChu: "",
  });
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
    alert('Đang cập nhật!')
    console.log(objGhiChu.current);

  };
  //
  const checkData = () => {
    let result = 1;
    let err_arrTbi = "";
    let err_arrPM = "";
    let err_txtGhiChu = "";

    let { arrPM, arrTbi, txtGhiChu } = objGhiChu.current;
    //
    if (arrPM.length === 0) {
      err_arrPM = "Hãy nhập thông tin!";
      result = 0;
    } else {
      err_arrPM = "";
    }
    //
    if (arrTbi.length === 0 && arrThietBi.length !== 0 ) {
      err_arrTbi = "Hãy nhập thông tin!";
      result = 0;
    } else {
      err_arrTbi = "";
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
      arrPM: err_arrPM,
      arrTbi: err_arrTbi,
      txtGhiChu: err_txtGhiChu,
    });

    return result;
  };
  //
  const handleChangSelectPM = (e) => {
    let { checked, value } = e.target;

    let arrUpdate = objGhiChu.current.arrPM;

    if (checked) {
      arrUpdate.push(
        arrPhanMem.find((item) => {
          return item.maPhanMem == value;
        })
      );
    } else {
      arrUpdate = arrUpdate.filter((item) => item.maPhanMem != value);
    }
    //
    objGhiChu.current.arrPM = [...arrUpdate];
    if (objGhiChu.current.arrPM.length === 0) {
      setErrGhiChu({ ...errGhiChu, arrPM: "Hãy chọn phần mềm!" });
    } else {
      setErrGhiChu({ ...errGhiChu, arrPM: "" });
    }
  };
  //
  const handleChangSelectTbi = (e) => {
    let { checked, value } = e.target;

    let arrUpdate = objGhiChu.current.arrTbi;

    if (checked) {
      arrUpdate.push(
        arrThietBi.find((item) => {
          return item.maThietBi == value;
        })
      );
    } else {
      arrUpdate = arrUpdate.filter((item) => item.maThietBi != value);
    }

    objGhiChu.current.arrTbi = [...arrUpdate];

    //
    objGhiChu.current.arrTbi = [...arrUpdate];
    if (objGhiChu.current.arrTbi.length === 0) {
      setErrGhiChu({ ...errGhiChu, arrTbi: "Hãy chọn thiết bị!" });
    } else {
      setErrGhiChu({ ...errGhiChu, arrTbi: "" });
    }
  };
  //
  const handleChangeTextGhiChu = (e) => {
    let { id, value } = e.target;

    objGhiChu.current[id] = value;
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
      return (
        <div className="form-check ms-2" key={index}>
          <input
            className="form-check-input "
            type="checkbox"
            value={item.maPhanMem}
            id={`${item.maPhanMem}_PM`}
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
  const renderCheckBoxThietBi = () => {
    if (arrThietBi?.length !== 0 && arrThietBi != null) {
      return arrThietBi?.map((item, index) => {
        return (
          <div className="form-check ms-2" key={index}>
            <input
              className="form-check-input "
              type="checkbox"
              value={item.maThietBi}
              id={`${item.maThietBi}_Tbi`}
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
    Object.keys(objThongTin.phong).length === 0
  ) {
    return (
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="modalIdDetail"
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
        id="modalIdGhiChu"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog  modal-lg" role="document">
          <form className="modal-content" onSubmit={handleSubmit}>
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
              <div className="container-fluid">
                {/* Body */}

                <div className="row">
                  <div className="col-6">
                    <strong>Danh sách ứng dụng phần mềm:</strong>
                    <span className="text-danger mx-2">
                      * {errGhiChu.arrPM}
                    </span>
                    <br />
                    <div
                      className="over_flow_auto"
                      style={{ maxHeight: "150px" }}
                    >
                      {renderCheckBoxPhanMem()}
                    </div>
                  </div>
                  <div className="col-6">
                    <strong>Danh sách thiết bị phần cứng:</strong>
                    <span className="text-danger mx-2">
                      * {errGhiChu.arrTbi}
                    </span>
                    <br />
                    <div
                      className="over_flow_auto"
                      style={{ maxHeight: "150px" }}
                    >
                      {renderCheckBoxThietBi()}
                    </div>
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
                    defaultValue={""}
                    onChange={handleChangeTextGhiChu}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onChange={() => {
                  //
                  setErrGhiChu({
                    arrPM: "",
                    arrTbi: "",
                    txtGhiChu: "",
                  });
                }}
                type="reset"
                className="btn btn-secondary"
              >
                Làm mới
              </button>
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
