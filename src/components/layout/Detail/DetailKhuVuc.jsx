import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import { GoDash } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";

// data Api
//  lấy được khu vuc theo params.id
const khuVuc1 = { id: 1, name: "Tòa nhaa A", soTang: 5 };

//  lấy được tang theo params.id
const arrTang1 = [
  { id: 1, name: "Tầng 1", soPhong: 5 },
  { id: 2, name: "Tầng 2", soPhong: 2 },
  { id: 3, name: "Tầng 3", soPhong: 5 },
  { id: 4, name: "Tầng 4", soPhong: 6 },
];

export default function DetailKhuVuc() {
  let date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();
  console.log("DetailKhuVuc - id : ", params.id);

  // lưu trữ khu vuc hien tai
  let [khuVuc, setKhuVuc] = useState({});
  console.log("🚀 ~ file: DetailKhuVuc.jsx:29 ~ DetailKhuVuc ~ khuVuc:", khuVuc)
  let [arrtang, setArrTang] = useState([]);

  useEffect(() => {
    if (Object.keys(khuVuc).length === 0) { // kiem tra obj co data chua
      getKhuVuc();
    }
    if (arrtang.length == 0) {
      getAllbyIdKhuVuc();
    }
  }, []);

  // lay data tằng theo khu vuc hien tai
  const getAllbyIdKhuVuc = () => {
    // GET APi
    const arr = arrTang1;
    // update State
    setArrTang(arr);
  };

  // lay khu vuc theo Api
  const getKhuVuc = () => {
    // GET APi
    const item = khuVuc1;

    // update State
    setKhuVuc(item);
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý khu vực", link: "../quan-ly/khu-vuc" }];
  //

  //render hidden
  let [rdHiddenSearch, setRDHiddenSearch] = useState(true);

  return (
    <div className="container " style={{ height: "100vh" }}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="" style={{ height: "80%" }}>
          {/*  */}
          <NavTab
            itemLink={{ arrLinkNavTab, chucNang: `Chi tiết ${khuVuc.name}` }}
          />
          {/* Search */}
          <div className="bg-white p-3 rounded" style={{ height: "auto" }}>
            {/* Tab tim kiem */}
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-primary" >Tìm kiếm</span>
              {rdHiddenSearch ? (
                <GoDash
                  size={20}
                  className="btn_moune"
                  onClick={() => {
                    setRDHiddenSearch(false);
                  }}
                />
              ) : (
                <IoMdAdd
                  size={20}
                  className="btn_moune"
                  onClick={() => {
                    setRDHiddenSearch(true);
                  }}
                />
              )}
            </div>

            {/* form tim kiem */}
            {rdHiddenSearch ? (
              <div>
                <hr />

                <div className="row">
                  <div className="col m-2">
                    <input type="text" className=" form-control " placeholder="Search ..." name="txtname" id="txtname" />
                  </div>
                  <div className="col m-2">
                    <input type="text" className=" form-control " placeholder="Search ..." name="txtname" id="txtname" />
                  </div>
                  <div className="col m-2">
                    <input type="text" className=" form-control" placeholder="Search ..." name="txtname" id="txtname" />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* data */}
          <div
            className="bg-white p-3 mt-2 rounded"
            style={{ height: "auto", maxHeight: "80%" }}
          >
            {/* Tab tim kiem */}
            <div className="d-flex justify-content-between " style={{height:'40px'}}>
              <span className="fw-bold text-primary" >Danh sách tầng</span>
              </div>

                {/* table */}
            <div className="over_flow_auto" style={{  maxHeight: "400px" }}>
              <div className="table-responsive " >
                <table className="table table-primary">
                  <thead>
                    <tr>
                      <th scope="col">Column 1</th>
                      <th scope="col">Column 2</th>
                      <th scope="col">Column 3</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr className>
                      <td scope="row">R1C1</td>
                      <td>R1C2</td>
                      <td>R1C3</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                    <tr className>
                      <td scope="row">Item</td>
                      <td>Item</td>
                      <td>Item</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}
