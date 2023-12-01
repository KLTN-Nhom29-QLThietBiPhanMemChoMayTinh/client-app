import React, { useEffect, useState } from "react";
import ComponentThongKe from "../../components/layout/ThongKe/ComponentThongKe";
import ThongKeToaNha from "../../components/layout/ThongKe/ThongkeToaNha/ThongKeToaNha";
import ThongKeTang from "../../components/layout/ThongKe/ThongKeTang/ThongKeTang";
import { useDispatch } from "react-redux";
import { set_tk_TheoToaNha_arr_Api } from "../../redux/reducers/ThongKe/thongkeToaNhaReducer ";
import ComponentSortTang from "../../components/layout/ThongKe/ThongKeTang/Component/ComponentSortTang";
import ComponentGraphTang from "../../components/layout/ThongKe/ThongKeTang/Component/ComponentGraphTang";
import ComponentTableTang from "../../components/layout/ThongKe/ThongKeTang/Component/ComponentTableTang";
import HOOK_ThongKe from "../../components/layout/ThongKe/HOOK_ThongKe";
import { set_tk_TheoTang_arr_Api } from "../../redux/reducers/ThongKe/thongkeTangReducer";
import ComponentSortPhong from "../../components/layout/ThongKe/ThongKePhongMay/ComponentSortPhong";
import ComponentGraphPhong from "../../components/layout/ThongKe/ThongKePhongMay/ComponentGraphPhong";
import ComponentTablePhong from "../../components/layout/ThongKe/ThongKePhongMay/ComponentTablePhong";
import { getData_TkPhong_Api } from "../../redux/reducers/ThongKe/thongkePhongReducer";
import ComponentSortMayTinh from "../../components/layout/ThongKe/ThongKeMayTinh/ComponentSortMayTinh";
import ComponentGraphMayTinh from "../../components/layout/ThongKe/ThongKeMayTinh/ComponentGraphMayTinh";
import ComponentTableMayTinh from "../../components/layout/ThongKe/ThongKeMayTinh/ComponentTableMayTinh";

export default function PageThongKe() {
  //
  const dispatch = useDispatch();
  //
  let [valBtnTK, setValBtnTK] = useState("tk_mayTinh");

  useEffect(() => {
    dispatch(getData_TkPhong_Api);
  }, []);

  // handle
  const handleClickBtnThongke = (e) => {
    let { id } = e.target;

    switch (id) {
      case "tk_toaNha":
        dispatch(set_tk_TheoToaNha_arr_Api);
        break;

      case "tk_tang":
        dispatch(set_tk_TheoTang_arr_Api);
        break;
      case "tk_phong":
        break;
      case "tk_mayTinh":
        break;
      case "tk_nhanVien":
        break;
      case "tk_giaoVien":
        break;
      case "tk_monHoc":
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

      case "tk_tang": {
        let value = {
          title: "Thống kê theo tầng",
          ComponentSort: ComponentSortTang,
          ComponentGraph: ComponentGraphTang,
          ComponentTable: ComponentTableTang,
        };
        return <HOOK_ThongKe data={value} />;
      }
      case "tk_phong": {
        let value = {
          title: "Thống kê theo phòng máy",
          ComponentSort: ComponentSortPhong,
          ComponentGraph: ComponentGraphPhong,
          ComponentTable: ComponentTablePhong,
        };
        return <HOOK_ThongKe data={value} />;
      }

      case "tk_mayTinh":
        let value = {
          title: "Thống kê theo máy tính",
          ComponentSort: ComponentSortMayTinh,
          ComponentGraph: ComponentGraphMayTinh,
          ComponentTable: ComponentTableMayTinh,
        };
        return <HOOK_ThongKe data={value} />;
      case "tk_nhanVien":
        return <ComponentThongKe />;
      case "tk_giaoVien":
        return <ComponentThongKe />;
      case "tk_monHoc":
        return <ComponentThongKe />;

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
              onClick={handleClickBtnThongke}
              id="tk_tang"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_tang")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê tầng
            </button>
            <button
              onClick={handleClickBtnThongke}
              id="tk_phong"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_phong")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê phòng
            </button>
            <button
              onClick={handleClickBtnThongke}
              id="tk_mayTinh"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_mayTinh")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê máy tính
            </button>
            <button
              onClick={handleClickBtnThongke}
              id="tk_nhanVien"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_nhanVien")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê nhân viên
            </button>
            <button
              onClick={handleClickBtnThongke}
              id="tk_giaoVien"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_giaoVien")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
              Thống kê giáo viên
            </button>
            <button
              onClick={handleClickBtnThongke}
              id="tk_monHoc"
              type="button"
              className={`btn ${
                valBtnTK.includes("tk_monHoc")
                  ? " btn-primary"
                  : "btn-outline-primary"
              } mt-2`}
            >
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
