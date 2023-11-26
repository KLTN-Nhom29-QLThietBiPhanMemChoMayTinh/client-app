import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNhanVienApi } from "../../../redux/reducers/nhanVienReducer";
import {
  getAllTangApi,
} from "../../../redux/reducers/tangReducer";
import {
  getAllLichTruc,
  getAllTangByToaNhaApi,
  getAllTangChuaCoLichTrucApi,
  insertLichTrucApi,
} from "../../../redux/reducers/lichTrucReducer";

let day_now = new Date();
let strDate = `${day_now.getFullYear()}-${day_now.getMonth() + 1}-01`;
let strThang = "";

if (day_now.getMonth() < 9) {
  strThang = `0${day_now.getMonth() + 1}`;
} else {
  strThang = day_now.getMonth() + 1;
}

let strDate2 = `tháng ${strThang} - ${day_now.getFullYear()}`;

export default function FormAddLichTruc() {
  const dispatch = useDispatch();

  const { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  //arrTangByLichTruc : dsTang chưa có lich truc
  const { arrTang } = useSelector((state) => state.tangReducer);
  //
  const { arrLichTruc, arrTangChuaCoLichTruc, arrToaNhaByChuaCoLichTruc } = useSelector(
    (state) => state.lichTrucReducer
  );

  const [lichTruc, setLichTruc] = useState({});
  const [errLTruc, setErrLTruc] = useState({
    nhanVien: "",
    toaNha: "",
    tang: "",
  });

  useEffect(() => {
    if(arrLichTruc.length === 0) {
      dispatch(getAllLichTruc)
    }
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
    dispatch(getAllTangChuaCoLichTrucApi);

    setLichTruc({
      ngayTruc: strDate,
      thoiGianBatDau: 6,
      thoiGianKetThuc: 14,
      // soNgayNghi: 0,
      nhanVien: {},
      valueSelTang: -1,
      valueSelToaNha: -1,
    });
  }, []);

  //
  const checkData = () => {
    let { nhanVien, valueSelTang } = lichTruc;

    if (Object.keys(nhanVien).length === 0) {
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
        nhanVien,
        valueSelTang,
        valueSelToaNha,
      } = lichTruc;

      let tang = arrTang.find(
        (item) => item.maTang == valueSelTang
      );

      let objLichTruc = {
        ngayTruc: new Date(ngayTruc),
        thoiGianBatDau,
        thoiGianKetThuc,
        nhanVien,
        tang,
      };

      dispatch(insertLichTrucApi(objLichTruc));
    }
  };
  //
  const handleChangeSelectNhanVien = (e) => {
    let idNhanVien = e.target.value;
    if (idNhanVien == -1) {
      setLichTruc({ ...lichTruc, nhanVien: {} });
      setErrLTruc({ ...errLTruc, nhanVien: "Hãy chọn nhân viên!" });
    } else {
      let nv = arrNhanVien.find((item) => item.maNV === idNhanVien);
      setLichTruc({ ...lichTruc, nhanVien: nv });
      setErrLTruc({ ...errLTruc, nhanVien: "" });
    }
  };
  //
  const handleChangeSelectToaNha = (e) => {
    let value = e.target.value; //id = idToaNha

    let objTang = arrTang.find((item) => {
      return item.toaNha.maToaNha == value;
    });

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
  const renderToaNhaChuaCoLichTrucTrongThang = () => {
    if (lichTruc.valueSelToaNha != -1) {
      return arrToaNhaByChuaCoLichTruc?.map((item, index) => {
        return (
          <option key={index} value={item.maToaNha}>
            {item.tenToaNha}
          </option>
        );
      });
    }
    return (
      <>
        <option selected value={-1}>
          Chọn tòa nhà
        </option>
        {arrToaNhaByChuaCoLichTruc?.map((item, index) => {
          return (
            <option key={index} value={item.maToaNha}>
              {item.tenToaNha}
            </option>
          );
        })}
      </>
    );
  };
  //
  const renderTangChuaCoLichTructrongThang = () => {
    if (lichTruc.valueSelToaNha == -1 && lichTruc.valueSelTang == -1) {
      return (
        <>
          <option selected value={-1}>
            Chọn tầng
          </option>
          {arrTangChuaCoLichTruc?.map((item, index) => {
            return (
              <option key={index} value={item.maTang}>
                {item.tenTang} - {item.toaNha.tenToaNha}
              </option>
            );
          })}
        </>
      );
    }

    return arrTangChuaCoLichTruc?.map((item, index) => {
      if (lichTruc.valueSelToaNha == -1) {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang} - {item.toaNha.tenToaNha}
          </option>
        );
      } else {
        if (item.toaNha.maToaNha == lichTruc.valueSelToaNha) {
          if (item.maTang == lichTruc.valueSelTang) {
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
                chucNang: "Tạo mới",
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
                          <option value={-1}>Chọn nhân viên</option>
                          {arrNhanVien.map((item, index) => {
                            return (
                              <option key={index} value={item.maNV}>
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
                          value={strDate2}
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
                          {renderToaNhaChuaCoLichTrucTrongThang()}
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
                          {renderTangChuaCoLichTructrongThang()}
                        </select>
                      </div>
                      <div classname="form-check  pt-1">
                        <input
                          classname="form-check-input"
                          type="checkbox"
                          defaultvalue={false}
                          id="cbkAllTang"
                          onChange={(e) => {
                            let checked = e.target.checked;

                            if (checked) {
                              dispatch(getAllTangByToaNhaApi(arrTang));
                            } else {
                              dispatch(getAllTangChuaCoLichTrucApi);
                            }
                            setLichTruc({
                              ...lichTruc,
                              valueSelTang: -1,
                              valueSelToaNha: -1,
                            });
                            setErrLTruc({ ...errLTruc });
                          }}
                        />
                        <label
                          classname="form-check-label "
                          htmlFor="cbkAllTang"
                          style={{ fontSize: "14px", paddingLeft: "5px" }}
                        >
                          Toàn bộ tầng
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success">
                    Tạo mới
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
                    Làm mới
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
