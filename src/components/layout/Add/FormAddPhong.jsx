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

/**
 * 3.	Phòng máy(mã phòng, tên phòng, số máy , sothietbi, soPhanMem,trạng thái)
 *
 */
export default function FormAddPhong() {
  const dispatch = useDispatch();
  //
  let { arrPhanMem } = useSelector((state) => state.phanMemReducer);
  let { arrThietBi } = useSelector((state) => state.thietBiReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);

  //
  let [btnReload, setBtnReload] = useState(1);
  // phong err
  let [errPhong, setErrPhong] = useState({
    tenPhong: "",
    soLuongMay: '',
    phanMem: "",
    phanCung: "",
    toaNha: "",
    tang: "",
  });
  // phong moi
  const itemPhongRef = useRef({
    tenPhong: "",
    soLuongMay: 1,
    phanMem: [],
    phanCung: [],
    objToaNha: {},
    objTang: {},
    mota: "",
  });

  useEffect(() => {
    if (arrPhanMem.length === 0) {
      dispatch(getAllPhanMemApi);
    }
    if (arrThietBi.length === 0) {
      dispatch(getAllThietBiApi);
    }
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    } else {
      let objTangFrist = arrTang[0];
      itemPhongRef.current = {
        tenPhong: "",
        soLuongMay: 1,
        phanMem: [],
        phanCung: [],
        objToaNha: objTangFrist?.toaNha,
        objTang: objTangFrist,
      };
    }
  }, []);

  // handle
  //
  const handleCheckTbi = (e) => {
    let { checked, value } = e.target;
    var updateList = itemPhongRef.current.phanCung;
    if (checked) {
      let arrData = arrThietBi.filter((item) => item.maThietBi == value);
      updateList.push(arrData[0]);
    } else {
      updateList = updateList.filter((item) => item.maThietBi != value);
    }

    itemPhongRef.current.phanCung = [...updateList];

    if (itemPhongRef.current.phanCung.length === 0) {
      setErrPhong({ ...errPhong, phanCung: "Hãy chọn thiết bị" });
    } else {
      setErrPhong({ ...errPhong, phanCung: "" });
    }
  };
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
      // alert(`dang cập nhật`)
      // console.log('Chua co api');
      dispatch(insertPhongMayApi(itemPhongRef.current));
    }
  };
  // check data
  const checkDataInput = () => {
    let { tenPhong, phanMem, phanCung, objToaNha, soLuongMay, objTang } =
      itemPhongRef.current;

    let errName = "";
    let errPhanMem = "";
    let errPhanCung = "";
    let errTang = "";
    let errtoaNha = "";
    let errSoLuongMay = "";

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
    if (phanCung.length === 0) {
      errPhanCung = " Hãy nhập dữ liệu!!";
      check = 0;
    } else {
      // so sanh khac cua phanCung
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
    let soLuong = parseInt(soLuongMay);
    if (soLuong <= 0) {
      errSoLuongMay = "Số lượng máy lớn hơn một!";
      check = 0;
    }

    setErrPhong({
      tenPhong: errName,
      phanMem: errPhanMem,
      phanCung: errPhanCung,
      tang: errTang,
      toaNha: errtoaNha,
      soLuongMay: errSoLuongMay,
    });

    return check;
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
            <strong>{item.loaiThietBi.tenLoai}: </strong>{item.tenThietBi}
          </label>
        </div>
      );
    });
  };

  const renderCheckBox_PM = () => {
    return arrPhanMem?.map((item, index) => {
      if (!item.trangThai) {
        // trang thai hong se khogn hien owr day
        return <></>;
      }
      return (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.maPhanMem}
            id={`${item.maPhanMem}_PM`}
            onChange={handleCheckPM}
          />
          <label className="form-check-label" htmlFor={`${item.maPhanMem}_PM`}>
            {item.tenPhanMem}
          </label>
        </div>
      );
    });
  };

  const renderFooterData = () => {
    let { tenPhong, soLuongMay, phanMem, phanCung, objTang, objToaNha } =
      itemPhongRef.current;
    let strName = "";
    let strPM = "";
    let strTbi = "";
    let strToaNha = "";
    if (tenPhong.trim() !== "") {
      strName = `${tenPhong} -- có ${soLuongMay} máy `;
    }
    if (phanCung.length > 0) {
      strTbi = "-- thiết bị: ";
      phanCung?.forEach((item) => (strTbi += `${item.tenThietBi}, `));
    }
    if (phanMem.length > 0) {
      strPM = "-- phần mềm: ";
      phanMem?.forEach((item) => (strPM += `${item.tenPhanMem}, `));
    }
    if (objTang != null && Object.keys(objTang).length !== 0) {
      strToaNha = `-- ${objToaNha.tenToaNha} -- ${objTang.tenTang}`;
    }
    let str = "" + strName + strToaNha + strTbi + strPM;
    return (
      <div className="">
        <span className="fw-bold">Thông tin phòng mới: </span>
        {str}
      </div>
    );
  };
  //
  // RENDER
  const renderToaNha = () => {
    if (Object.keys(itemPhongRef.current.objToaNha).length === 0) {
      return (
        <>
          <option key={-1} value={-1}>
            Chọn tòa nhà
          </option>
          {arrToaNha?.map((item, index) => {
            return (
              <option key={index} value={item.maToaNha}>
                {item.tenToaNha}
              </option>
            );
          })}
        </>
      );
    }
    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == itemPhongRef.current.objToaNha.maToaNha) {
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
    if (itemPhongRef.current.objTang == null) {
      return <></>;
    }
    if (Object.keys(itemPhongRef.current.objTang).length === 0) {
      return (
        <>
          <option key={-1} value={-1}>
            Chọn tầng
          </option>
          {arrTang?.map((item, index) => {
            return (
              <option key={index} value={item.maTang}>
                {item.tenTang}
              </option>
            );
          })}
        </>
      );
    } else {
      let objToaNha = itemPhongRef.current.objToaNha;
      return arrTang?.map((item, index) => {
        if (item.toaNha.maToaNha === objToaNha.maToaNha) {
          return (
            <option key={index} value={item.maTang}>
              {item.tenTang}
            </option>
          );
        } else return <></>;
      });
    }
  };

  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "../quan-ly/tang" },
    { name: "Quản lý phòng máy", link: "../quan-ly/phong" },
  ];
  //
  return (
    <div className="container ">
      <div
        className="d-flex flex-column justify-content-between "
        style={{ minHeight: "100vh" }}
      >
        <div className="mb-2">
          {/*  */}
          <NavTab
            itemLink={{
              arrLinkNavTab,
              chucNang: "Tạo mới",
            }}
          />
          {/* Form */}
          <div className=" bg-white p-4 rounded ">
            <form onSubmit={handleSubmit}>
              {/* input name - soluong may */}
              <div className="row mb-2">
                <div className=" col-md-3">
                  <label htmlFor="tenPhong" className="form-label">
                    Tên phòng{" "}
                    <small className="form-text  text-danger mx-2">*</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhong"
                    id="tenPhong"
                    aria-describedby="errTenPhong"
                    placeholder="Lab A1.0.1..."
                    onChange={handleChangeText}
                  />
                  <small className="form-text py-2  text-danger mx-2">
                    {errPhong.tenPhong}
                  </small>
                </div>

                {/* select ToaNha */}
                <div className="col-md-3 ">
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
                <div className="col-md-3 ">
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

                {/* Chon so may */}
                <div className="col-md-3">
                  <label htmlFor="soLuongMay" className="form-label">
                    Số lượng máy tính
                    <small className="form-text mx-2 text-danger">*</small>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="soLuongMay"
                    id="soLuongMay"
                    aria-describedby="errSoLuongMay"
                    placeholder="Số lượng máy ..."
                    min={1}
                    max={99}
                    defaultValue={1}
                    onChange={handleChangeText}
                  />
                  <small className="form-text py-2 mx-2 text-danger">
                    {errPhong.soLuongMay}
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
                {/* checkbox - Tbi */}
                <div className=" col">
                  <label htmlFor="soPhanCung" className="form-label">
                    Chọn thiết bị phần cứng cho máy tính
                    <small
                      id="errSoPhanCung"
                      className="form-text mx-2 text-danger"
                    >
                      *{errPhong.phanCung}
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
              {/*  */}
              <button type="submit" className="btn btn-success">
                Tạo mới
              </button>
              <button
                onClick={() => {
                  itemPhongRef.current.name = "";
                  itemPhongRef.current.soLuongMay = 1;
                  itemPhongRef.current.phanMem = [];
                  itemPhongRef.current.phanCung = [];
                  setBtnReload(btnReload + 1);
                }}
                type="reset"
                className="btn btn-danger mx-3"
              >
                Làm mới
              </button>
            </form>
          </div>

          <div className=" bg-white px-4 py-2 pt-3 rounded text-dark mt-2 ">
            <div className="d-flex justify-content-between ">
              {renderFooterData()}
              <IoReloadOutline
                className="btn_moune "
                style={{ width: "20px" }}
                onClick={() => {
                  setBtnReload(btnReload + 1);
                }}
                size={20}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
