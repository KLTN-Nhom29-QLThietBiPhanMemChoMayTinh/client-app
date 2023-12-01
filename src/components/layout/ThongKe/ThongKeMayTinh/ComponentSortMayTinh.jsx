import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi } from "../../../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../../../redux/reducers/tangReducer";
import { getAllPhongMayApi } from "../../../../redux/reducers/phongMayReducer";
import {
  set_tk_valueSearch_MT_Action,
  set_tk_valueSelectPhongMay_MT_Action,
  set_tk_valueSelectTang_MT_Action,
  set_tk_valueSelectToaNha_MT_Action,
} from "../../../../redux/reducers/ThongKe/thongkeMayTinhReducer";

export default function ComponentSortMayTinh() {
  //
  const dispatch = useDispatch();
  //
  let { valueSearch, valueSelectToaNha, valueSelectTang, valueSelectPhongMay } =
    useSelector((state) => state.thongkeMayTinhReducer);
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
  //
  // handle
  //
  const handleChangeSelectPhongMay = (e) => {
    dispatch(set_tk_valueSelectPhongMay_MT_Action(e.target.value));
  };
  //
  const handleChangeSelectTang = (e) => {
    dispatch(set_tk_valueSelectTang_MT_Action(e.target.value));
  };
  //
  const handleChangeSelectToaNha = (e) => {
    dispatch(set_tk_valueSelectToaNha_MT_Action(e.target.value));
  };
  //
  const handleValueSearch = (e) => {
    dispatch(set_tk_valueSearch_MT_Action(e.target.value));
  };
  //

  // render
  //
  const renderSelectPhongMay = () => {
    if (valueSelectToaNha == -1) {
      if (valueSelectTang == -1) {
        // select tang khong co gia tri
        // toa nha khong co giatri
        return arrPhongMay.map((item, index) => {
          return (
            <option
              key={index}
              selected={valueSelectPhongMay == item.maPhong ? 1 : 0}
              value={item.maPhong}
            >
              {item.tenPhong} - {item.tang.tenTang} -{" "}
              {item.tang.toaNha.tenToaNha}
            </option>
          );
        });
      } else {
        // select tang co gia tri
        // toa nha khong co giatri
        return arrPhongMay.map((item, index) => {
          if (item.tang.maTang == valueSelectTang) {
            return (
              <option
                key={index}
                selected={valueSelectPhongMay == item.maPhong ? 1 : 0}
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
      if (valueSelectTang == -1) {
        // select tang khong co gia tri
        // toa nha co giatri
        return arrPhongMay.map((item, index) => {
          if (item.tang.toaNha.maToaNha == valueSelectToaNha) {
            return (
              <option
                key={index}
                selected={valueSelectPhongMay == item.maPhong ? 1 : 0}
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
            item.tang.maTang == valueSelectTang &&
            item.tang.toaNha.maToaNha == valueSelectToaNha
          ) {
            return (
              <option
                key={index}
                selected={valueSelectPhongMay == item.maPhong ? 1 : 0}
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
      if (valueSelectToaNha == -1) {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang} - {item.toaNha.tenToaNha}
          </option>
        );
      } else {
        if (item.toaNha.maToaNha == valueSelectToaNha) {
          if (item.maTang == valueSelectTang) {
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
  const renderSelectToaNha = () => {
    return arrToaNha?.map((item, index) => {
      return (
        <option
          key={index}
          selected={item.maToaNha == valueSelectToaNha ? 1 : 0}
          value={item.maToaNha}
        >
          {item.tenToaNha}
        </option>
      );
    });
  };

  //
  return (
    <>
      <div className="d-flex bd-highlight border rounded">
        {/* left */}
        <div className="p-2 w-100 bd-highlight" style={{ fontSize: "15px" }}>
          <div className="row">
            <div className="col-3">
              <label htmlFor="SelA" className="form-label">
                Tìm theo tòa nhà
              </label>
              <select
                onChange={handleChangeSelectToaNha}
                className="form-select p-1 py-1"
                name="SelA"
                id="SelA"
              >
                <option value={-1}>Tất cả</option>
                {renderSelectToaNha()}
              </select>
            </div>
            <div className="col-3">
              <label htmlFor="SelA" className="form-label">
                Tìm theo tầng
              </label>
              <select
                onChange={handleChangeSelectTang}
                className="form-select p-1 py-1"
                name="SelA"
                id="SelA"
              >
                <option value={-1}>Tất cả</option>
                {renderSelectTang()}
              </select>
            </div>
            {/* phòng */}
            <div className="col-3">
              <label htmlFor="searchPhongMay" className="form-label">
                Tìm theo phòng máy
              </label>
              <select
                className="form-select p-1 "
                name="searchPhongMay"
                id="searchPhongMay"
                onChange={handleChangeSelectPhongMay}
              >
                <option value={-1}>Tất cả</option>
                {renderSelectPhongMay()}
              </select>
            </div>
            <div className="col-3">
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
