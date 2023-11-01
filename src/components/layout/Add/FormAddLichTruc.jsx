import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNhanVienApi } from "../../../redux/reducers/nhanVienReducer";
import {
  getAllTangApi,
  getAllTangbyIdToaNha,
} from "../../../redux/reducers/tangReducer";
import {
  getAllToaNhaApi,
  getAllToaNhaByLichTruc,
} from "../../../redux/reducers/toaNhaReducer";
import { insertLichTrucApi } from "../../../redux/reducers/lichTrucReducer";

let day_now = new Date();
let strDate = `${day_now.getFullYear()}-${day_now.getMonth() + 1}-01`;

export default function FormAddLichTruc() {
  const dispatch = useDispatch();

  const { arrNhanVien } = useSelector((state) => state.nhanVienReducer);
  const { arrTangByLichTruc } = useSelector((state) => state.tangReducer);
  const { arrToaNhaLichTruc } = useSelector((state) => state.toaNhaReducer);

  const [lichTruc, setLichTruc] = useState({});
  const [errLTruc, setErrLTruc] = useState({
    nhanVien: "",
    toaNha: "",
    tang: "",
  });

  useEffect(() => {
    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }
    if (arrToaNhaLichTruc.length === 0) {
      dispatch(getAllToaNhaByLichTruc);
    }

    setLichTruc({
      tgian: strDate,
      thoiGianBatDau: 6,
      thoiGianKetThuc: 14,
      soNgayNghi: 0,
      nhanVien: {},
      tang: {},
    });
  }, []);

  //
  const checkData = () => {
    let { nhanVien, tang } = lichTruc;

    if (Object.keys(nhanVien).length === 0) {
      setErrLTruc({ ...errLTruc, nhanVien: "Hãy chọn nhân viên!" });
      return false;
    }
    if (Object.keys(tang).length === 0) {
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
      console.log(lichTruc);
      dispatch(insertLichTrucApi(lichTruc))
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
    let id = e.target.value; //id = idToaNha
    if (id == -1) {
      setErrLTruc({ ...errLTruc, toaNha: "Hãy chọn tòa nhà!" });
    } else {
      setErrLTruc({ ...errLTruc, toaNha: "" });
      dispatch(getAllTangbyIdToaNha(id));
    }
  };
  //
  const handleChangeSelectTang = (e) => {
    let id = e.target.value; //id = idTang
    if (id == -1) {
      setLichTruc({ ...lichTruc, tang: {} });
      setErrLTruc({ ...errLTruc, tang: "Hãy chọn tầng!" });
    } else {
      let tang = arrTangByLichTruc.find((item) => item.maTang == id);
      setLichTruc({ ...lichTruc, tang: tang });
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
  //
  const handleChangeDate = (e) => {
    const val = e.target.value;
    setLichTruc({ ...lichTruc, tgian: val });
  };
  // render

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
                    <div class="mb-3 px-3">
                      <label for="selectNameNV" class="form-label">
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
                          class="form-select "
                          name="selectNameNV"
                          id="selectNameNV"
                          aria-describedby="errNameNV"
                          onChange={handleChangeSelectNhanVien}
                        >
                          <option value={-1}>Chọn nhân viên</option>
                          {arrNhanVien.map((item, index) => {
                            return (
                              <option key={index} value={item.maNV}>
                                {item.tenNV}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    {/*  */}
                    <div className="mb-3 px-3">
                      <label htmlFor="id1" className="form-label">
                        Thời gian trực sau phai bo
                        <small
                          id="helpId1"
                          className="form-text text-danger mx-1"
                        >
                          *
                        </small>
                      </label>
                      <div className="col-10">
                        <input
                          type="date"
                          className="form-control"
                          name="id1"
                          id="id1"
                          aria-describedby="helpId1"
                          onChange={handleChangeDate}
                        />
                      </div>
                    </div>
                    {/*  */}
                    <div class="mb-3 px-3">
                      <label for="selectCaTruc" class="form-label">
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
                          class="form-select "
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
                  </div>
                  <div className="col-md-6">
                    {/* select Toa Nha  */}
                    <div class="mb-3  px-3">
                      <label for="selectToaNha" class="form-label">
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
                          class="form-select "
                          name="selectToaNha"
                          id="selectToaNha"
                          aria-describedby="errToaNha"
                          onChange={handleChangeSelectToaNha}
                        >
                          <option selected value={-1}>
                            Chọn tòa nhà
                          </option>
                          {arrToaNhaLichTruc.map((item, index) => {
                            return (
                              <option key={index} value={item.maToaNha}>
                                {item.tenToaNha}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* select tang  */}
                    <div class="mb-3  px-3">
                      <label for="selectTang" class="form-label">
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
                          class="form-select "
                          name="selectTang"
                          id="selectTang"
                          aria-describedby="errTang"
                          onChange={handleChangeSelectTang}
                        >
                          <option selected value={-1}>
                            Chọn tầng
                          </option>
                          {arrTangByLichTruc.map((item, index) => {
                            return (
                              <option key={index} value={item.maTang}>
                                {item.tenTang}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success">
                    Tạo mới
                  </button>
                  <button type="reset" onClick={() => {
                    setLichTruc({
                      tgian: strDate,
                      thoiGianBatDau: 6,
                      thoiGianKetThuc: 14,
                      soNgayNghi: 0,
                      nhanVien: {},
                      tang: {},
                    });
                  }} className="btn btn-danger mx-3">
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
