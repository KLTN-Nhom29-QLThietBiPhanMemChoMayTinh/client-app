import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import Database from "../../../util/database/Database";

import { IoReloadOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

/**
 * VD data ở server chưa lấy lên
 */
const dataServer_PM = Database.dataPhanMem;
const dataServer_TBi = Database.dataThietBi;
//description : "Phòng máy H4.2" id: 3,numberOfMachines: 45,roomCode: "H4.2",soPhanMem: 5,soThietBi: 3,status: 1
const dataServerPhong = Database.dataPhongMay[2];
console.log(
  "🚀 ~ file: FormUpdatePhong.jsx:16 ~ dataServerPhong:",
  dataServerPhong
);

let datalocal_PM = []; // luu tru all data call duoc
let datalocal_TBi = [];

const getApiData_PM_TBi = () => {
  //Call API
  datalocal_PM = [...dataServer_PM];
  datalocal_TBi = [...dataServer_TBi];
};
const getPhongById = () => {
  // call Api
  let itemPhong = dataServerPhong;

  //VD 2 PM - 2 TBi
  let itemPhanMem = [dataServer_PM[0], dataServer_PM[3], dataServer_PM[4]];
  let itemThietBi = [dataServer_TBi[1], dataServer_TBi[3], dataServer_TBi[0]];
  return {
    name: itemPhong.description,
    soLuongMay: itemPhong.numberOfMachines,
    phanMem: itemPhanMem,
    phanCung: itemThietBi,
  };
};

/**
 * 3.	Phòng máy(mã phòng, tên phòng, số máy , sothietbi, soPhanMem,trạng thái)
 *
 */
export default function FormUpdatePhong() {
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();
//   console.log("DetailKhuVuc - id : ", params.id);

  //
  let [btnReload, setBtnReload] = useState(1);
  // phong err
  let [errPhong, setErrPhong] = useState({
    name: "",
    soLuongMay: "",
    phanMem: "",
    phanCung: "",
  });
  // phong moiD
  let [itemPhong, setItemPhong] = useState({
    name: "",
    soLuongMay: 1,
    phanMem: [],
    phanCung: [],
  });

//   const itemPhongRef = useRef({
//     name: "",
//     soLuongMay: 1,
//     phanMem: [],
//     phanCung: [],
//   });

  useEffect(() => {
    if (datalocal_PM.length === 0 && datalocal_TBi.length === 0) {
      getApiData_PM_TBi();
      setItemPhong(getPhongById(params.id));
    }
  }, []);

  // handle
  //
  const handleCheckTbi = (e) => {
    let { checked, value } = e.target;
    var updateList = [...itemPhong.phanCung];
    if (checked) {
      updateList.push(dataServer_TBi.find((item) => item.idCode === value));
    } else {
      updateList.splice(updateList.indexOf(dataServer_TBi.find((item) => item.idCode === value)), 1);
    }
        let updateValue = {phanCung: updateList}
        setItemPhong((itemPhong) => ({...itemPhong, ...updateValue}))
  };
  const handleCheckPM = (e) => {
    let { checked, value } = e.target;
    var updateList = [...itemPhong.phanMem];
    if (checked) {
      updateList.push(dataServer_PM.find((item) => item.idCode === value));
    } else {
        console.log();
      updateList.splice(updateList.indexOf(dataServer_PM.find((item) => item.idCode === value)), 1);
    }

    let updateValue = { phanMem: updateList };
    setItemPhong((itemPhong) => ({ ...itemPhong, ...updateValue }));
    
  };
  const handleChangeText = (e) => {
    let { id, value } = e.target;

    let updateValue = { [id]: value };
    setItemPhong((itemPhong) => ({ ...itemPhong, ...updateValue }));
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkDataInput()) {
      //true - di tiep
      alert("Run - " + itemPhong.name);
    }
  };
  // check data
  const checkDataInput = () => {
    let { name, phanMem, phanCung } = itemPhong;

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
  };

  // Render
  const renderCheckBox_TBi = () => {
    return datalocal_TBi.map((item, index) => {
      // console.log(itemPhong.phanCung.indexOf(item));

      if (itemPhong.phanCung.indexOf(item) >= 0) {
        return (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue={item.idCode}
              id={item.idCode}
              onChange={handleCheckTbi}
              checked
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
      }
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
      if (itemPhong.phanMem.indexOf(item) >= 0) {
        return (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={item.idCode}
              id={item.idCode}
              onChange={handleCheckPM}
              checked
            />
            <label className="form-check-label" htmlFor={item.idCode}>
              {item.name}
            </label>
          </div>
        );
      }
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
    let { name, soLuongMay, phanMem, phanCung } = itemPhong;
    let strName = "";
    let strPM = "";
    let strTbi = "";
    if (name.trim() !== "") {
      strName = `${name} -- có ${soLuongMay} máy `;
    }
    if (phanCung.length > 0) {
      strTbi = "-- thiết bị: ";
      phanCung.forEach((item) => (strTbi += `${item.name}, `));
    }
    if (phanMem.length > 0) {
      strPM = "-- phần mềm: ";
      phanMem.forEach((item) => (strPM += `${item.name}, `));
    }
    let str = "" + strName + strTbi + strPM;
    return (
      <div className="">
        <span className="fw-bold">Thông tin phòng mới: </span>
        {str}
      </div>
    );
  };

  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "../../quan-ly/tang" },
    { name: "Quản lý phòng máy", link: "../../quan-ly/phong" },
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
              chucNang: "Cập nhật",
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
                    value={itemPhong.name}
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
                    value={itemPhong.soLuongMay}
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
                Cập nhật
              </button>
              <button
                onClick={() => {
                    setItemPhong(getPhongById(params.id));
                 
                }}
                type="reset"
                className="btn btn-danger mx-3"
              >
                Khôi phục
              </button>
            </form>
          </div>

          <div className=" bg-white px-4 py-2 pt-3 rounded text-dark mt-2 d-flex justify-content-between ">
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

        <Footer />
      </div>
    </div>
  );
}
