import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNhanVienApi } from "../../../redux/reducers/nhanVienReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";
import {
  getAllTangByToaNhaApi,
  getAllTangChuaCoLichTrucApi,
  insertLichTrucApi,
  updateLichTrucApi,
} from "../../../redux/reducers/lichTrucReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getAllToaNhaApi } from "../../../redux/reducers/toaNhaReducer";
import { formatDate_MM_YYYY } from "../../../util/formatString";

let day_now = new Date();
let strDate = `${day_now.getFullYear()}-${day_now.getMonth() + 1}-01`;
let strThang = "";

if (day_now.getMonth() < 9) {
  strThang = `0${day_now.getMonth() + 1}`;
} else {
  strThang = day_now.getMonth() + 1;
}

let strDate2 = `tháng ${strThang} - ${day_now.getFullYear()}`;

let objData_old = {};

export default function FormUpdateLichTruc() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();

  const { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  //arrTangByLichTruc : dsTang chưa có lich truc
  const { arrTang } = useSelector((state) => state.tangReducer);
  const { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  //
  const { arrLichTruc } = useSelector((state) => state.lichTrucReducer);

  const [lichTruc, setLichTruc] = useState({});

  const [errLTruc, setErrLTruc] = useState({
    nhanVien: "",
    toaNha: "",
    tang: "",
  });

  useEffect(() => {
    if (arrLichTruc.length === 0) {
      navigate("/phan-cong/lich-truc");
    } else {
      objData_old = arrLichTruc.find((item) => item.maLich == params.id);

      //
      let {
        maLich,
        ngayTruc,
        thoiGianBatDau,
        thoiGianKetThuc,
        nhanVien,
        tang,
      } = objData_old;

      setLichTruc({
        ngayTruc,
        thoiGianBatDau,
        thoiGianKetThuc,
        valueSelNhanVien: nhanVien.maNV,
        valueSelTang: tang.maTang,
        valueSelToaNha: tang.toaNha.maToaNha,
      });
    }
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
  }, []);

  //
  const checkData = () => {
    let { valueSelNhanVien, valueSelTang } = lichTruc;

    if (valueSelNhanVien == -1) {
      setErrLTruc({ ...errLTruc, nhanVien: "Hãy chọn nhân viên!" });
      return false;
    }
    if (valueSelTang == -1) {
      setErrLTruc({ ...errLTruc, tang: "Hãy chọn tầng!" });
      return false;
    }
    setErrLTruc({ ...errLTruc, nhanVien: "", tang: "" });
    return true;
  };
  // handle
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkData()) {
      let {
        ngayTruc,
        thoiGianBatDau,
        thoiGianKetThuc,
        valueSelNhanVien,
        valueSelTang,
        valueSelToaNha,
      } = lichTruc;

      let tang = arrTang.find((item) => item.maTang == valueSelTang);
      let nhanVien = arrNhanVien.find((item) =>
        item.maNV.includes(valueSelNhanVien)
      );

      let objLichTruc = {
        maLich: objData_old.maLich,
        ngayTruc: new Date(ngayTruc),
        thoiGianBatDau,
        thoiGianKetThuc,
        nhanVien,
        tang,
      };
      
      alert('update lỗi api do date của ngayTruc')
      // dispatch(updateLichTrucApi(objLichTruc));
    }
  };
  //
  const handleChangeSelectNhanVien = (e) => {
    let value = e.target.value;

    setLichTruc({ ...lichTruc, valueSelNhanVien: value });
  };
  //
  const handleChangeSelectToaNha = (e) => {
    let value = e.target.value; //id = idToaNha

    let objTang = arrTang.find((item) => {
      return item.toaNha.maToaNha == value;
    });
    if (objTang == null) {
      setLichTruc({
        ...lichTruc,
        valueSelToaNha: value,
        valueSelTang: -1,
      });
      setErrLTruc({ ...errLTruc, tang: "", toaNha: "Hãy chọn tòa nhà khác!" });
      return;
    }

    setLichTruc({
      ...lichTruc,
      valueSelToaNha: value,
      valueSelTang: objTang.maTang,
    });

    if (value == -1) {
      setErrLTruc({ ...errLTruc, tang: "Hãy chọn một tầng!" });
    } else {
      setErrLTruc({ ...errLTruc, tang: "", toaNha: "" });
    }
  };
  //
  const handleChangeSelectTang = (e) => {
    let value = e.target.value; //id = idTang
    //
    setLichTruc({
      ...lichTruc,
      valueSelTang: value,
    });
    //
    if (value == -1) {
      setErrLTruc({ ...errLTruc, tang: "Hãy chọn tầng!" });
    } else {
      setErrLTruc({ ...errLTruc, tang: "" });
    }
  };
  //
  const handleChangeSelectCaTruc = (e) => {
    const val = e.target.value;
    if (val == 1) {
      setLichTruc({ ...lichTruc, thoiGianBatDau: 6, thoiGianKetThuc: 14 });
    } else {
      setLichTruc({ ...lichTruc, thoiGianBatDau: 14, thoiGianKetThuc: 22 });
    }
  };

  // render
  //
  const renderSelectToaNha = () => {
    return arrToaNha?.map((item, index) => {
      return (
        <option
          key={index}
          selected={item.maToaNha == lichTruc.valueSelToaNha ? 1 : 0}
          value={item.maToaNha}
        >
          {item.tenToaNha}
        </option>
      );
    });
  };
  //
  const renderSelectTang = () => {
    return arrTang?.map((item, index) => {
      if (item.toaNha.maToaNha == lichTruc.valueSelToaNha) {
        if (item.maTang == lichTruc.valueSelTang) {
          return (
            <option
              key={index}
              selected={item.maTang == lichTruc.valueSelTang ? 1 : 0}
              value={item.maTang}
            >
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
    });
  };
  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Phân công lịch trực", link: "../phan-cong/lich-truc" },
  ];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        <div className="d-flex flex-column justify-content-between h-100">
          <div className="">
            {/*  */}
            <NavTab
              itemLink={{
                arrLinkNavTab,
                chucNang: "Chỉnh sửa",
              }}
            />
            {/* Form */}
            <div className=" bg-white rounded p-4">
              <form onSubmit={handleSubmit} action="/quan-ly/khu-vuc">
                <div className="row">
                  <div className="col-md-6">
                    {/* select nv  */}
                    <div className="mb-3 px-3">
                      <label for="selectNameNV" className="form-label">
                        Chọn nhân viên
                        <small
                          id="errNameNV"
                          className="form-text text-danger mx-1"
                        >
                          *{errLTruc.nhanVien}
                        </small>
                      </label>
                      <div className="col-10">
                        <select
                          className="form-select "
                          name="selectNameNV"
                          id="selectNameNV"
                          aria-describedby="errNameNV"
                          onChange={handleChangeSelectNhanVien}
                        >
                          {arrNhanVien.map((item, index) => {
                            return (
                              <option
                                key={index}
                                selected={
                                  lichTruc.valueSelNhanVien == item.maNV ? 1 : 0
                                }
                                value={item.maNV}
                              >
                                {item.maNV} - {item.tenNV}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    {/*  */}
                    <div className="mb-3 px-3">
                      <label for="selectCaTruc" className="form-label">
                        Chọn ca chực
                        <small
                          id="errCaTruc"
                          className="form-text text-danger mx-1"
                        >
                          *
                        </small>
                      </label>
                      <div className="col-10">
                        <select
                          className="form-select "
                          name="selectCaTruc"
                          id="selectCaTruc"
                          aria-describedby="errCaTruc"
                          onChange={handleChangeSelectCaTruc}
                        >
                          <option value={1}>6h-14h</option>
                          <option value={2}>14h-22h</option>
                        </select>
                      </div>
                    </div>
                    {/*  */}
                    <div className="mb-3 px-3">
                      <label htmlFor="id1" className="form-label">
                        Thời gian trực
                        <small
                          id="helpId1"
                          className="form-text text-danger mx-1"
                        >
                          *
                        </small>
                      </label>
                      <div className="col-10">
                        <input
                          type="text"
                          className="form-control"
                          name="id1"
                          id="id1"
                          value={formatDate_MM_YYYY(lichTruc.ngayTruc)}
                          disabled
                          aria-describedby="helpId1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* select Toa Nha  */}
                    <div className="mb-3  px-3">
                      <label for="selectToaNha" className="form-label">
                        Chọn tòa nhà
                        <small
                          id="errToaNha"
                          className="form-text text-danger mx-1"
                        >
                          *{errLTruc.toaNha}
                        </small>
                      </label>
                      <div className="col-10">
                        <select
                          className="form-select "
                          name="selectToaNha"
                          id="selectToaNha"
                          aria-describedby="errToaNha"
                          onChange={handleChangeSelectToaNha}
                        >
                          {renderSelectToaNha()}
                        </select>
                      </div>
                    </div>

                    {/* select tang  */}
                    <div className="mb-3  px-3">
                      <label for="selectTang" className="form-label">
                        Chọn tầng
                        <small
                          id="errTang"
                          className="form-text text-danger mx-1"
                        >
                          *{errLTruc.tang}
                        </small>
                      </label>

                      <div className="col-10">
                        <select
                          className="form-select "
                          name="selectTang"
                          id="selectTang"
                          aria-describedby="errTang"
                          onChange={handleChangeSelectTang}
                        >
                          {renderSelectTang()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success">
                    Chỉnh sửa
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setLichTruc({
                        tgian: strDate,
                        thoiGianBatDau: 6,
                        thoiGianKetThuc: 14,
                        soNgayNghi: 0,
                        nhanVien: {},
                        tang: {},
                      });
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
                  </button>
                </div>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
