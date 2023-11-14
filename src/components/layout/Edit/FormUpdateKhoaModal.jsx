import React, { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { insertKhoaApi, updateKhoaApi } from "../../../redux/reducers/khoaReducer";

export default function FormUpdateKhoaModal({ arrKhoa, objKhoa, keyModal }) {
  const dispatch = useDispatch();
  const itemKhoaRef = useRef({ ...objKhoa });
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

    // let a = true;
    // arrKhoa.forEach((item) => {
    //   console.log("🚀 ~ file: FormUpdateKhoaModal.jsx:22 ~ arrKhoa.forEach ~ item:", item)
    //   if (itemKhoaRef.current.tenKhoa.includes(item.tenKhoa)) {
    //     alert("Trùng tên khoa!");
    //     return;
    //   }
    // });

    if (
      itemKhoaRef.current.tenKhoa.toLowerCase() == objKhoa.tenKhoa.toLowerCase()
    ) {
      alert("Trùng tên khoa!");
      return;
    }
    setErrKhoa({ ...errKhoa, errName: "" });

    dispatch(updateKhoaApi(itemKhoaRef.current));
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
      <button
        type="button"
        className="btn btn-primary mx-2 px-2"
        style={{ padding: "2px" }}
        data-bs-toggle="modal"
        data-bs-target={`#${keyModal}`}
      >
        <FaPencilAlt color="white" size={16} />
      </button>
      {/* Modal */}
      <form
        className="modal fade"
        id={keyModal}
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
                Chỉnh sửa {objKhoa.tenKhoa}
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
                  value={itemKhoaRef.current.tenKhoa}
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
              <button type="submit" className="btn btn-primary">
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
