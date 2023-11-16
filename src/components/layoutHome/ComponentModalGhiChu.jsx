import React from "react";
import { useSelector } from "react-redux";

export default function ComponentModalGhiChu() {
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);

  //
  let { arrPhanMem, arrThietBi } = objThongTin;

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
            id="flexCheckDefault"
          />
          <label
            className="form-check-label"
            style={{ paddingTop: "2px" }}
            htmlFor="flexCheckDefault"
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
              id="flexCheckDefault"
            />
            <label
              className="form-check-label"
              style={{ paddingTop: "2px" }}
              htmlFor="flexCheckDefault"
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
          <form className="modal-content">
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
                    <strong>Danh sách ứng dụng phần mềm:</strong> <br />
                    <div
                      className="over_flow_auto"
                      style={{ maxHeight: "150px" }}
                    >
                      {renderCheckBoxPhanMem()}
                    </div>
                  </div>
                  <div className="col-6">
                    <strong>Danh sách thiết bị phần cứng:</strong> <br />
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
                  </label>
                  <textarea
                    className="form-control"
                    name="txtGhiChu"
                    id="txtGhiChu"
                    rows={5}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="reset" className="btn btn-secondary">
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
