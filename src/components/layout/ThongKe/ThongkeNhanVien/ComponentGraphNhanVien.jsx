import React, { PureComponent } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ComponentGraphNhanVien() {
  //
  const { arrDataTK_NhanVien, arrDataTK_NhanVienSearch } = useSelector(
    (state) => state.thongkeNhanVienReducer
  );
  //
  if (arrDataTK_NhanVien.length === 0) {
    return <>Đang tìm số liệu.</>;
  }
  // render
  const renderTK_Phong_MayTinh = () => {
    if (arrDataTK_NhanVienSearch.length === 0) {
      return <></>;
    }
    let rowItem = 0;
    let arrGraph = [];
    arrDataTK_NhanVienSearch.forEach((item) => {
      console.log(
        "🚀 ~ file: ComponentGraphNhanVien.jsx:32 ~ arrDataTK_NhanVienSearch.forEach ~ item:",
        item
      );
      rowItem++;
      if (rowItem > 6) return;
      let { maNV, arrLichTruc } = item;
      arrGraph.push({ "Mã NV": maNV, "Số Lịch trực": arrLichTruc.length });
    });

    return (
      <ResponsiveContainer className="col-md-8 mt-5" height={400}>
        <BarChart
          width={500}
          height={300}
          data={arrGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Mã NV" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Số Lịch trực"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          {/* <Bar
            dataKey="Số máy hỏng"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          /> */}
        </BarChart>
        <p className="text-center w-100">
          Biểu đồ 1: Thống kê nhân viên theo lịch trực
        </p>
      </ResponsiveContainer>
    );
  };
  return (
    <div className="mb-5">
      {/*  */}
      <>{renderTK_Phong_MayTinh()}</>
      <div className="col-5 mt-5">
        <strong>Ghi Chú</strong>
        <ul>
          <li>NV: nhân viên</li>
          <li>
            Biểu đồ 1: được bị ảnh hưởng số liệu theo bảng 1 bên số liệu ( thống
            kê theo nhân viên )
          </li>
        </ul>
      </div>
    </div>
  );
}
