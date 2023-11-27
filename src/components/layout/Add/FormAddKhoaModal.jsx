import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { insertKhoaApi } from "../../../redux/reducers/khoaReducer";

export default function FormAddKhoaModal({ arrKhoa }) {
  const dispatch = useDispatch();
  const itemKhoaRef = useRef({
    tenKhoa: "",
    soGiaoVien: 0,
  });
  const [errKhoa, setErrKhoa] = useState({
    errName: "",
  });

  // handle
  const hangdleSubmit = (e) => {
    e.preventDefault();
    if (itemKhoaRef.current.tenKhoa.length === 0) {
      setErrKhoa({ ...errKhoa, errName: "Hãy nhập dữ liệu!" });
      return;
    }
    //
    let a = true;
    for (let i = 0; i < arrKhoa.length; i++) {
      const element = arrKhoa[i];

      if (
        itemKhoaRef.current.tenKhoa.toLowerCase() ==
        element.tenKhoa.toLowerCase()
      ) {
        a = false;
        alert("Trùng tên khoa!");
        break;
      }
    }
    if (!a) return;

    setErrKhoa({ ...errKhoa, errName: "" });

    dispatch(insertKhoaApi(itemKhoaRef.current));
  };
  //
  const handleChangeTenKhoa = (e) => {
    let { id, value } = e.target;
    itemKhoaRef.current[id] = value;
    if (value.trim().length === 0) {
      setErrKhoa({ ...errKhoa, errName: "Hãy nhập dữ liệu!" });
    } else {
      setErrKhoa({ ...errKhoa, errName: "" });
    }
  };

  return (
    <>
      {/* Modal */}
      <form
        className="modal fade"
        id="modalAddKhoa"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
        style={{ height: "100vh" }}
        onSubmit={hangdleSubmit}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Thêm khoa mới
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3 mx-2">
                <label htmlFor="tenKhoa" className="form-label">
                  Tên khoa
                  <small id="helpErrTen" className="form-text text-danger mx-2">
                    *{errKhoa.errName}
                  </small>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm p-2"
                  name="tenKhoa"
                  id="tenKhoa"
                  aria-describedby="helpErrTen"
                  placeholder="Khoa công nghệ..."
                  onChange={handleChangeTenKhoa}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-secondary">
                Khôi phục
              </button>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Tạo mới
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
