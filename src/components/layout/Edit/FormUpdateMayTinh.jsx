import React, { useEffect, useRef, useState } from "react";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { getAllThietBiApi } from "../../../redux/reducers/thietBiReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllToaNhaApi } from "../../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";
import { getAllPhongMayApi } from "../../../redux/reducers/phongMayReducer";
import {
  getAllMayTinhApi,
  insertMayTinhApi,
} from "../../../redux/reducers/mayTinhReducer";

export default function FormUpdateMayTinh() {
  const dispatch = useDispatch();
  //
  let { arrThietBi } = useSelector((state) => state.thietBiReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  let { arrMayTinh } = useSelector((state) => state.mayTinhReducer);
  //

  let objMayTinh = useRef({
    valueSelToaNha: "-1",
    valueSelTang: "-1",
    valueSelPhongMay: "-1",
    moTa: "",
    thietBis: [],
  });
  let [errMayTinh, setErrMayTinh] = useState({
    valueSelToaNha: "",
    valueSelTang: "",
    valueSelPhongMay: "",
    moTa: "",
    thietBis: "",
  });

  useEffect(() => {
    if (arrMayTinh.length === 0) {
      dispatch(getAllMayTinhApi);
    }
    if (arrThietBi.length === 0) {
      dispatch(getAllThietBiApi);
    }
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
  // handle
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    //
    if (!checkData()) {
      // false
      return;
    }
    // true
    let { moTa, valueSelPhongMay } = objMayTinh.current;
    //check ten may: ten may trùng và mà phòng trùng
    let objPhongMay = arrPhongMay.find(
      (item) => item.maPhong == valueSelPhongMay
    );
    let search = moTa.toLowerCase();

    let objData = objPhongMay.mayTinhs.find((item) => {
      return item.moTa.toLowerCase().includes(search);
    });
    if (objData != null) {
      // timf they obj
      alert("Tên máy tính đã được sử dụng!");
      return;
    }

    // tên MT không trung

    dispatch(
      insertMayTinhApi({ ...objMayTinh.current, phongMay: objPhongMay })
    );
  };
  const checkData = () => {
    let check = 1;

    let err_valueSelToaNha;
    let err_valueSelTang;
    let err_valueSelPhongMay;
    let err_moTa;
    let err_thietBis;

    let { valueSelToaNha, valueSelTang, valueSelPhongMay, moTa, thietBis } =
      objMayTinh.current;

    //
    if (moTa.trim().length === 0) {
      err_moTa = "Hãy nhập thông tin!";
      check = 0;
    }
    //
    if (thietBis.length === 0) {
      err_thietBis = "Hãy chọn thông tin!";
      check = 0;
    }
    //
    if (valueSelPhongMay == -1) {
      //
      if (valueSelTang == -1) {
        if (valueSelToaNha == -1) {
          err_valueSelToaNha = "Hãy chọn thông tin!";
          check = 0;
        }

        err_valueSelTang = "Hãy chọn thông tin!";
        check = 0;
      }
      //

      err_valueSelPhongMay = "Hãy chọn thông tin!";
      check = 0;
    }

    setErrMayTinh({
      valueSelToaNha: err_valueSelToaNha,
      valueSelTang: err_valueSelTang,
      valueSelPhongMay: err_valueSelPhongMay,
      moTa: err_moTa,
      thietBis: err_thietBis,
    });

    return check;
  };
  //
  const handleChangeSelectPhongMay = (e) => {
    let value = e.target.value; // maPhong

    objMayTinh.current.valueSelPhongMay = value;
    let err_mota = errMayTinh.moTa;

    if (objMayTinh.current.moTa.length === 0) {
      let objPhongMay = arrPhongMay.find((item) => item.maPhong == value);
      let newMota = getNameNew(objPhongMay);
      if (newMota.length != 0) {
        objMayTinh.current.moTa = newMota;

        err_mota = "";
      }
    }

    if (value.length == -1) {
      setErrMayTinh({
        ...errMayTinh,
        valueSelPhongMay: "Hãy chọn một phòng máy!",
        moTa: err_mota,
      });
    } else {
      setErrMayTinh({
        ...errMayTinh,
        valueSelPhongMay: "",
        valueSelTang: "",
        valueSelToaNha: "",
        moTa: err_mota,
      });
    }
  };
  const getNameNew = (objPhongMay) => {
    // lay ds may tinh - sort theo mota đê lấy tên cuoi
    let mayTinhs = [...objPhongMay.mayTinhs];
    mayTinhs.sort((a, b) => (a.moTa > b.moTa ? 1 : b.moTa > a.moTa ? -1 : 0));

    // lay gia tri cuoi trong ds may tinh cua phogn may chon
    let objMayTinhLast = mayTinhs[mayTinhs.length - 1];

    // lấy text mota
    let { moTa } = objMayTinhLast;

    // kiem tra trong mota co chuoi mayTinh khogn
    let strFirst = moTa.slice(0, 8);
    if (strFirst.toLowerCase().includes("Máy tính".toLowerCase())) {
      // true xuat chuỗi text mới vs number lớn hơn 1
      let strNumber = moTa.slice(8, moTa.length);

      return "Máy tính " + (parseInt(strNumber) + 1);
    }

    return "";
  };
  //
  const handleChangeSelectTang = (e) => {
    let value = e.target.value; // maTang;
    objMayTinh.current.valueSelTang = value;
    objMayTinh.current.valueSelPhongMay = -1;
    if (value == -1) {
      setErrMayTinh({ ...errMayTinh, valueSelTang: "Hãy chọn một tầng!" });
    } else {
      setErrMayTinh({ ...errMayTinh, valueSelTang: "", valueSelToaNha: "" });
    }
  };
  //
  const handleChangeSelectToaNha = (e) => {
    let value = e.target.value; // maToaNHa

    objMayTinh.current.valueSelToaNha = value;
    objMayTinh.current.valueSelPhongMay = -1;
    objMayTinh.current.valueSelTang = -1;
    if (value == -1) {
      setErrMayTinh({ ...errMayTinh, valueSelToaNha: "Hãy chọn một tòa nhà!" });
    } else {
      setErrMayTinh({ ...errMayTinh, valueSelToaNha: "" });
    }
  };
  //
  const handleCheckTbi = (e) => {
    let { checked, value } = e.target;

    let updateData = objMayTinh.current.thietBis;

    if (checked) {
      let objThietBi = arrThietBi.find((item) => item.maThietBi == value);
      updateData.push(objThietBi);
    } else {
      updateData = updateData.filter((item) => item.maThietBi != value);
    }

    objMayTinh.current.thietBis = [...updateData];

    if (objMayTinh.current.thietBis.length === 0) {
      setErrMayTinh({ ...errMayTinh, thietBis: "Hãy chọn một thết bị!" });
    } else {
      setErrMayTinh({ ...errMayTinh, thietBis: "" });
    }
  };
  //
  const handleChangeTextMota = (e) => {
    let value = e.target.value;

    objMayTinh.current.moTa = value;

    if (value.trim().length === 0) {
      setErrMayTinh({ ...errMayTinh, moTa: "Hãy nhập thông tin!" });
    } else {
      setErrMayTinh({ ...errMayTinh, moTa: "" });
    }
  };

  // Render
  const renderCheckBox_TBi = () => {
    return arrThietBi?.map((item, index) => {
      if (!item.status) {
        // tbi hỏng sẽ không hiện ở đây
        return <></>;
      }
      return (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            value={item.maThietBi}
            id={`${item.maThietBi}_Tbi`}
            onChange={handleCheckTbi}
          />
          <label
            className="form-check-label"
            style={{ marginTop: "2px" }}
            htmlFor={`${item.maThietBi}_Tbi`}
          >
            <strong>{item.loaiThietBi.tenLoai}: </strong>
            {item.tenThietBi}
          </label>
        </div>
      );
    });
  };
  // render
  const renderSelectPhongMay = () => {
    let { valueSelToaNha, valueSelTang, valueSelPhongMay } = objMayTinh.current;
    if (valueSelToaNha == -1) {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha khong co giatri
        return arrPhongMay.map((item, index) => {
          return (
            <option
              key={index}
              selected={valueSelPhongMay == item.maPhong ? 1 : 0}
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
    let { valueSelToaNha, valueSelTang } = objMayTinh.current;
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
  const renderSelectToaNha = () => {
    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == objMayTinh.current.valueSelToaNha) {
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

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý tòa nhà", link: "/quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "/quan-ly/tang" },
    { name: "Quản lý phòng", link: "/quan-ly/phong" },
    { name: "Quản lý máy tính", link: "/quan-ly/may-tinh" },
  ];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        <div
          className="d-flex flex-column justify-content-between "
          style={{ height: "100vh" }}
        >
          <div style={{ height: "80vh" }}>
            <div style={{ height: "8vh" }}>
              <NavTab itemLink={{ arrLinkNavTab, chucNang: "Chỉnh sửa" }} />
            </div>
            {/*  */}
            <div
              className="bg-white rounded p-4 px-5"
              style={{ height: "82vh" }}
            >
              {/* Form add */}
              <form
                onSubmit={handleSubmit}
                className="d-flex h-100 justify-content-between flex-column"
              >
                <div>
                  <h2 className="mx-3 mb-3 ">Chỉnh sửa máy tính</h2>
                  <div className="row">
                    <div className="col-6">
                      {/* Tên */}
                      <div className="mb-3 col-10">
                        <label htmlFor="txtMota" className="form-label">
                          Tên máy tính
                          <small
                            id="helpIdMota"
                            className="form-text text-danger mx-2"
                          >
                            *{errMayTinh.moTa}
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          name="txtMota"
                          id="txtMota"
                          value={objMayTinh.current.moTa}
                          onChange={handleChangeTextMota}
                          aria-describedby="helpIdMota"
                          placeholder="Máy tính 01"
                        />
                      </div>
                      {/* check box thiet bị */}
                      {/* checkbox - Tbi */}
                      <div className=" col-10">
                        <label className="form-label">
                          Chọn thiết bị phần cứng cho máy tính:
                          <small className="form-text mx-2 text-danger">
                            *{errMayTinh.thietBis}
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
                          {/* item */}

                          {renderCheckBox_TBi()}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      {/* tòa nhà */}
                      <div className="mb-3 col-10 mx-3">
                        <label htmlFor="searchToaNha" className="form-label">
                          Chọn tòa nhà
                          <span className="text-danger mx-2">
                            *{errMayTinh.valueSelToaNha}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="searchToaNha"
                          id="searchToaNha"
                          onChange={handleChangeSelectToaNha}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelectToaNha()}
                        </select>
                      </div>
                      {/* tầng */}
                      <div className="mb-3 col-10 mx-3">
                        <label htmlFor="searchTang" className="form-label">
                          Chọn tầng
                          <span className="text-danger mx-2">
                            *{errMayTinh.valueSelTang}
                          </span>
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
                      <div className="mb-3 col-10 mx-3">
                        <label htmlFor="searchPhongMay" className="form-label">
                          Chọn phòng máy
                          <span className="text-danger mx-2">
                            *{errMayTinh.valueSelPhongMay}
                          </span>
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
                    </div>
                  </div>
                </div>

                {/* footer - form */}
                <div className="">
                  <button
                    type="reset"
                    onClick={() => {
                      objMayTinh.current = {
                        valueSelToaNha: "-1",
                        valueSelTang: "-1",
                        valueSelPhongMay: "-1",
                        moTa: "",
                        thietBis: [],
                      };

                      setErrMayTinh({
                        valueSelToaNha: "",
                        valueSelTang: "",
                        valueSelPhongMay: "",
                        moTa: "",
                        thietBis: "",
                      });
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Khôi phục
                  </button>
                  <button type="submit" className="btn btn-success mx-3">
                    Chỉnh sửa
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/*  */}
          <Footer />
        </div>
      </div>
    </>
  );
}
