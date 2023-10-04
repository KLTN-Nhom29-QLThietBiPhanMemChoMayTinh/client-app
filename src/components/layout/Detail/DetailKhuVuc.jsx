import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../common/Footer/Footer";
import NavTab from "../../common/NavTab/NavTab";
import Database from "../../../util/database/Database";

import { GoDash } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { FaRegBuilding } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { AiOutlineRight } from "react-icons/ai";

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

//data khu vuc - handleChangeSelect
let arrKhuVuc1 = Database.dataKhuVuc;

export default function DetailKhuVuc() {
  let date = new Date();
  console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
  // sd useParams de nhan data truyen toi theo router
  const params = useParams();
  console.log("DetailKhuVuc - id : ", params.id);

  // 2. navigate -- dung de chuyeenr trang(component)
  const navigate = useNavigate();

  // lưu trữ khu vuc hien tai
  let [khuVuc, setKhuVuc] = useState({});
  let [arrtang, setArrTang] = useState([]);

  useEffect(() => {
    if (Object.keys(khuVuc).length === 0) {
      // kiem tra obj co data chua
      getKhuVuc();
    }
    if (arrtang.length === 0) {
      getAllbyIdKhuVuc();
    }
  }, []);

  // lay data tằng theo khu vuc hien tai
  const getAllbyIdKhuVuc = () => {
    // GET APi
    const arr = {...arrTang1};
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

  //Handle
  const handleChangeSelect = (e) => {
    let { value } = e.target; // value == name cua obj khuvuc
    let itemKhuVuc = arrKhuVuc1.find((item) => {
      return item.name === value;
    });
    
    navigate(`../${itemKhuVuc.id}`);
  };

  //render
  const renderListTang = () => {
    return arrtang.map((item, index) => {
      return (
        <div
          key={index}
          className=" m-2 card text-white align-items-center color_green pt-3"
          style={{ width: "250px", height: "200px" }}
        >
          <FaRegBuilding size={55} />
          <div className="card-body">
            <h4 className="card-title ">{item.name}</h4>
            <div className="d-flex justify-content-between">
              <FaPencilAlt size={18} />
              <ImBin2 size={18} />
            </div>
          </div>
          <div className="card-footer d-flex justify-content-center w-100">
            <NavLink onClick={() => {alert("go to DetailTang")}} className="text-decoration-none  text-white ">
              Danh sách <AiOutlineRight className="ms-3" size={16} />
            </NavLink>
          </div>
        </div>
      );
    });
  };

  //render hidden
  let [rdHiddenSearch, setRDHiddenSearch] = useState(true);

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../../quan-ly/khu-vuc" },
  ];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column justify-content-between"
        style={{ height: "100vh" }}
      >
        <div className="" style={{ height: "80vh" }}>
          {/*  */}
          <div style={{ height: "8vh" }}>
            <NavTab
              itemLink={{ arrLinkNavTab, chucNang: `Chi tiết ${khuVuc.name}` }}
            />
          </div>

          {/* Search */}
          <div
            className="bg-white p-3 rounded"
            style={{ height: `${rdHiddenSearch ? "20vh" : "8vh"}` }}
          >
            {/* Tab tim kiem */}
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-primary ">Tìm kiếm</span>
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

                <div className="row justify-content-around">
                  <div className="col-3 m-2">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleChangeSelect}
                      id="nameKV"
                    >
                      <option selected>{khuVuc.name}</option>
                      {arrKhuVuc1.map((item, index) => {
                        return item.name === khuVuc.name ? (
                          <></>
                        ) : (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {/* <div className="col m-2">
                    <input type="text" className=" form-control " placeholder="Search ..." name="txtname" id="txtname" />
                  </div> */}
                  <div className="col-3 m-2">
                    <input
                      type="text"
                      className=" form-control"
                      placeholder="Tìm kiếm theo tầng..."
                      name="txtname"
                      id="txtname"
                    />
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
            style={{ height: `${rdHiddenSearch ? "61vh" : "73vh"}` }}
          >
            {/* Tab name */}
            <div
              className="d-flex justify-content-between border-bottom border-1"
              style={{ height: "5vh" }}
            >
              <span className="fw-bold text-primary ">Danh sách tầng</span>
            </div>

            {/* table note : style={{  height: `${rdHiddenSearch? "50vh" : "62vh"}` }} */}
            <div
              className="d-flex align-content-start flex-wrap  over_flow_auto"
              style={{ height: `${rdHiddenSearch ? "50vh" : "62vh"}` }}
            >
              {/* item */}
              {/* <div
                className=" m-2 card text-white align-items-center color_green pt-3"
                style={{ width: "250px", height: "200px" }}
              >
                <FaRegBuilding size={55} />
                <div className="card-body">
                  <h4 className="card-title ">toa nha 1</h4>
                  <div className="d-flex justify-content-between">
                    <FaPencilAlt size={18} />
                    <ImBin2 size={18} />
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-center w-100">
                  <NavLink className="text-decoration-none  text-white ">
                    Danh sách <AiOutlineRight className="ms-3" size={16} />
                  </NavLink>
                </div>
              </div> */}

              {renderListTang()}
            </div>
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>
    </div>
  );
}
