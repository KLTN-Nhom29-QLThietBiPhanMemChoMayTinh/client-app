import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_tk_valueSearch_NV_Action, set_tk_valueSelCaTruc_NV_Action, set_tk_valueSelTgianTruc_NV_Action } from "../../../../redux/reducers/ThongKe/thongkeNhanVienReducer";

export default function ComponentSortNhanVien() {
  //
  const dispatch = useDispatch();
  //
  const { valueSelTgianTruc, valueSearch, valueSelCaTruc, arr_tk_TgianTruc } =
    useSelector((state) => state.thongkeNhanVienReducer);

  // handle
  //
  const handleChangeSelectTgianTruc = (e) => {
    dispatch(set_tk_valueSelTgianTruc_NV_Action(e.target.value))
  }
  //
  const handleChangeSelectCaTruc = (e) => {
    dispatch(set_tk_valueSelCaTruc_NV_Action(e.target.value))
  }
  //
  const handleValueSearch = (e) => {
    dispatch(set_tk_valueSearch_NV_Action(e.target.value))
  }
  //
  //
  return (
    <>
      <div className="d-flex bd-highlight border rounded">
        {/* left */}
        <div className="p-2 w-100 bd-highlight" style={{ fontSize: "15px" }}>
          <div className="row">
            {/* Tgian Truc */}
            <div className="col-md-3">
              <label htmlFor="SelA" className="form-label">
                Tìm theo thời gian trực
              </label>
              <select
                onChange={handleChangeSelectTgianTruc}
                className="form-select p-1 py-1"
                name="SelA"
                id="SelA"
              >
                <option
                  selected={valueSelTgianTruc.includes("-1") ? 1 : 0}
                  value={"-1"}
                >
                  Tất cả
                </option>
                {arr_tk_TgianTruc?.map((item, index) => {
                  return (
                    <option
                      key={index}
                      selected={valueSelTgianTruc.includes(item) ? 1 : 0}
                      value={item}
                    >
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* Ca Truc */}
            <div className="col-md-3">
              <label htmlFor="SelB" className="form-label">
                Tìm theo ca trực
              </label>
              <select
                onChange={handleChangeSelectCaTruc}
                className="form-select p-1 py-1"
                name="SelB"
                id="SelB"
              >
                <option selected={valueSelCaTruc == -1 ? 1 : 0} value={-1}>
                  Tất cả
                </option>
                <option selected={valueSelCaTruc == 1 ? 1 : 0} value={1}>
                  6h-14h
                </option>
                <option selected={valueSelCaTruc == 2 ? 1 : 0} value={2}>
                  14h-22h
                </option>
              </select>
            </div>
            {/* Name */}
            <div className="col-md-3">
              <div>
                <label htmlFor="txtSearch" className="form-label">
                  Tìm theo tên
                </label>
                <input
                  type="text"
                  className="form-control p-1"
                  name="txtSearch"
                  id="txtSearch"
                  value={valueSearch}
                  onChange={handleValueSearch}
                  aria-describedby="helpId"
                  placeholder="tìm kiếm ..."
                />
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="p-2 flex-shrink-1 bd-highlight ">
          <button
            type="button"
            onClick={() => {
              alert("Đang cập nhật! Vui lòng quay lại sau.");
            }}
            className="btn btn-primary "
          >
            Xuất file
          </button>
        </div>
      </div>
    </>
  );
}
