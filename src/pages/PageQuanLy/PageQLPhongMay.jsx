import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavTab from '../../components/common/NavTab/NavTab'
import { Table, Form } from "react-bootstrap";

const PageQLPhongMay = props => {
   // Dữ liệu danh sách phòng máy (ví dụ)
  const roomData = [
    {
      id: 1,
      roomCode: "H3.1",
      numberOfMachines: 40,
      description: "Phòng máy H3.1",
      status: "Đang sử dụng",
    },
    {
      id: 2,
      roomCode: "H4.1",
      numberOfMachines: 50,
      description: "Phòng máy H4.1",
      status: "Phòng trống",
    },
    {
      id: 3,
      roomCode: "H4.2",
      numberOfMachines: 45,
      description: "Phòng máy H4.2",
      status: "Đang sử dụng",
    },
    {
      id: 4,
      roomCode: "H5.1",
      numberOfMachines: 55,
      description: "Phòng máy H5.1",
      status: "Phòng trống",
    },
    {
      id: 5,
      roomCode: "H5.2",
      numberOfMachines: 33,
      description: "Phòng máy H5.2",
      status: "Đang bảo trì",
    },
    {
      id: 6,
      roomCode: "H6.1",
      numberOfMachines: 42,
      description: "Phòng máy H6.1",
      status: "Đang sử dụng",
    },
    {
      id: 7,
      roomCode: "H7.1",
      numberOfMachines: 37,
      description: "Phòng máy H7.1",
      status: "Đang bảo trì",
    },
    {
      id: 8,
      roomCode: "H8.1",
      numberOfMachines: 58,
      description: "Phòng máy H8.1",
      status: "Phòng trống",
    },
    {
      id: 9,
      roomCode: "H9.2",
      numberOfMachines: 43,
      description: "Phòng máy H9.1",
      status: "Đang sử dụng",
    },
    {
      id: 10,
      roomCode: "H9.1",
      numberOfMachines: 46,
      description: "Phòng máy H9.2",
      status: "Phòng trống",
    },
  ];

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

  return (
    <div className="container">
      {/*  */}
      <NavTab itemLink={
        {name:'Quản lý phòng máy',link:'', chucNang:'Danh sách'}
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
