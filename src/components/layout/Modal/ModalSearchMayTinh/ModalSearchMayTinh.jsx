import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi } from "../../../../redux/reducers/toaNhaReducer";
import {
  setvalueSelPhongMay_MayTinhAction,
  setvalueSelTang_MayTinhAction,
  setvalueSelToaNha_MayTinhAction,
  setvalueSelTrangThai_MayTinhAction,
} from "../../../../redux/reducers/mayTinhReducer";
import { getAllTangApi } from "../../../../redux/reducers/tangReducer";
import { getAllPhongMayApi } from "../../../../redux/reducers/phongMayReducer";

export default function ModalSearchMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { valueSelToaNha, valueSelTang, valueSelPhongMay, valueSelTrangThai } =
    useSelector((state) => state.mayTinhReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  //
  useEffect(() => {
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
  }, []);

  //handle
  const handleChangeSelectTrangThai = (e) => {
    dispatch(setvalueSelTrangThai_MayTinhAction(e.target.value));
  };
  //
  const handleChangeSelectPhongMay = (e) => {
    dispatch(setvalueSelPhongMay_MayTinhAction(e.target.value));
  };
  //
  const handleChangeSelectTang = (e) => {
    dispatch(setvalueSelTang_MayTinhAction(e.target.value));
  };
  //
  const handleChangeSelectToaNha = (e) => {
    dispatch(setvalueSelToaNha_MayTinhAction(e.target.value));
  };

  // render
  const renderSelectPhongMay = () => {
    if (valueSelToaNha == -1) {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha khong co giatri
        return arrPhongMay.map((item, index) => {
          return (
            <option key={index} selected={valueSelPhongMay == item.maPhong ? 1 : 0} value={item.maPhong}>
              {item.tenPhong} - {item.tang.tenTang} -
              {item.tang.toaNha.tenToaNha}
            </option>
          );
        });
      } else {
        // select tang co gia tri
        // toa nha khong co giatri
        return arrPhongMay.map((item, index) => {
          if (item.tang.maTang == valueSelTang) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.toaNha.tenToaNha}
              </option>
            );
          }
          return <></>;
        });
      }
    } else {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha co giatri
        return arrPhongMay.map((item, index) => {
          if (item.tang.toaNha.maToaNha == valueSelToaNha) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.tenTang}
              </option>
            );
          }
          return <></>;
        });
      } else {
        // select tang co gia tri
        // toa nha co giatri
        return arrPhongMay.map((item, index) => {
          if (
            item.tang.maTang == valueSelTang &&
            item.tang.toaNha.maToaNha == valueSelToaNha
          ) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong}
              </option>
            );
          }
          return <></>;
        });
      }
    }

  };
  //
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
              <div className="container-fluid px-2">
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
                    onChange={handleChangeSelectPhongMay}
                  >
                    <option value={-1}>Tất cả</option>
                    {renderSelectPhongMay()}
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
                    onChange={handleChangeSelectTrangThai}
                  >
                    <option
                      selected={valueSelTrangThai
                        .toLowerCase()
                        .includes("-1".toLowerCase())}
                      value={-1}
                    >
                      Tất cả
                    </option>
                    <option
                      selected={valueSelTrangThai
                        .toLowerCase()
                        .includes("Đang hoạt động".toLowerCase())}
                      value="Đang hoạt động"
                    >
                      Đang hoạt động
                    </option>
                    <option
                      selected={valueSelTrangThai
                        .toLowerCase()
                        .includes("Đã hỏng".toLowerCase())}
                      value="Đã hỏng"
                    >
                      Đã hỏng
                    </option>
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
