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
import { useParams } from "react-router-dom";
import {
  getAllLichTruc,
  getLichTrucbyId,
} from "../../../redux/reducers/lichTrucReducer";

let day_now = new Date();
let strDate = `${day_now.getFullYear()}-${day_now.getMonth() + 1}-01`;
/**
 * giá trị lưu chữ data được chuyển tới để chỉnh sử
 */
let itemOld = {};


export default function FormUpdateLichTruc() {
  const dispatch = useDispatch();
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();

  const { arrLichTruc } = useSelector((state) => state.lichTrucReducer);
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
    
    if (arrLichTruc.length === 0) {
      itemOld = getLichTrucbyId(params.id);
    } else {
      let arritemLT = arrLichTruc.filter((item) => item.maLich == params.id);
      itemOld = arritemLT[0];
    }

    if (arrNhanVien.length === 0) {
      dispatch(getAllNhanVienApi);
    }
    if (arrToaNhaLichTruc.length === 0) {
      dispatch(getAllToaNhaByLichTruc);
    }
    // if (arrTangByLichTruc.length === 0) {
      dispatch(getAllTangbyIdToaNha(itemOld.tang.toaNha.maToaNha));
    // }

    setLichTruc({ ...itemOld });
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
  const renderSelectNhanVien = () => {
    if (Object.keys(lichTruc).length === 0) {
      return <></>;
    }
    let { nhanVien } = lichTruc;
    // if (Object.keys(lichTruc).length === 0) {
    //   return arrNhanVien.map((item, index) => {
    //     return (
    //       <option key={index} value={item.maNV}>
    //         {item.tenNV}
    //       </option>
    //     );
    //   });
    // }

    return arrNhanVien.map((item, index) => {
      if (item.maNV == nhanVien.maNV) {
        return (
          <option key={index} value={item.maNV} selected>
            {item.tenNV}
          </option>
        );
      }
      return (
        <option key={index} value={item.maNV}>
          {item.tenNV}
        </option>
      );
    });
  };
  //
  const renderArrToaNha = () => {
    if (Object.keys(lichTruc).length === 0) {
      return <></>;
    }
    let { toaNha } = lichTruc.tang;
    return arrToaNhaLichTruc.map((item, index) => {
      if (item.maToaNha == toaNha.maToaNha) {
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
  //
  const renderArrTang = () => {
    if (Object.keys(lichTruc).length === 0) {
      return <></>;
    }
    let { tang } = lichTruc;
    return arrTangByLichTruc.map((item, index) => {
      if (item.maTang == tang.maTang) {
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
    });
  };
  //
  const renderSelectCaTruc = () => {
    let { thoiGianBatDau } = lichTruc;
    if (thoiGianBatDau === 6) {
      return (
        <>
          <option value={1} selected>
            6h-14h
          </option>
          <option value={2}>14h-22h</option>
        </>
      );
    }
    return (
      <>
        <option value={1}>6h-14h</option>
        <option value={2} selected>
          14h-22h
        </option>
      </>
    );
  };
  // 
  const renderTgian = () => {
    let myday = new Date(lichTruc.tgian);

    let str = ` tháng ${myday.getMonth() + 1} năm ${myday.getFullYear()}`

    return <>{str}</>
  }

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
                          {renderSelectNhanVien()}
                        </select>
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
                          {renderSelectCaTruc()}
                        </select>
                      </div>
                    </div>
                    {/*  */}
                    <div className="mb-3 px-3">
                      <label htmlFor="id1" className="form-label">
                        Thời gian trực: {renderTgian()}
                        
                      </label>
                      
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
                          <option value={-1}>Chọn tòa nhà</option>
                          {renderArrToaNha()}
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
                          <option value={-1}>Chọn tầng</option>
                          {renderArrTang()}
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
                    Quay lại
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
