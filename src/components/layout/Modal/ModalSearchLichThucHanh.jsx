import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetValueSearchAction,
  setValueSelDateFromCaTHAction,
  setValueSelDateToCaTHAction,
  setValueSelGiaoVienCaTHAction,
  setValueSelPhongMayCaTHAction,
  setvalueSelBuoiTHCaTHAction,
} from "../../../redux/reducers/lichThucHanhReducer";
import { getAllGiaoVienApi } from "../../../redux/reducers/giaoVienReducer";
import { getAllPhongMayApi } from "../../../redux/reducers/phongMayReducer";

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
  let { valueDateFrom, valueDateTo, valueSelGiaoVien, valueSelPhongMay } =
    useSelector((state) => state.lichThucHanhReducer);
  let { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  //
  useEffect(() => {
    if (arrGiaoVien.length === 0) {
      dispatch(getAllGiaoVienApi);
    }
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
  }, []);

  // handle
  //
  const handleChangeSelPhongMay = (e) => {
    dispatch(setValueSelPhongMayCaTHAction(e.target.value));
  };
  //
  const handleChangeSelBuoiTH = (e) => {
    dispatch(setvalueSelBuoiTHCaTHAction(e.target.value));
  };
  //
  const handleChangeSelGiaoVien = (e) => {
    dispatch(setValueSelGiaoVienCaTHAction(e.target.value));
  };
  //
  const handleChangeValDateTo = (e) => {
    dispatch(setValueSelDateToCaTHAction(e.target.value));
  };
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
                {/* Date */}
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
                  <select
                    onChange={handleChangeSelBuoiTH}
                    className="form-select  ms-2"
                  >
                    <option value={-1}>Tất cả</option>
                    <option value="sáng">Sáng</option>
                    <option value="chiều">Chiều</option>
                    <option value="tối">Tối</option>
                  </select>
                </div>

                {/* Buổi Giáo viên */}
                <div className="col-9 pt-3">
                  <strong>Giáo viên: </strong>
                  <select
                    onChange={handleChangeSelGiaoVien}
                    className="form-select  ms-2"
                  >
                    <option
                      selected={valueSelGiaoVien == -1 ? 1 : 0}
                      value={-1}
                    >
                      Tất cả
                    </option>
                    {arrGiaoVien.map((item, index) => {
                      return (
                        <option
                          selected={valueSelGiaoVien == item.maGiaoVien ? 1 : 0}
                          key={index}
                          value={item.maGiaoVien}
                        >
                          {item.maGiaoVien} - {item.hoTen}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Buổi phòng máy */}
                <div className="col-6 pt-3">
                  <strong>Phòng máy: </strong>
                  <select
                    onChange={handleChangeSelPhongMay}
                    className="form-select  ms-2"
                  >
                    <option
                      selected={valueSelPhongMay == -1 ? 1 : 0}
                      value={-1}
                    >
                      Tất cả
                    </option>
                    {arrPhongMay.map((item, index) => {
                      return (
                        <option
                          selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                          key={index}
                          value={item.maPhong}
                        >
                          {item.tenPhong} - {item.tang.tenTang} -
                          {item.tang.toaNha.tenToaNha}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/*  */}
              </div>
            </div>
            <div className="modal-footer">
              {/* footer */}
              <button
                type="button"
                onClick={() => {
                  dispatch(resetValueSearchAction());
                }}
                className="btn btn-primary"
              >
                Khôi phục
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
