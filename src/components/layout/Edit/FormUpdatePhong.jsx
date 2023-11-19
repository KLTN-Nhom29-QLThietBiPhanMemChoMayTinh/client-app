import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";

import { IoReloadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAllPhanMemApi } from "../../../redux/reducers/phanMemReducer";
import { getAllThietBiApi } from "../../../redux/reducers/thietBiReducer";
import { getAllToaNhaApi } from "../../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";
import { insertPhongMayApi } from "../../../redux/reducers/phongMayReducer";
import { useLocation, useNavigate } from "react-router-dom";

let objData_old = {};
/**
 * 3.	Phòng máy(mã phòng, tên phòng, số máy , sothietbi, soPhanMem,trạng thái)
 *
 */
export default function FormUpdatePhong() {
  const navigatie = useNavigate();
  const dispatch = useDispatch();
  // nhan data gui theo uri
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const objParam = Object.fromEntries(searchParams);
  //
  //
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  let { arrPhanMem } = useSelector((state) => state.phanMemReducer);
  let { arrThietBi } = useSelector((state) => state.thietBiReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);

  // phong err
  let [errPhong, setErrPhong] = useState({
    tenPhong: "",
    phanMems: "",
    toaNha: "",
    tang: "",
  });
  // phong moi
  const itemPhongRef = useRef({
    tenPhong: "",
    phanMems: [],
    toaNha: {},
    tang: {},
    moTa: "",
    mayTinhs: [],
  });

  //
  useEffect(() => {
    if (objParam.id == null || arrPhongMay.length == 0) {
      navigatie("/quan-ly/phong");
    } else {
      let objData_old = arrPhongMay.find((item) => item.maPhong == objParam.id);
      itemPhongRef.current = {
        ...objData_old,
        toaNha: objData_old.tang.toaNha,
      };
      console.log(
        "🚀 ~ file: FormUpdatePhong.jsx:58 ~ useEffect ~ itemPhongRef.current:",
        itemPhongRef.current
      );
    }
    if (arrPhanMem.length === 0) {
      dispatch(getAllPhanMemApi);
    }

    setErrPhong({ ...errPhong });
  }, []);

  // handle
  const handleCheckPM = (e) => {
    let { checked, value } = e.target;
    var updateList = itemPhongRef.current.phanMem;
    if (checked) {
      let arrData = arrPhanMem.filter((item) => item.maPhanMem == value);
      updateList.push(arrData[0]);
    } else {
      updateList = updateList.filter((item) => item.maPhanMem != value);
    }

    itemPhongRef.current.phanMem = updateList;

    if (itemPhongRef.current.phanMem.length === 0) {
      setErrPhong({ ...errPhong, phanMem: "Hãy chọn ứng dụng" });
    } else {
      setErrPhong({ ...errPhong, phanMem: "" });
    }
  };
  const handleChangeText = (e) => {
    let { id, value } = e.target;

    itemPhongRef.current[id] = value;

    if (id.includes("tenPhong")) {
      if (value.trim().length === 0) {
        setErrPhong({ ...errPhong, tenPhong: "Hãy nhập giá trị" });
      } else {
        setErrPhong({ ...errPhong, tenPhong: "" });
      }
    } else {
      if (value.trim().length === 0) {
        setErrPhong({ ...errPhong, soLuongMay: "Hãy nhập giá trị" });
      } else {
        setErrPhong({ ...errPhong, soLuongMay: "" });
      }
    }
  };
  //
  const handleChangeSelectToaNha = (e) => {
    // itemPhongRef.current.objToaNha =
    let maToaNha = e.target.value;

    let objToaNha = arrToaNha.find((item) => item.maToaNha == maToaNha);

    let objTang = arrTang.find((item) => item.toaNha.maToaNha == maToaNha);

    if (objTang == null) {
      setErrPhong({ ...errPhong, toaNha: "Hãy chọn tòa nhà khác!" });
    } else {
      setErrPhong({ ...errPhong, toaNha: "", tang: "" });
    }

    itemPhongRef.current = { ...itemPhongRef.current, objToaNha, objTang };
  };
  //
  const handleChangeSelectTang = (e) => {
    let maTang = e.target.value;
    let objTang = arrTang.find((item) => item.maTang == maTang);

    itemPhongRef.current = {
      ...itemPhongRef.current,
      objTang,
      objToaNha: objTang.toaNha,
    };

    setErrPhong({ ...errPhong, toaNha: "", tang: "" });
  };
  //
  const handleChangeTxtMota = (e) => {
    itemPhongRef.current = { ...itemPhongRef.current, mota: e.target.value };
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkDataInput()) {
      //true - di tiep
      console.log(itemPhongRef.current);
      // dispatch(insertPhongMayApi(itemPhongRef.current));
    }
  };
  // check data
  const checkDataInput = () => {
    let { tenPhong, phanMem, objToaNha, objTang } = itemPhongRef.current;

    let errName = "";
    let errPhanMem = "";
    let errTang = "";
    let errtoaNha = "";

    let check = 1;

    if (tenPhong?.trim().length === 0) {
      errName = " Hãy nhập dữ liệu!!";
      check = 0;
      //
    } else {
      // so sanh khac cua name
    }
    //

    if (phanMem.length === 0) {
      errPhanMem = " Hãy nhập dữ liệu!!";
      check = 0;
      //
    } else {
      //
      // so sanh khac cua phanMem
    }

    //
    if (objToaNha == null || Object.keys(objToaNha).length === 0) {
      errtoaNha = "Hãy chọn tòa nhà!";
      check = 0;
    }

    //
    if (objTang == null || Object.keys(objTang).length === 0) {
      errTang = "Hãy chọn tằng!";
      check = 0;
    }

    setErrPhong({
      tenPhong: errName,
      phanMem: errPhanMem,
      tang: errTang,
      toaNha: errtoaNha,
    });

    return true;
  };

  // Render

  const renderCheckBox_PM = () => {
    return arrPhanMem?.map((item, index) => {
      if (!item.trangThai) {
        // trang thai hong se khogn hien owr day
        return <></>;
      }
      // 
      let valCheck = false;
      if(itemPhongRef.current.phanMems.findIndex(e => e.maPhanMem == item.maPhanMem) >= 0 )
      {
        valCheck = 1;
      }
      
      //
      return (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.maPhanMem}
            id={`${item.maPhanMem}_PM`}
            checked={valCheck}
            onChange={handleCheckPM}
          />
          <label className="form-check-label" htmlFor={`${item.maPhanMem}_PM`}>
            {item.tenPhanMem}
          </label>
        </div>
      );
    });
  };

  //
  // RENDER
  const renderToaNha = () => {
    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == itemPhongRef.current.toaNha.maToaNha) {
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
  const renderTang = () => {
    return arrTang?.map((item, index) => {
      if (item.toaNha.maToaNha === itemPhongRef.current.toaNha.maToaNha) {
        if(item.maTang == itemPhongRef.current.tang.maTang) {
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
    });
  };

  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "/quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "/quan-ly/tang" },
    { name: "Quản lý phòng máy", link: "/quan-ly/phong" },
  ];
  //
  return (
    <div className="container ">
      <div
        className="d-flex flex-column justify-content-between "
        style={{ minHeight: "100vh" }}
      >
        <div className="mb-2" style={{ height: "80vh" }}>
          {/*  */}
          <NavTab
            style={{ height: "8vh" }}
            itemLink={{
              arrLinkNavTab,
              chucNang: "Chỉnh sửa",
            }}
          />
          {/* Form */}
          <div className=" bg-white p-4 rounded " style={{ height: "82vh" }}>
            <form className="h-100" onSubmit={handleSubmit}>
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="bodyForm">
                  {/* input name - soluong may */}
                  <div className="row mb-2">
                    <div className=" col-md-4">
                      <label htmlFor="tenPhong" className="form-label">
                        Tên phòng{" "}
                        <small className="form-text  text-danger mx-2">*</small>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="tenPhong"
                        id="tenPhong"
                        value={itemPhongRef.current.tenPhong}
                        aria-describedby="errTenPhong"
                        placeholder="Lab A1.0.1..."
                        onChange={handleChangeText}
                      />
                      <small className="form-text py-2  text-danger mx-2">
                        {errPhong.tenPhong}
                      </small>
                    </div>
                    {/* select ToaNha */}
                    <div className="col-md-4 ">
                      <label className="form-label">
                        Chọn tòa nhà
                        <small className="form-text  text-danger mx-2">*</small>
                      </label>
                      <select
                        className="form-select"
                        onChange={handleChangeSelectToaNha}
                      >
                        {renderToaNha()}
                      </select>
                      <small className="form-text py-2  text-danger mx-2">
                        {errPhong.toaNha}
                      </small>
                    </div>
                    {/* select Tang */}
                    <div className="col-md-4 ">
                      <label className="form-label">
                        Chọn tầng
                        <small className="form-text  text-danger mx-2">*</small>
                      </label>
                      <select
                        className="form-select"
                        onChange={handleChangeSelectTang}
                      >
                        {renderTang()}
                      </select>
                      <small className="form-text py-2 text-danger mx-2">
                        {errPhong.tang}
                      </small>
                    </div>
                  </div>
                  {/* input check PM - Tbi*/}
                  <div className="row">
                    {/* MoTa */}
                    <div className="col">
                      <div className="mb-3">
                        <label htmlFor="txtMota" className="form-label">
                          Mô tả
                        </label>
                        <textarea
                          className="form-control"
                          name="txtMota"
                          id="txtMota"
                          value={itemPhongRef.current.moTa}
                          rows={5}
                          onChange={handleChangeTxtMota}
                        />
                      </div>
                    </div>
                    {/* checkbox - PM */}
                    <div className="col">
                      <label htmlFor="soPhanMem" className="form-label">
                        Chọn ứng dụng phần mềm cho máy tính
                        <small
                          id="errSoPhanMem"
                          className="form-text  mx-2 text-danger"
                        >
                          *{errPhong.phanMem}
                        </small>
                      </label>
                      <div
                        className="over_flow_auto"
                        style={{
                          height: "225px",
                          paddingLeft: "10px",
                          paddingBottom: "15px",
                        }}
                      >
                        {renderCheckBox_PM()}
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div>
                  <button type="submit" className="btn btn-success">
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => {
                      itemPhongRef.current.name = "";
                      itemPhongRef.current.soLuongMay = 1;
                      itemPhongRef.current.phanMem = [];
                      itemPhongRef.current.phanCung = [];
                    }}
                    type="reset"
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
