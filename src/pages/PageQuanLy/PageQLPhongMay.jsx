import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavTab from '../../components/common/NavTab/NavTab'
import { Table, Form } from "react-bootstrap";
import Database from '../../util/database/Database';


   // Dữ liệu danh sách phòng máy (ví dụ)
const roomData  = Database.dataPhongMay


const PageQLPhongMay = props => {

  // State để lưu trạng thái của thanh tìm kiếm
  const [searchText, setSearchText] = useState("");

  // Hàm xử lý sự kiện thay đổi giá trị của thanh tìm kiếm
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Hàm tìm kiếm dựa trên giá trị của searchText
  const filteredRoomData = roomData.filter((room) => {
    const searchTerm = searchText.toLowerCase();
    return (
      room.roomCode.toLowerCase().includes(searchTerm) ||
      room.description.toLowerCase().includes(searchTerm) ||
      room.status.toLowerCase().includes(searchTerm)
    );
  });

 // Mảng quản lý data navtab
 let arrLinkNavTab = [
  {name: "Quản lý phòng máy", link: ""},
]

  return (
    <div className="container">
      {/*  */}
      <NavTab itemLink={
        {arrLinkNavTab: arrLinkNavTab, chucNang:'Danh sách'}
        } />

      {/* Bảng danh sách phòng máy bao quanh bởi một div */}
      <div style={{ background: "white", padding: "20px" }}>
        {/* Phần top với tiêu đề và thanh tìm kiếm */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ margin: "0" }}>Danh sách phòng</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm..."
              style={{
                width: "200px",
                height: "36px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "18px",
                paddingLeft: "15px",
              }}
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Bảng danh sách phòng máy */}
        <Table
          striped
          bordered
          hover
          style={{
            marginTop: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr>
              <th>Mã Phòng</th>
              <th>Số Máy</th>
              <th>Mô Tả</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoomData.map((room) => (
              <tr key={room.id} style={{ backgroundColor: "white" }}>
                <td style={{ padding: "10px" }}>{room.roomCode}</td>
                <td style={{ padding: "10px" }}>{room.numberOfMachines}</td>
                <td style={{ padding: "10px" }}>{room.description}</td>
                <td style={{ padding: "10px" }}>{room.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

PageQLPhongMay.propTypes = {

}

export default PageQLPhongMay
