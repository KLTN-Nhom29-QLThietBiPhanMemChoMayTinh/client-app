import React from "react";
import { useSelector } from "react-redux";

export default function ModalSearchMayTinh() {
  //
  let { valueSelToaNha, valueSelTang, valueSelPhongMay, valueSelTrangThai } =
    useSelector((state) => state.mayTinhReducer);

  //

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdSearchSelect"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Tìm kiếm thông tin
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
                {/* tòa nhà */}
                <div class="mb-3 mx-3">
                  <label for="searchToaNha" class="form-label">
                    Tìm theo tòa nhà <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    class="form-select  "
                    name="searchToaNha"
                    id="searchToaNha"
                  >
                    <option value="-1">Tất cả</option>
                    <option value="">New Delhi</option>
                    <option value="">Istanbul</option>
                    <option value="">Jakarta</option>
                  </select>
                </div>
                {/* tầng */}
                <div class="mb-3 mx-3">
                  <label for="searchTang" class="form-label">
                    Tìm theo tầng <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    class="form-select  "
                    name="searchTang"
                    id="searchTang"
                  >
                    <option value="-1">Tất cả</option>
                    <option value="">New Delhi</option>
                    <option value="">Istanbul</option>
                    <option value="">Jakarta</option>
                  </select>
                </div>
                {/* phòng */}
                <div class="mb-3 mx-3">
                  <label for="searchPhongMay" class="form-label">
                    Tìm theo phòng máy{" "}
                    <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    class="form-select  "
                    name="searchPhongMay"
                    id="searchPhongMay"
                  >
                    <option value="-1">Tất cả</option>
                    <option value="">New Delhi</option>
                    <option value="">Istanbul</option>
                    <option value="">Jakarta</option>
                  </select>
                </div>

                {/* trang thai */}
                <div class="mb-3 mx-3">
                  <label for="searchTrangThai" class="form-label">
                    Tìm theo trạng thái{" "}
                    <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    class="form-select  "
                    name="searchTrangThai"
                    id="searchTrangThai"
                  >
                    <option value="-1">Tất cả</option>
                    <option value="">New Delhi</option>
                    <option value="">Istanbul</option>
                    <option value="">Jakarta</option>
                  </select>
                </div>

                {/*  */}
              </div>
            </div>
            <div className="modal-footer">{/* footer */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
