import React, { useEffect } from 'react'
//
import { FaPencilAlt } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
//
import Footer from '../../components/common/Footer/Footer';
import NavTab from '../../components/common/NavTab/NavTab';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllThietBiApi } from '../../redux/reducers/thietBiReducer';
import { formatStringDate } from '../../util/config';



export default function PageQLThietBi() {

    const  dispatch = useDispatch();

    let {arrThietBiSearch} = useSelector(state => state.thietBiReducer)
    console.log("🚀 ~ file: PageQLThietBi.jsx:21 ~ PageQLThietBi ~ arrThietBiSearch:", arrThietBiSearch)

    useEffect(() => {
        const action = getAllThietBiApi;
        dispatch(action);
    })
    
    // handle
    const handleChangeSearch = (e) => {

    }
    //render
    const renderDataThietBi = () => {
        return arrThietBiSearch?.map((item, index) => {
            let ngaySD = new Date(item?.ngaySuDung);
            let ngayKT = new Date(item?.ngaySuDung);
      
            ngayKT.setMonth(ngayKT.getMonth() + item?.tuoiTho);
      
            // render
            const renderTrangThai = () => {
              let day = new Date();
                let day2 ;
              if (item.status) {
                if (day > ngayKT) {
                    return <td style={{ backgroundColor: "#fff563" }}>Đang sử dụng - hết hạn bảo hành</td>;
                }
                day2 = new Date(ngayKT);
                day2.setDate(day2.getDate() - 30) // day2 là tgian trước ngày kt 30 ngay
                console.log("🚀 ~ file: PageQLThietBi.jsx:51 ~ renderTrangThai ~ day2:", day2, item.id)
                if(day>day2) {
                    return <td style={{ backgroundColor: "#4dff7c" }}>Đang sử dụng, sắp hết hạn bảo hành</td>;
                }
                return <td style={{ backgroundColor: "#4dff7c" }}>Đang sử dụng</td>;
              }else{
                return <td style={{ backgroundColor: "#ff6666" }}>Đang hỏng</td>;
              }
            };
            return (
              <tr key={index}>
                <td scope="row" style={{ fontWeight: 600, padding: "0 15px" }}>
                  {index < 9 ? `0${index + 1}` : index + 1}
                </td>
                <td>{item?.idCode}</td>
                <td>{item?.name}</td>
                <td>{formatStringDate(ngaySD)}</td>
                <td>{item?.tuoiTho}</td>
                <td>{formatStringDate(ngayKT)}</td>
                {renderTrangThai()}
      
                <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <NavLink
                    // to={"/quan-ly/phan-mem/update"}
                    onClick={() => {
                      alert(`Update -- ${item.id} -- dang cập nhật!`);
                      // co the truyển data len redux từ đây rồi sang trang kia lấy về sau
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary mx-2 px-2"
                      style={{ padding: "2px" }}
                    >
                      <FaPencilAlt color="white" size={16} />
                    </button>
                  </NavLink>
                  <button
                    onClick={() => {
                      alert(`Del -- ${item.id} -- dang cập nhật!`);
                    }}
                    type="button"
                    className="btn btn-danger mx-2 px-2"
                    style={{ padding: "2px" }}
                  >
                    <ImBin2 color="white" size={16} />
                  </button>
                  <NavLink
                    // to={`../quan-ly/phong`}
                    onClick={() => {
                      alert(`Chi tiết -- ${item.id} -- dang cập nhật!`);
                    }}
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
    }


  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Quản lý thiết bị phần cứng", link: "" }];
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
                marginBottom: "20px",
                height: "6vh",
              }}
              className="d-flex justify-content-between align-items-center"
            >
              <h2 style={{ margin: "0" }}>Danh sách thiết bị</h2>
              <div></div>
                {/* {renderSelectTrangThai()} */}
              {/* input tim kiem */}
              <div style={{ display: "flex", alignItems: "center" }}>
                
                <div>
                  <input
                    type="text"
                    className="form-control"
                    id
                    placeholder="tìm kiếm..."
                    onChange={handleChangeSearch}
                  />
                </div>

                {/* Btn them */}
                <NavLink
                  // to="/quan-ly/tang/add"
                  onClick={() => {
                    alert(`tạo mới -- dang cập nhật!`);
                  }}
                  type="button"
                  className="btn btn-success ms-4 view_center_vertical"
                >
                  <MdAdd color="white" size={25} />
                  Tạo mới
                </NavLink>
              </div>
            </div>

            {/* Bảng danh sách data */}
            <div className="table-responsive" style={{ height: "69vh" }}>
              <table className="table bg-white table-hover table-striped table-bordered ">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th style={{ minWidth: "90px" }}>Mã thiết bị</th>
                    <th style={{ minWidth: "180px" }}>Tên thiết bị</th>
                    <th style={{ minWidth: "120px" }}>Ngày bắt đầu sử dụng</th>
                    <th style={{ minWidth: "90px" }}>Hạn bảo hành</th>
                    <th style={{ minWidth: "90px" }}>Ngày hết hạn </th>
                    <th style={{ minWidth: "150px" }}>Trạng thái</th>
                    <th style={{ minWidth: "170px" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody className="over_flow_auto">
                  {/*  */}
                  {renderDataThietBi()}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <Footer />
      </div>
    </div>
  )
}
