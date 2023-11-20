import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi } from "../../../../redux/reducers/toaNhaReducer";
import { setvalueSelTang_MayTinhAction, setvalueSelToaNha_MayTinhAction } from "../../../../redux/reducers/mayTinhReducer";
import { getAllTangApi } from "../../../../redux/reducers/tangReducer";

export default function ModalSearchMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { valueSelToaNha, valueSelTang, valueSelPhongMay, valueSelTrangThai } =
    useSelector((state) => state.mayTinhReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  //
  useEffect(() => {
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
  }, []);

  //handle
  const handleChangeSelectTang = (e) => {
    dispatch(setvalueSelTang_MayTinhAction(e.target.value))
  }
  //
  const handleChangeSelectToaNha = (e) => {
    dispatch(setvalueSelToaNha_MayTinhAction(e.target.value));
  };

  // render
  const renderSelectTang = () => {
    return arrTang?.map((item, index) => {
      if (valueSelToaNha == -1) {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang} - {item.toaNha.tenToaNha}
          </option>
        );
      } else {
        if (item.toaNha.maToaNha == valueSelToaNha) {
          if (item.maTang == valueSelTang) {
            return (
              <option key={index} selected value={item.maTang}>
                {item.tenTang}
              </option>
            );
          }
          return (
            <option key={index} value={item.maTang}>
              {item.tenTang}
            </option>
          );
        } else return <></>;
      }
    });
  };
  //
  const renderSelctToaNha = () => {
    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == valueSelToaNha) {
        return (
          <option key={index} selected value={item.maToaNha}>
            {item.tenToaNha}
          </option>
        );
      }
      return (
        <option key={index} value={item.maToaNha}>
          {item.tenToaNha}
        </option>
      );
    });
  };

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
              <div classname="container-fluid px-2">
                {/* tòa nhà */}
                <div className="mb-3 mx-3">
                  <label htmlFor="searchToaNha" className="form-label">
                    Tìm theo tòa nhà<span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    className="form-select  "
                    name="searchToaNha"
                    id="searchToaNha"
                    onChange={handleChangeSelectToaNha}
                  >
                    <option value={-1}>Tất cả</option>
                    {renderSelctToaNha()}
                  </select>
                </div>
                {/* tầng */}
                <div className="mb-3 mx-3">
                  <label htmlFor="searchTang" className="form-label">
                    Tìm theo tầng<span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    className="form-select  "
                    name="searchTang"
                    id="searchTang"
                    onChange={handleChangeSelectTang}
                  >
                    <option value={-1}>Tất cả</option>
                    {renderSelectTang()}
                  </select>
                </div>
                {/* phòng */}
                <div className="mb-3 mx-3">
                  <label htmlFor="searchPhongMay" className="form-label">
                    Tìm theo phòng máy
                    <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    className="form-select  "
                    name="searchPhongMay"
                    id="searchPhongMay"
                  >
                    <option value={-1}>Tất cả</option>
                    <option value>New Delhi</option>
                    <option value>Istanbul</option>
                    <option value>Jakarta</option>
                  </select>
                </div>
                {/* trang thai */}
                <div className="mb-3 mx-3">
                  <label htmlFor="searchTrangThai" className="form-label">
                    Tìm theo trạng thái
                    <span className="text-danger mx-2">*</span>
                  </label>
                  <select
                    className="form-select  "
                    name="searchTrangThai"
                    id="searchTrangThai"
                  >
                    <option value={-1}>Tất cả</option>
                    <option value>New Delhi</option>
                    <option value>Istanbul</option>
                    <option value>Jakarta</option>
                  </select>
                </div>
                {/* */}
              </div>
            </div>
            <div className="modal-footer">{/* footer */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
