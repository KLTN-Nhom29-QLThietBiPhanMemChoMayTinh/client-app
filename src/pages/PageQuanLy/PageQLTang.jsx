import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
//
import NavTab from "../../components/common/NavTab/NavTab";
import Footer from "../../components/common/Footer/Footer";
import Database from "../../util/database/Database";
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";

/**
 * giả đỉnh data tren server chua lấy về
 */
const dataServer = Database.dataTang;
const dataKhuVuc = Database.dataKhuVuc;
/**
 *lưu trữ data get tu API
 */
let dataLocal = [];
let dataLocalKV = [];
/**
 *lưu trữ 1 obj khu duoc goi den theo router
 */
let objKhuVuc = {};

const getAllTangApi = () => {
  dataLocal = [...dataServer];
};
const getAllKhuVucApi = () => {
  dataLocalKV = [...dataKhuVuc];
};

// fun getbyid_KhuVuc - APi
const getKhuVucbyId = (idTim) => {
  // tim khu vuc
  objKhuVuc = dataLocalKV.find((item) => item.id == idTim);
};

const PageQLTang = (props) => {
  // 2. navigate -- dung de chuyeenr trang(component)
  const navigate = useNavigate();

  // sd useParams de nhan data truyen toi theo router
  const params = useParams();

  let [arrTang, setArrTang] = useState([]); // lưu trữ data sẽ thay đổi theo txtsearch
  let [txtSearch, setTxtSearch] = useState("");

  useEffect(() => {
    if (dataLocal.length === 0 && dataLocalKV.length === 0) {
      getAllTangApi();
      getAllKhuVucApi();
      if (params.id) {
        // kiem tra ng dung mở trang này bằng all hay theo một id .
        // so sanh neu nguoi dung vao theo 1 router id thi se lay obj khu vuc tu list Khuvuc
        console.log(
          "🚀 ~ file: PageQLTang.jsx:61 ~ useEffect ~ params.id:",
          params.id
        );
        getKhuVucbyId(params.id); // tim vaf gan vao objKhuVuc
      }
    }

    filterData();
  }, [txtSearch]);

  //search
  const handleSearchChange = (event) => {
    setTxtSearch(event.target.value);
  };
  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filterData = () => {
    const arrNew = dataLocal.filter((item) => {
      const search = txtSearch.toLowerCase();
      return (
        (item.id + "").toLowerCase().includes(search) ||
        item.name.toLowerCase().includes(search) ||
        (item.soPhong + "").toLowerCase().includes(search)
      );
    });
    setArrTang([...arrNew]);
  };

  //handle
  //
  const handleChangeSelect = (e) => {
    let { value } = e.target; // value == name cua obj khuvuc
    if (value === "khuvuc_all") {
      navigate(`../quan-ly/tang`);
      return;
    }

    let itemKhuVuc = dataLocalKV.find((item) => {
      return item.name === value;
    });

    navigate(`../quan-ly/tang/${itemKhuVuc.id}`);
  };

  //
  const renderDataTang = () => {
    return arrTang.map((item, index) => {
      return (
        <tr class="" key={index}>
          <td scope="row" style={{ fontWeight: 600, justifyItems: "center" }}>
            {item.id}
          </td>
          <td>{item.name}</td>
          <td>{item.soPhong}</td>
          <td style={{ display: "flex", justifyContent: "space-evenly" }}>
            <NavLink
              to={"/quan-ly/tang/update"}
              onClick={() => {
                alert(`Update -- ${item.id}`);
                // co the truyển data len redux từ đây rồi sang trang kia lấy về sau
              }}
            >
              <button
                type="button"
                class="btn btn-primary mx-2 px-2"
                style={{ padding: "2px" }}
              >
                <FaPencilAlt color="white" size={16} />
              </button>
            </NavLink>
            <button
              onClick={() => {
                alert(`Del -- ${item.id}`);
              }}
              type="button"
              className="btn btn-danger mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <ImBin2 color="white" size={16} />
            </button>
            <NavLink
              to={`../quan-ly/phong`}
              type="button"
              className="btn btn-info mx-2 px-2"
              style={{ padding: "2px" }}
            >
              <BiSolidDetail color="white" size={16} />
            </NavLink>
          </td>
        </tr>
      );
    });
  };
  //
  const renderSelectTheoRouterKhuVuc = () => {
    if (Object.keys(objKhuVuc).length === 0) {
      // TH router all
      return (
        <div className="col-3 m-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChangeSelect}
            id="nameKV"
          >
            <option selected>tất cả</option>
            {dataLocalKV.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
    return (
      <div className="col-3 m-2">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleChangeSelect}
          id="nameKV"
        >
          <option selected>{objKhuVuc.name}</option>
          <option value="khuvuc_all"> tất cả </option>
          {dataLocalKV.map((item, index) => {
            return item.name === objKhuVuc.name ? (
              <></>
            ) : (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  //
  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Quản lý khu vực", link: "../quan-ly/khu-vuc" },
    { name: "Quản lý tầng", link: "" },
  ];
  //
  return (
    <div className="container " style={{ height: "100vh" }}>
      <div
        className="d-flex flex-column justify-content-between "
        style={{ height: "100vh" }}
      >
        <div style={{ height: "80vh" }}>
          {/*  */}
          <div style={{ height: "8vh" }}>
            <NavTab itemLink={{ arrLinkNavTab, chucNang: "Danh sách" }} />
          </div>
          {/* table data */}
          <div className="bg-white rounded p-3" style={{ height: "82vh" }}>
            {/* Phần top với tiêu đề và thanh tìm kiếm - btn thêm */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                height: "6vh",
              }}
            >
              <h2 style={{ margin: "0" }}>Danh sách tầng</h2>
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderSelectTheoRouterKhuVuc()}

                <div>
                  <input
                    type="text"
                    className="form-control"
                    name
                    id
                    placeholder="tìm kiếm..."
                    value={txtSearch}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  to="/quan-ly/tang/add"
                  type="button"
                  className="btn btn-success ms-5 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div class="table-responsive" style={{ height: "69vh" }}>
              <table class="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">Mã tầng</th>
                    <th scope="col">Tên tầng</th>
                    <th scope="col">Số phòng</th>
                    <th scope="col" style={{ width: "220px" }}>
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataTang()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}
        <Footer />
      </div>
    </div>
  );
};

export default PageQLTang;
