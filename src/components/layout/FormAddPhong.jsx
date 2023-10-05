import React, { useEffect, useRef, useState } from "react";
import NavTab from "../common/NavTab/NavTab";
import Footer from "../common/Footer/Footer";
import Database from "../../util/database/Database";

import { IoReloadOutline } from "react-icons/io5";

/**
 * VD data ở server chưa lấy lên
 */
const dataServer_PM = Database.dataPhanMem;
const dataServer_TBi = Database.dataThietBi;

let datalocal_PM = []; // luu tru all data call duoc
let datalocal_TBi = [];

const getApiData_PM_TBi = () => {
  //Call API
  datalocal_PM = [...dataServer_PM];
  datalocal_TBi = [...dataServer_TBi];
};

/**
 * 3.	Phòng máy(mã phòng, tên phòng, số máy , sothietbi, soPhanMem,trạng thái)
 *
 */
export default function FormAddPhong() {
  //
  let [btnReload, setBtnReload] = useState(1);
  // phong err
  let [errPhong, setErrPhong] = useState({
    name: "",
    soLuongMay: "",
    phanMem: "",
    phanCung: "",
  });
  // phong moi
  const itemPhongRef = useRef({
    name: "",
    soLuongMay: 1,
    phanMem: [],
    phanCung: [],
  });

  useEffect(() => {
    if (datalocal_PM.length === 0 && datalocal_TBi.length === 0) {
      getApiData_PM_TBi();
    }
  }, []);

  // handle
  //
  const handleCheckTbi = (e) => {
    var updateList = [...itemPhongRef.current.phanCung];
    if (e.target.checked) {
      updateList.push(
        dataServer_TBi.find((item) => item.idCode === e.target.value)
      );
    } else {
      updateList.splice(
        dataServer_TBi.find((item) => item.idCode === e.target.value),
        1
      );
    }

    itemPhongRef.current.phanCung = updateList;
  };
  const handleCheckPM = (e) => {
    var updateList = [...itemPhongRef.current.phanMem];
    if (e.target.checked) {
      updateList.push(
        dataServer_PM.find((item) => item.idCode === e.target.value)
      );
    } else {
      updateList.splice(
        dataServer_PM.find((item) => item.idCode === e.target.value),
        1
      );
    }

    itemPhongRef.current.phanMem = updateList;
    
  };
  const handleChangeText = (e) => {
    let { id, value } = e.target;

    itemPhongRef.current[id] = value;
    
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (checkDataInput()) {
      //true - di tiep
      alert('Run - ' + itemPhongRef.current.name);
    }
  };
  // check data
  const checkDataInput = () => {
    let { name, soLuongMay, phanMem, phanCung } = itemPhongRef.current;

    let errName = "";
    let errPhanMem = "";
    let errPhanCung = "";

    let check = 1;

    if (name.trim().length === 0) {
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

    setErrPhong({
      name: errName,
      phanMem: errPhanMem,
      phanCung: errPhanCung,
    });

    return check;


  }

  // Render
  const renderCheckBox_TBi = () => {
    return datalocal_TBi.map((item, index) => {
      return (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="checkbox"
            defaultValue={item.idCode}
            id={item.idCode}
            onChange={handleCheckTbi}
          />
          <label
            className="form-check-label"
            style={{ marginTop: "2px" }}
            htmlFor={item.idCode}
          >
            {item.name}
          </label>
        </div>
      );
    });
  };

  const renderCheckBox_PM = () => {
    return datalocal_PM.map((item, index) => {
      return (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={item.idCode}
            id={item.idCode}
            onChange={handleCheckPM}
          />
          <label className="form-check-label" htmlFor={item.idCode}>
            {item.name}
          </label>
        </div>
      );
    });
  };

  const renderFooterData = () => {
    let { name, soLuongMay, phanMem, phanCung } = itemPhongRef.current;
    let strName = "";
    let strPM = "";
    let strTbi = "";
    if (name.trim() !== "") {
      strName = `${name} -- có ${soLuongMay} máy `;
    }
    if (phanCung.length > 0) {
      strTbi = "-- thiết bị: ";
      phanCung.forEach(item => strTbi += `${item.name}, `)
    }
    if (phanMem.length > 0) {
      strPM = "-- phần mềm: ";
      phanMem.forEach(item => strPM += `${item.name}, `)
    }
    let str = "" + strName + strTbi + strPM;
    return <div className=""><span className='fw-bold'>Thông tin phòng mới: </span>{str}</div>;
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
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="txtTenPhong" className="form-label">
                    Tên phòng{" "}
                    <small
                      id="errTenPhong"
                      className="form-text  text-danger mx-2"
                    >
                      *{errPhong.name}
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="txtTenPhong"
                    id="name"
                    aria-describedby="errTenPhong"
                    placeholder="Phòng máy..."
                    onChange={handleChangeText}
                  />
                </div>
                <div className="mb-3 col">
                  <label htmlFor="soLuongMay" className="form-label">
                    Số lượng máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text mx-2 text-danger"
                    >
                      *{errPhong.soLuongMay}
                    </small>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="soLuongMay"
                    id="soLuongMay"
                    aria-describedby="errSoLuongMay"
                    placeholder="Số lượng máy ..."
                    min={1}
                    max={150}
                    defaultValue={1}
                    onChange={handleChangeText}
                  />
                </div>
              </div>

              {/* input check PM - Tbi*/}
              <div className="row">
                {/* checkbox - Tbi */}
                <div className=" col">
                  <label htmlFor="soLuongMay" className="form-label">
                    Chọn thiết bị phần cứng cho máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text mx-2 text-danger"
                    >
                      *{errPhong.phanCung}
                    </small>
                  </label>
                  <div
                    className="over_flow_auto"
                    style={{
                      height: "250px",
                      paddingLeft: "10px",
                      paddingBottom: "15px",
                    }}
                  >
                    {/* item */}
                    {/* <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue="Tb1"
                        id="cb1"
                      />
                      <label
                        className="form-check-label"
                        style={{ marginTop: "2px" }}
                        htmlFor="cb1"
                      >
                        Thiet bi 1
                      </label>
                    </div> */}

                    {renderCheckBox_TBi()}
                  </div>
                </div>

                {/* checkbox - PM */}
                <div className="col">
                  <label htmlFor="soLuongMay" className="form-label">
                    Chọn ứng dụng phần mềm cho máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text  mx-2 text-danger"
                    >
                      *{errPhong.phanMem}
                    </small>
                  </label>
                  <div
                    className="over_flow_auto"
                    style={{
                      height: "250px",
                      paddingLeft: "10px",
                      paddingBottom: "15px",
                    }}
                  >
                    {renderCheckBox_PM()}
                  </div>
                </div>
              </div>

              {/*  */}
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button type="reset" className="btn btn-danger mx-3">
                Reset
              </button>
            </form>
          </div>

          <div className=" bg-white px-4 py-2 pt-3 rounded text-dark mt-2 d-flex justify-content-between ">
            {renderFooterData()}
            <IoReloadOutline
              className="btn_moune " style={{width:'20px'}}
              onClick={() => {
                setBtnReload(btnReload + 1);
              }}
              size={20}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
