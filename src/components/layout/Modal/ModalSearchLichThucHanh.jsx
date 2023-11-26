import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValueSelDateFromCaTHAction, setValueSelDateToCaTHAction } from "../../../redux/reducers/lichThucHanhReducer";

let date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;

//
export default function ModalSearchLichThucHanh() {
  // d
  const dispatch = useDispatch();

  //
  let { valueDateFrom, valueDateTo } = useSelector(
    (state) => state.lichThucHanhReducer
  );

  // handle
  //
  const handleChangeValDateTo = (e) => {
    dispatch(setValueSelDateToCaTHAction(e.target.value))
  }
  //
  const handleChangeValDateFrom = (e) => {
    dispatch(setValueSelDateFromCaTHAction(e.target.value));
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdSearchLichTH"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="modalTitleId">
                Tìm kiếm lịch thực hành
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
                {/* body */}

                <div className="pt-2">
                  <strong>Thời gian thực hành: </strong> <br />
                  <p>
                    Từ:
                    <input
                      type="date"
                      className="col-4 mx-2 rounded border border-1 p-1"
                      id="valDateFrom"
                      value={valueDateFrom}
                      onChange={handleChangeValDateFrom}
                    />{" "}
                    Đến:
                    <input
                      type="date"
                      className="col-4 mx-2 rounded border border-1 p-1"
                      id="valDateTo"
                      min={valueDateFrom}
                      value={valueDateTo}
                      disabled={valueDateFrom.length > 0 ? 0 : 1}
                      onChange={handleChangeValDateTo}
                    />
                  </p>
                </div>

                {/* Buổi thực hành */}
                <div className="col-6">
                  <strong>Buổi thực hành: </strong>
                  <select class="form-select  ms-2">
                    <option value={-1}>Tất cả</option>
                    <option value="sáng">Sáng</option>
                    <option value="chiều">Chiều</option>
                    <option value="tối">Tối</option>
                  </select>
                </div>

                {/* Buổi Giáo viên */}
                <div className="col-6 pt-3">
                  <strong>Giáo viên: </strong>
                  <select class="form-select  ms-2">
                    <option value={-1}>Tất cả</option>
                    <option value="sáng">Sáng</option>
                    <option value="chiều">Chiều</option>
                    <option value="tối">Tối</option>
                  </select>
                </div>

                {/* Buổi phòng máy */}
                <div className="col-6 pt-3">
                  <strong>Phòng máy: </strong>
                  <select class="form-select  ms-2">
                    <option value={-1}>Tất cả</option>
                    <option value="sáng">Sáng</option>
                    <option value="chiều">Chiều</option>
                    <option value="tối">Tối</option>
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
