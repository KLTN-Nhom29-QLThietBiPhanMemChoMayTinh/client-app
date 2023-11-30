import React, { useEffect } from "react";
import { getAllToaNhaApi } from "../../../../redux/reducers/toaNhaReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllTangApi } from "../../../../redux/reducers/tangReducer";
import { set_tk_valueSelectTang_Action, set_tk_valueSelectToaNha_Action } from "../../../../redux/reducers/ThongKe/thongkePhongReducer";

export default function ComponentSortPhong() {
  //
  const dispatch = useDispatch();
  //
  let { valueSelectToaNha, valueSelectTang } = useSelector(
    (state) => state.thongkePhongReducer
  );
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
  // handle 
  //
  const handleChangeSelectTang = (e) =>{
    dispatch(set_tk_valueSelectTang_Action(e.target.value));
  }
  //
  const handleChangeSelectToaNha = (e) =>{
    dispatch(set_tk_valueSelectToaNha_Action(e.target.value));
  }
  // render
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
