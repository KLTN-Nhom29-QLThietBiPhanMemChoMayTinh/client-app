import React, { useEffect, useState } from "react";
import NavTab from "../common/NavTab/NavTab";
import Footer from "../common/Footer/Footer";
import Database from "../../util/database/Database";

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

  let [itemPhong, setItemPhong] = useState(
   {name:'', soLuongMay:'', phanMem:[], phanCung:[]}
  );

  useEffect(() => {
    if (datalocal_PM.length === 0 && datalocal_TBi.length === 0) {
      getApiData_PM_TBi();
    }
  }, []);

  // handle
  //
  const handleChange = (e) => {
   console.log("🚀 ~ file: FormAddPhong.jsx:40 ~ FormAddPhong ~ e:", e)
  };
  
  //
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            defaultValue={item}
            id={item.idCode}
            onChange={handleChange()}
          />
          <label className="form-check-label" htmlFor={item.idCode}>
            {item.name}
          </label>
        </div>
      );
    })
  }

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
                      className="form-text text-muted text-danger mx-2"
                    >
                      *
                    </small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="txtTenPhong"
                    id="txtTenPhong"
                    aria-describedby="errTenPhong"
                    placeholder="Phòng máy..."
                    
                  />
                </div>
                <div className="mb-3 col">
                  <label htmlFor="soLuongMay" className="form-label">
                    Số lượng máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text text-muted mx-2 text-danger"
                    >
                      *
                    </small>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="soLuongMay"
                    id="soLuongMay"
                    aria-describedby="errSoLuongMay"
                    placeholder="Số lượng máy ..."
                  />
                </div>
              </div>

              {/* input check PM - Tbi*/}
              <div className="row">
                {/* checkbox - Tbi */}
                <div className=" col">
                  <label htmlFor="soLuongMay" className="form-label">
                    Chọn thiết bị phần cững cho máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text text-muted mx-2 text-danger"
                    >
                      *asbdfhajkshfdkjsfhdjsahfjshdfjs
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
                    Chọn thiết bị phần cững cho máy tính
                    <small
                      id="errSoLuongMay"
                      className="form-text text-muted mx-2 text-danger"
                    >
                      *asbdfhajkshfdkjsfhdjsahfjshdfjs
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
        </div>

        <Footer />
      </div>
    </div>
  );
}
