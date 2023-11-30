import React, { useEffect, useState } from "react";
import ComponentThongKe from "../../components/layout/ThongKe/ComponentThongKe";
import ThongKeToaNha from "../../components/layout/ThongKe/ThongkeToaNha/ThongKeToaNha";
import ThongKeTang from "../../components/layout/ThongKe/ThongKeTang/ThongKeTang";
import { useDispatch } from "react-redux";
import { set_tk_TheoToaNha_arr_Api } from "../../redux/reducers/ThongKe/thongkeToaNhaReducer ";

export default function PageThongKe() {
  //
  const dispatch = useDispatch();
  //
  let [valBtnTK, setValBtnTK] = useState("tk_toaNha");

  useEffect(() => {
    dispatch(set_tk_TheoToaNha_arr_Api);
  }, []);

  // handle
  const handleClickBtnThongke = (e) => {
    let { id } = e.target;
    console.log(
      "🚀 ~ file: PageThongKe.jsx:12 ~ handleClickBtnThongke ~ id:",
      id
    );

    switch (id) {
      case "tk_toaNha":
        dispatch(set_tk_TheoToaNha_arr_Api);
        break;

      case "tk_tang":
        break;

      default:
        break;
    }

    setValBtnTK(id);
  };
  // render
  const renderDataThongKe = () => {
    switch (valBtnTK) {
      case "tk_toaNha":
        return <ThongKeToaNha />;

      case "tk_tang":
        return <ThongKeTang />;

      default:
        return <ThongKeToaNha />;
    }
  };

  //
  return (
    <div className="w-100" style={{ margin: "0px", padding: "0px" }}>
      <div
        className="row bg-white rounded "
        style={{ minHeight: "100vh", margin: "0px", padding: "0px" }}
      >
        {/* btn Thong ke */}
        <div className="col-3  " style={{ maxHeight: "100vh" }}>
          <div className="p-3 d-flex flex-column">
            <button
              onClick={handleClickBtnThongke}
              id="tk_toaNha"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_toaNha")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê tòa nhà
            </button>
            <button
              type="button"
              id="tk_tang"
              onClick={handleClickBtnThongke}
              className={`btn ${
                valBtnTK.includes("tk_tang")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê tầng
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Thống kê phòng
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Thống kê máy tính
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Thống kê nhân viên
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Thống kê giáo viên
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Thống kê môn học
            </button>
          </div>
        </div>

        {/* Thong tin */}
        <div className="col-9  border-start">{renderDataThongKe()}</div>
      </div>
    </div>
  );
}
